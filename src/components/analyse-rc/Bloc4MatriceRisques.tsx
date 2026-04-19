import {
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import type { Risque } from "../../data/mockAnalyseRC";

const niveauConfig = {
  critique: {
    label: "Critique",
    badge: "bg-red-100 text-red-700",
    icon: ShieldExclamationIcon,
    iconColor: "text-red-500",
    dot: "bg-red-500",
  },
  eleve: {
    label: "Élevé",
    badge: "bg-amber-100 text-amber-700",
    icon: ExclamationTriangleIcon,
    iconColor: "text-amber-500",
    dot: "bg-amber-500",
  },
  modere: {
    label: "Modéré",
    badge: "bg-blue-100 text-blue-700",
    icon: InformationCircleIcon,
    iconColor: "text-blue-500",
    dot: "bg-blue-400",
  },
};

export default function Bloc4MatriceRisques({ risques }: { risques: Risque[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) =>
    setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const toggleDone = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const grouped = {
    critique: risques.filter((r) => r.niveau === "critique"),
    eleve: risques.filter((r) => r.niveau === "eleve"),
    modere: risques.filter((r) => r.niveau === "modere"),
  };

  return (
    <section id="bloc-4" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
          4
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Matrice des risques
          </h2>
          <p className="text-xs text-gray-500">
            Points d'attention identifiés dans le RC - cliquez pour voir la recommandation
          </p>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex gap-3 mb-4">
        {(["critique", "eleve", "modere"] as const).map((niveau) => {
          const config = niveauConfig[niveau];
          const count = grouped[niveau].length;
          return (
            <div
              key={niveau}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.badge}`}
            >
              <config.icon className="w-3.5 h-3.5" />
              {count} {config.label}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {risques.map((risque) => {
            const config = niveauConfig[risque.niveau];
            const isExpanded = expanded[risque.id] ?? false;
            const isDone = done.has(risque.id);

            return (
              <div key={risque.id}>
                <div
                  onClick={() => toggleExpand(risque.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer select-none"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${config.dot}`} />
                  <span
                    className={`text-sm flex-1 ${isDone ? "text-gray-400 line-through" : "text-gray-900 font-medium"}`}
                  >
                    {risque.point}
                  </span>
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {risque.critereLie}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${config.badge}`}
                  >
                    {config.label}
                  </span>
                  {isExpanded ? (
                    <ChevronUpIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  )}
                </div>

                {isExpanded && (
                  <div className="px-4 pb-3 ml-5">
                    <p className="text-sm text-gray-600 mb-2">
                      {risque.description}
                    </p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDone(risque.id);
                      }}
                      className={`flex items-start gap-2 px-3 py-2 rounded-md cursor-pointer select-none transition-colors ${
                        isDone
                          ? "bg-emerald-50 text-gray-400"
                          : "bg-blue-50 text-blue-800"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase text-blue-500 shrink-0 mt-0.5">
                        Reco
                      </span>
                      <span
                        className={`text-sm flex-1 ${isDone ? "line-through" : ""}`}
                      >
                        {risque.recommendation}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
