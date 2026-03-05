import {
  CheckCircleIcon,
  StarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import type { ChecklistItem } from "../../data/mockAnalyseRC";

export default function Bloc5ChecklistCandidat({
  checklist,
}: {
  checklist: ChecklistItem[];
}) {
  return (
    <section id="bloc-5" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          5
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Checklist candidat
          </h2>
          <p className="text-xs text-gray-500">
            Éléments à intégrer par sous-critère pour structurer le mémoire technique
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {checklist.map((item) => (
          <div
            key={item.sousCritereId}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-900">
                <span className="text-violet-600 mr-2">
                  {item.sousCritereId}
                </span>
                {item.sousCritereNom}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Imperatifs */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                    Impératif
                  </h4>
                </div>
                <ul className="space-y-2">
                  {item.elementsImperatifs.map((el, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      {el}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Differenciants */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <StarIcon className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    Différenciant
                  </h4>
                </div>
                <ul className="space-y-2">
                  {item.elementsDifferenciants.map((el, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {el}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Erreurs penalisantes */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <ExclamationCircleIcon className="w-4 h-4 text-red-500" />
                  <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                    Erreurs pénalisantes
                  </h4>
                </div>
                <ul className="space-y-2">
                  {item.erreursPenalisantes.map((el, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
