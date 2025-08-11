import { useState, useEffect, useMemo } from 'react'
import { docsDatas } from '../data/DocsData'
import LanguageSelector from '../components/LanguageSelector'
import VersionSelector from '../components/VersionSelector'
import Sidebar from '../components/Sidebar'
import DocContent from '../components/DocContent'
import type { IAPIDocumentation, ILanguageData, IVersionData } from '../types'

export default function Docs() {
  // available languages
  const languageOptions = docsDatas.map((d) => d.language)

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const languageData: ILanguageData | undefined =
    selectedLanguage
      ? docsDatas.find((d) => d.language === selectedLanguage)
      : undefined

  const versionOptions: IVersionData[] = languageData
    ? languageData.versions.map(({ apis, ...rest }) => ({ ...rest }))
    : []

  useEffect(() => {
    if (languageData && languageData.versions.length > 0) {
      setSelectedVersion(languageData.versions[0].version)
      setSelectedItemId(null)
    } else {
      setSelectedVersion(null)
      setSelectedItemId(null)
    }
  }, [selectedLanguage])

  const versionData: IVersionData | undefined =
    languageData && selectedVersion
      ? languageData.versions.find((v) => v.version === selectedVersion)
      : undefined

  /** -------------------------
   * Build flattened API items (for navigation)
   * ------------------------- */
  const apiGroup: IAPIDocumentation | undefined = versionData?.apis

  const apiItems = useMemo(() => {
    if (!apiGroup) return []

    const items: any[] = []

    // Classes
    apiGroup.claasNames?.forEach((cls) => {
      items.push({
        id: cls.classId,
        type: 'class',
        title: cls.className,
        description: cls.description,
      })

      // Constructor(s)
      cls.constructor?.forEach((ctor) => {
        items.push({
          id: ctor.constructorId,
          type: 'constructor',
          parent: cls.className,
          title: `${cls.className}()`,
          ...ctor,
        })
      })

      // Methods in class
      cls.methods?.forEach((method) => {
        items.push({
          id: method.methodId,
          type: 'method',
          parent: cls.className,
          ...method,
        })
      })
    })

    // Global methods
    apiGroup.methods?.forEach((method) => {
      items.push({
        id: method.methodId,
        type: 'method',
        title: method.name,
        ...method,
      })
    })

    return items
  }, [apiGroup])

  // Reset selected if version changes
  useEffect(() => {
    setSelectedItemId(null)
  }, [selectedVersion])

  const currentIndex = apiItems.findIndex((item) => item.id === selectedItemId)

  const selectedItem =
    currentIndex !== -1 ? apiItems[currentIndex] : null

  function goPrevious() {
    if (currentIndex > 0) {
      setSelectedItemId(apiItems[currentIndex - 1].id)
    }
  }
  function goNext() {
    if (currentIndex !== -1 && currentIndex < apiItems.length - 1) {
      setSelectedItemId(apiItems[currentIndex + 1].id)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-112px)] bg-gray-50 dark:bg-gray-800">
      {!selectedLanguage ? (
        <div className="flex-grow">
          <LanguageSelector
            languages={languageOptions}
            selectedLanguage={selectedLanguage}
            onSelect={setSelectedLanguage}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col p-4 bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 md:w-72">
            {versionOptions.length > 0 && selectedVersion && (
              <VersionSelector
                versions={versionOptions}
                selectedVersion={selectedVersion}
                onSelect={setSelectedVersion}
              />
            )}
            {/* Pass full apiGroup to Sidebar */}
            {apiGroup && (
              <Sidebar
                apis={apiGroup}
                selectedId={selectedItemId}
                onSelect={setSelectedItemId}
              />
            )}
          </div>

          <div className="flex-grow flex flex-col overflow-hidden p-4">
            <DocContent
              apiDoc={selectedItem}
              onPrevious={goPrevious}
              onNext={goNext}
              hasPrevious={currentIndex > 0}
              hasNext={currentIndex !== -1 && currentIndex < apiItems.length - 1}
            />
          </div>
        </>
      )}
    </div>
  )
}
