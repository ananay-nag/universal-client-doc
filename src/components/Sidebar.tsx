import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import type { IAPIDocumentation } from "../types";

interface SidebarProps {
  apis: IAPIDocumentation;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function Sidebar({ apis, selectedId, onSelect }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openClasses, setOpenClasses] = useState<Record<string, boolean>>({});
  const [methodsOpen, setMethodsOpen] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();

    const classes = (apis.claasNames || [])
      .map((cls) => {
        const constructors = (cls.constructor || []).filter(
          (c) =>
            `${cls.className}()`.toLowerCase().includes(term) ||
            (
              (Array.isArray(c.description)
                ? c.description.join(" ")
                : c.description || "") as string
            )
              .toLowerCase()
              .includes(term)
        );
        const methods = (cls.methods || []).filter((m) =>
          (m.name || "").toLowerCase().includes(term)
        );

        return {
          id: cls.classId,
          title: cls.className,
          constructors,
          methods,
        };
      })
      .filter(
        (cls) =>
          cls.title.toLowerCase().includes(term) ||
          cls.constructors.length > 0 ||
          cls.methods.length > 0
      );

    const methods = (apis.methods || []).filter((m) =>
      (m.name || "").toLowerCase().includes(term)
    );
    const examples = (apis.examples || []).filter((exm: any) => exm);

    return { classes, methods, examples };
  }, [apis, searchTerm]);

  const toggleClass = (id: string) => {
    setOpenClasses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full max-w-xs md:max-w-sm bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute top-3 left-3 pointer-events-none" />
          <input
            type="search"
            aria-label="Search APIs"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <nav
        className="flex-1 overflow-y-auto p-4 space-y-2"
        aria-label="API List"
      >
        {/* Classes */}
        {filtered.classes.length > 0 && (
          <div>
            {filtered.classes.map((cls) => (
              <div key={cls.id} className="mb-1">
                <button
                  onClick={() => toggleClass(cls.id)}
                  className="flex justify-between w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200"
                >
                  Classes
                  {openClasses[cls.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {openClasses[cls.id] && (
                  <div className="pl-4 py-2 space-y-1">
                    <h2 className="font-bold mb-1 text-blue-800 dark:text-white">
                      Construtors
                    </h2>
                    {cls.constructors.map((c) => (
                      <div
                        key={c.constructorId}
                        onClick={() => onSelect(c.constructorId)}
                        className={`cursor-pointer px-2 py-1 rounded text-blue-800  dark:text-white ${
                          selectedId === c.constructorId
                            ? "bg-indigo-600 text-white dark:bg-indigo-600"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {c.name || cls.title}
                      </div>
                    ))}
                    <h2 className="font-bold mb-1 text-blue-800 dark:text-white">
                      Methods
                    </h2>
                    {cls.methods.map((m) => (
                      <div
                        key={m.methodId}
                        onClick={() => onSelect(m.methodId)}
                        className={`cursor-pointer px-2 py-1 rounded text-blue-800 dark:text-white ${
                          selectedId === m.methodId
                            ? "bg-indigo-600 text-white dark:bg-indigo-600"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {m.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Global methods */}
        {filtered.methods.length > 0 && (
          <div>
            <button
              onClick={() => setMethodsOpen(!methodsOpen)}
              className="flex justify-between w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 font-bold"
            >
              Methods
              {methodsOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {methodsOpen && (
              <div className="pl-4 py-2 space-y-1">
                {filtered.methods.map((m) => (
                  <div
                    key={m.methodId}
                    onClick={() => onSelect(m.methodId)}
                    className={`cursor-pointer px-2 py-1 rounded text-blue-800 dark:text-white ${
                      selectedId === m.methodId
                        ? "bg-indigo-600 text-white dark:bg-indigo-600"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Examples */}
        {filtered.examples.length > 0 && (
          <div>
            <button
              onClick={() => setExampleOpen(!exampleOpen)}
              className="flex justify-between w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 font-bold"
            >
              Examples
              {exampleOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {exampleOpen && (
              <div className="pl-4 py-2 space-y-1">
                {filtered.examples.map((ex : any) => (
                  <div
                    key={ex.exampleId}
                    onClick={() => onSelect(ex.exampleId)}
                    className={`cursor-pointer px-2 py-1 rounded text-blue-800 dark:text-white ${
                      selectedId === ex.methodId
                        ? "bg-indigo-600 text-white dark:bg-indigo-600"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {ex.exampleName || ex.exampleId}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {filtered.classes.length === 0 && filtered.methods.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
            No APIs found.
          </p>
        )}
      </nav>
    </aside>
  );
}
