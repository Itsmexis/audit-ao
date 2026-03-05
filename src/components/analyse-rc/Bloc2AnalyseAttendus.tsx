import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Attendu } from "../../data/mockAnalyseRC";

export default function Bloc2AnalyseAttendus({ attendus }: { attendus: Attendu[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="bloc-2" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          2
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Analyse des attendus d'évaluation
          </h2>
          <p className="text-xs text-gray-500">
            Interprétation basée sur des marchés comparables
          </p>
        </div>
      </div>
      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mb-4 ml-11">
        Les éléments ci-dessous sont des interprétations probabilistes, distinctes des critères officiels du Bloc 1.
      </p>

      <div className="space-y-3">
        {attendus.map((a) => {
          const isOpen = expanded[a.sousCritereId] ?? true;
          return (
            <div
              key={a.sousCritereId}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggle(a.sousCritereId)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="text-sm font-semibold text-gray-900">
                  <span className="text-violet-600 mr-2">
                    {a.sousCritereId}
                  </span>
                  {a.sousCritereNom}
                </span>
                {isOpen ? (
                  <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  {/* Finalite probable */}
                  <div className="p-4">
                    <h4 className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-2">
                      Finalité probable
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {a.finaliteProbable}
                    </p>
                  </div>

                  {/* Attendus implicites */}
                  <div className="p-4">
                    <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                      Attendus implicites
                    </h4>
                    <ul className="space-y-1.5">
                      {a.attendusImplicites.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ce que le jury securise */}
                  <div className="p-4">
                    <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">
                      Ce que le jury sécurise
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {a.jurySecurise}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
