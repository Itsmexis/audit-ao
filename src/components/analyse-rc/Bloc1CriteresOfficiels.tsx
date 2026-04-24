import { InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Critere } from "../../data/mockAnalyseRC";

export default function Bloc1CriteresOfficiels({ criteres }: { criteres: Critere[] }) {
  return (
    <section id="bloc-1" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center">
          1
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Critères du marché
          </h2>
          <p className="text-xs text-gray-500">
            Critères et sous-critères du marché extraits du règlement de consultation
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
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
                    <p className="text-sm text-gray-700 flex items-center gap-1.5">
                      <span className="font-medium text-gray-500 mr-2">
                        {sc.id}
                      </span>
                      {sc.nom}
                      {sc.formuleNotation && (
                        <span className="relative group">
                          <InformationCircleIcon className="w-4 h-4 text-gray-400 hover:text-brand-500 cursor-help" />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap bg-gray-900 text-white text-xs font-mono px-3 py-1.5 rounded-lg shadow-lg">
                            {sc.formuleNotation}
                          </span>
                        </span>
                      )}
                    </p>
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
    </section>
  );
}
