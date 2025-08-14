type LanguageSelectorProps = {
  languages: string[];
  selectedLanguage: string | null;
  onSelect: (lang: string) => void;
};

export default function LanguageSelector({
  languages,
  selectedLanguage,
  onSelect,
}: LanguageSelectorProps) {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto justify-items-center">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center">
        Select Language
      </h2>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 justify-center">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium border-2 transition-colors text-sm sm:text-base ${
              selectedLanguage === lang
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-indigo-900 dark:hover:bg-indigo-900"
            }`}
            aria-pressed={selectedLanguage === lang}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Package Install Section */}
      <div className="grid sm:grid-cols-3 gap-6 my-8 w-full max-w-5xl justify-items-center">
        <section className="mb-6 sm:col-span-2">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">
            Package Install
          </h3>
          <pre className="bg-gray-900 dark:bg-gray-800 text-green-300 rounded p-4 overflow-x-auto font-mono whitespace-pre hover:cursor-pointer text-sm">
            <code
              onClick={() =>
                navigator.clipboard.writeText(
                  "npm install @ananay-nag/universal-client"
                )
              }
            >
              npm install @ananay-nag/universal-client
            </code>
            {"\n\n"}
            <code
              onClick={() =>
                navigator.clipboard.writeText(
                  "yarn add @ananay-nag/universal-client"
                )
              }
            >
              yarn add @ananay-nag/universal-client
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
}
