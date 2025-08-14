import type { IVersionData } from "../types";

export default function VersionSelector({
  versions,
  selectedVersion,
  onSelect,
}: any) {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor="version-select"
        className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm sm:text-base"
      >
        Select Version:
      </label>
      <select
        id="version-select"
        value={selectedVersion}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 sm:px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {versions.map((v: IVersionData) => (
          <option key={v.version} value={v.version} id={v.versionId}>
            {v.version}
          </option>
        ))}
      </select>
    </div>
  );
}
