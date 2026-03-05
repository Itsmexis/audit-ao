import type { Critere } from "../../data/mockAnalyseRC";

export default function Bloc1CriteresOfficiels({ criteres }: { criteres: Critere[] }) {
  return (
    <section id="bloc-1" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          1
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Critères officiels
          </h2>
          <p className="text-xs text-gray-500">
            Reproduction fidèle du RC - aucune interprétation
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {criteres.map((critere) => (
          <div
            key={critere.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* Header critere */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {critere.nom}
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-700">
                {critere.ponderation}%
              </span>
            </div>

            {/* Sous-criteres */}
            <div className="divide-y divide-gray-100">
              {critere.sousCriteres.map((sc) => (
                <div
                  key={sc.id}
                  className="px-4 py-3 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-500 mr-2">
                        {sc.id}
                      </span>
                      {sc.nom}
                    </p>
                    {sc.formuleNotation && (
                      <p className="mt-1 text-xs text-gray-400 font-mono bg-gray-50 inline-block px-2 py-0.5 rounded">
                        {sc.formuleNotation}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-gray-900">
                    {sc.ponderation} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Barre visuelle de repartition */}
      <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-medium text-gray-500 mb-2">
          Répartition des pondérations
        </p>
        <div className="flex h-6 rounded-full overflow-hidden">
          {criteres.map((c, i) => {
            const colors = [
              "bg-violet-500",
              "bg-amber-500",
              "bg-emerald-500",
            ];
            return (
              <div
                key={c.id}
                className={`${colors[i % colors.length]} flex items-center justify-center`}
                style={{ width: `${c.ponderation}%` }}
              >
                <span className="text-[10px] font-bold text-white">
                  {c.ponderation}%
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-2">
          {criteres.map((c, i) => {
            const dotColors = [
              "bg-violet-500",
              "bg-amber-500",
              "bg-emerald-500",
            ];
            return (
              <div key={c.id} className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${dotColors[i % dotColors.length]}`}
                />
                <span className="text-xs text-gray-600">{c.nom}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
