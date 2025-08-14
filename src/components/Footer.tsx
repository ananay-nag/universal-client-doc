export default function Footer() {
  return (
    <footer className="sticky bottom-0 bg-white dark:bg-gray-900 shadow-inner border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>Build: ver : 2.0.1</div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/ananay-nag/universal-client.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Git Repository
          </a>
          <a
            href="https://www.npmjs.com/package/@ananay-nag/universal-client"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            npm Package
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Official Project Repo
          </a>
        </div>
      </div>
    </footer>
  );
}
