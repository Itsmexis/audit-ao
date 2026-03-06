import { LightBulbIcon } from "@heroicons/react/24/outline";
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
            Pondération estimée
          </h2>
          <p className="text-xs text-gray-500">
            Ventilation probable de la note par critère/sous-critère
          </p>
        </div>
      </div>
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
              <table className="w-full text-sm table-fixed">
                <colgroup>
                  <col className="w-[30%]" />
                  <col className="w-[10%]" />
                  <col className="w-[60%]" />
                </colgroup>
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-2 font-medium">Item</th>
                    <th className="px-4 py-2 font-medium text-center">
                      Points
                    </th>
                    <th className="px-4 py-2 font-medium">Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sc.items.map((item, i) => (
                    <tr
                      key={i}
                      className={`hover:bg-gray-50 ${item.pointsEstimes == null ? "bg-violet-50/30" : ""}`}
                    >
                      <td className="px-4 py-2.5 text-gray-900 font-medium">
                        <div className="flex items-center gap-1.5">
                          {item.pointsEstimes == null && (
                            <LightBulbIcon className="w-4 h-4 text-violet-400 shrink-0" />
                          )}
                          {item.nom}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {item.pointsEstimes != null ? (
                          <span className="inline-flex items-center justify-center w-10 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
                            {item.pointsEstimes}
                          </span>
                        ) : (
                          <span className="text-[10px] text-violet-400 italic">
                            suggestion
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">
                        {item.justification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
