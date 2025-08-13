import type { IParameter } from "../types";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// Choose a style from the available options, e.g., dracula, atom-one-dark, etc.
// You might also need to import specific language definitions if using a subset
// import { jsx } from 'react-syntax-highlighter/dist/esm/languages/hljs';

type DocContentProps = {
  apiDoc: {
    type?: string;
    title?: string;
    name?: string;
    parent?: string;
    description?: string[];
    parameters?: any[];
    returnType?: string;
    returnDescription?: string;
    codeExample?: string;
    properties?: any[];
  } | null;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  selectedLanguage: string;
  currentCodeTheam: any

};

export default function DocContent({
  apiDoc,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  selectedLanguage,
  currentCodeTheam
  
}: DocContentProps) {
  if (!apiDoc) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400">
        <div className="grid  mb-12 w-full justify-items-center">
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">
              Package Install
            </h3>
            <pre className="bg-gray-900 dark:bg-gray-800 text-green-300 rounded p-4 overflow-x-auto font-mono whitespace-pre-wrap hover:cursor-pointer">
              <code
                onClick={() =>
                  navigator.clipboard.writeText(
                    "npm install @ananay-nag/universal-client"
                  )
                }
              >
                npm install @ananay-nag/universal-client
              </code>
              <br />
              <br />
              <code
                onClick={() =>
                  navigator.clipboard.writeText(
                    "yarn add @ananay-nag/universal-client"
                  )
                }
              >
                yarn add @ananay-nag/universal-client
              </code>
              <br />
            </pre>
          </section>
        </div>
      </div>
    );
  }

  const {
    type,
    title,
    parent,
    description = [],
    parameters = [],
    returnType,
    returnDescription,
    codeExample,
    properties = [],
  } = apiDoc;

  const showParams = parameters && parameters.length > 0;
  const showProps = properties && properties.length > 0;

  return (
    // Full height flex column layout
    <main className="flex flex-col h-full bg-white dark:bg-gray-900 rounded shadow-md">
      {/* Scrollable content area */}
      <div className="flex-grow overflow-y-auto p-6">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100">
          {title || apiDoc.name}
        </h2>

        <p className="mb-4 text-gray-500 dark:text-gray-400 italic">
          {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
          {parent ? ` of ${parent}` : ""}
        </p>

        {description.length > 0 && (
          <section className="mb-6">
            {description.map((line: string, idx: number) => (
              <p key={idx} className="mb-2 text-gray-700 dark:text-gray-300">
                {line}
              </p>
            ))}
          </section>
        )}

        {showParams && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Parameters
            </h3>
            <ParameterTable items={parameters} />
          </section>
        )}

        {showProps && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Properties</h3>
            <ParameterTable items={properties} />
          </section>
        )}

        {returnType && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white text-indigo-600">
              Returns
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                {returnType}
              </span>
              {returnDescription ? ` – ${returnDescription}` : ""}
            </p>
          </section>
        )}

        {codeExample && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Code Example
            </h3>
            <SyntaxHighlighter language={selectedLanguage} style={currentCodeTheam}>
              {codeExample}
            </SyntaxHighlighter>
            {/* <pre className="bg-gray-900 dark:bg-gray-800 text-green-300 rounded p-4 overflow-x-auto font-mono whitespace-pre-wrap">
              <code>{codeExample}</code>
            </pre> */}
          </section>
        )}
      </div>

      {/* Sticky footer always at bottom */}
      <footer className="flex justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            hasPrevious
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            hasNext
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </footer>
    </main>
  );
}

/** Parameters/Properties table */
function ParameterTable({ items }: { items: IParameter[] }) {
  return (
    <table className="w-full table-auto border-collapse ">
      <thead>
        <tr>
          <th className="border-b border-gray-300 dark:border-gray-700 p-2 text-left text-gray-700 dark:text-gray-300">
            Name
          </th>
          <th className="border-b border-gray-300 dark:border-gray-700 p-2 text-left text-gray-700 dark:text-gray-300">
            Type
          </th>
          <th className="border-b border-gray-300 dark:border-gray-700 p-2 text-left text-gray-700 dark:text-gray-300">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <td className="border-b border-gray-200 dark:border-gray-700 p-2 text-indigo-700 dark:text-white">
              {item.name}
            </td>
            <td className="border-b border-gray-200 dark:border-gray-700 p-2 font-mono text-indigo-700 dark:text-white">
              {item.type}
            </td>
            <td className="border-b border-gray-200 dark:border-gray-700 p-2 text-indigo-700 dark:text-white">
              {Array.isArray(item.description)
                ? item.description.join(" ")
                : item.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
