const blocs = [
  { id: "bloc-1", label: "Critères du marché", short: "1" },
  { id: "bloc-2", label: "Attendus d'évaluation", short: "2" },
  { id: "bloc-3", label: "Pondération estimée", short: "3" },
  { id: "bloc-4", label: "Matrice des risques", short: "4" },
  { id: "bloc-5", label: "Checklist candidat", short: "5" },
];

export default function BlocNav({ activeBloc }: { activeBloc: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 -mx-4 px-4">
      <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
        {blocs.map((bloc) => {
          const isActive = activeBloc === bloc.id;
          return (
            <button
              key={bloc.id}
              onClick={() => scrollTo(bloc.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {bloc.short}
              </span>
              <span className="hidden sm:inline">{bloc.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
