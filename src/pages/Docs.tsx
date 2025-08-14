// Docs.tsx (updated responsive layout)
import { useState, useEffect, useMemo } from "react";
import { docsDatas } from "../data/DocsData";
import LanguageSelector from "../components/LanguageSelector";
import VersionSelector from "../components/VersionSelector";
import Sidebar from "../components/Sidebar";
import DocContent from "../components/DocContent";
import type { IAPIDocumentation, ILanguageData, IVersionData } from "../types";
import { dracula, vs } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Menu, X } from "lucide-react";

export default function Docs() {
  const languageOptions = docsDatas.map((d) => d.language);
  let currentCodeTheam =
    localStorage.getItem("theme") === "dark" ? dracula : vs;

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const languageData: ILanguageData | undefined = selectedLanguage
    ? docsDatas.find((d) => d.language === selectedLanguage)
    : undefined;

  const versionOptions: IVersionData[] = languageData
    ? languageData.versions.map(({ apis, ...rest }) => ({ ...rest }))
    : [];

  useEffect(() => {
    if (languageData && languageData.versions.length > 0) {
      setSelectedVersion(
        languageData.versions[languageData.versions.length - 1].version
      );
      setSelectedItemId("1");
    } else {
      setSelectedVersion(null);
      setSelectedItemId(null);
    }
  }, [selectedLanguage, currentCodeTheam]);

  const versionData: IVersionData | undefined =
    languageData && selectedVersion
      ? languageData.versions.find((v) => v.version === selectedVersion)
      : undefined;

  const apiGroup: IAPIDocumentation | undefined = versionData?.apis;

  const apiItems = useMemo(() => {
    if (!apiGroup) return [];
    const items: any[] = [];
    apiGroup.claasNames?.forEach((cls) => {
      items.push({
        id: cls.classId,
        type: "class",
        title: cls.className,
        description: cls.description,
        codeExample: cls.example,
      });
      cls.constructor?.forEach((ctor) => {
        items.push({
          id: ctor.constructorId,
          type: "constructor",
          parent: cls.className,
          title: `${cls.className}()`,
          ...ctor,
        });
      });
      cls.methods?.forEach((method) => {
        items.push({
          id: method.methodId,
          type: "method",
          parent: cls.className,
          ...method,
        });
      });
    });
    apiGroup.methods?.forEach((method) => {
      items.push({
        id: method.methodId,
        type: "method",
        title: method.name,
        ...method,
      });
    });
    apiGroup.examples?.forEach((ex) => {
      items.push({
        id: ex.exampleId,
        type: "example",
        title: ex.exampleName || ex.exampleId,
        ...ex,
      });
    });
    return items;
  }, [apiGroup]);

  useEffect(() => {
    setSelectedItemId(null);
  }, [selectedVersion, currentCodeTheam]);

  let currentIndex = apiItems.findIndex((item) => item.id === selectedItemId);
  currentIndex = currentIndex < 0 ? 0 : currentIndex;
  const selectedItem = currentIndex !== -1 ? apiItems[currentIndex] : null;

  function goPrevious() {
    if (currentIndex > 0) {
      setSelectedItemId(apiItems[currentIndex - 1].id);
    }
  }
  function goNext() {
    if (currentIndex !== -1 && currentIndex < apiItems.length - 1) {
      setSelectedItemId(apiItems[currentIndex + 1].id);
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
          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
            <button
              className="flex items-center px-3 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5 mr-1" /> : <Menu className="w-5 h-5 mr-1" />}
              API's
            </button>
            {versionOptions.length > 0 && selectedVersion && (
              <VersionSelector
                versions={versionOptions}
                selectedVersion={selectedVersion}
                onSelect={setSelectedVersion}
              />
            )}
          </div>

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block md:w-72 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700`}
          >
            {versionOptions.length > 0 && selectedVersion && (
              <div className="hidden md:block p-4">
                <VersionSelector
                  versions={versionOptions}
                  selectedVersion={selectedVersion}
                  onSelect={setSelectedVersion}
                />
              </div>
            )}
            {apiGroup && (
              <Sidebar
                apis={apiGroup}
                selectedId={selectedItemId}
                onSelect={(id) => {
                  setSelectedItemId(id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col overflow-hidden p-4">
            <DocContent
              apiDoc={selectedItem}
              onPrevious={goPrevious}
              onNext={goNext}
              hasPrevious={currentIndex > 0}
              hasNext={
                currentIndex !== -1 && currentIndex < apiItems.length - 1
              }
              selectedLanguage={selectedLanguage}
              currentCodeTheam={currentCodeTheam}
            />
          </div>
        </>
      )}
    </div>
  );
}
