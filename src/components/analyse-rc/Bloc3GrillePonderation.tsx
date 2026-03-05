import type { PonderationSousCritere } from "../../data/mockAnalyseRC";

export default function Bloc3GrillePonderation({
  ponderation,
}: {
  ponderation: PonderationSousCritere[];
}) {
  return (
    <section id="bloc-3" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          3
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Grille officieuse de pondération interne estimative
          </h2>
          <p className="text-xs text-gray-500">
            Décomposition estimative par sous-critère
          </p>
        </div>
      </div>
      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mb-4 ml-11">
        Pondération non contractuelle - estimations basées sur des marchés publics comparables.
      </p>

      <div className="space-y-4">
        {ponderation.map((sc) => (
          <div
            key={sc.sousCritereId}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-900">
                <span className="text-violet-600 mr-2">
                  {sc.sousCritereId}
                </span>
                {sc.sousCritereNom}
              </span>
              <span className="text-sm font-bold text-violet-700">
                {sc.totalPoints} pts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-2 font-medium">Item</th>
                    <th className="px-4 py-2 font-medium w-24 text-center">
                      Points
                    </th>
                    <th className="px-4 py-2 font-medium">Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sc.items.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-900 font-medium">
                        {item.nom}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
                          {item.pointsEstimes}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">
                        {item.justification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Barre de repartition mini */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                {sc.items.map((item, i) => {
                  const shades = [
                    "bg-violet-600",
                    "bg-violet-500",
                    "bg-violet-400",
                    "bg-violet-300",
                    "bg-violet-200",
                  ];
                  return (
                    <div
                      key={i}
                      className={shades[i % shades.length]}
                      style={{
                        width: `${(item.pointsEstimes / sc.totalPoints) * 100}%`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {sc.impactPrix && (
              <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
                <p className="text-xs text-amber-700">
                  <span className="font-semibold">Impact prix :</span>{" "}
                  {sc.impactPrix}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
