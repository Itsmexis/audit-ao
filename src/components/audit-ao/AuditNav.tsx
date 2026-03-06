const sections = [
  { id: "audit-detail", label: "Audit détaillé", short: "A" },
  { id: "recommandations", label: "Recommandations", short: "R" },
  { id: "synthese-reponse", label: "Synthèse de la réponse", short: "S" },
];

export default function AuditNav({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 -mx-4 px-4">
      <div className="flex items-center gap-1 py-2">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-100 text-violet-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {section.short}
              </span>
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
