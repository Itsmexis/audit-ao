import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import type { Risque } from "../../data/mockAnalyseRC";

const niveauConfig = {
  critique: {
    label: "Critique",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    icon: ShieldExclamationIcon,
    iconColor: "text-red-500",
    accent: "border-l-red-500",
  },
  eleve: {
    label: "Élevé",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    icon: ExclamationTriangleIcon,
    iconColor: "text-amber-500",
    accent: "border-l-amber-500",
  },
  modere: {
    label: "Modéré",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    icon: InformationCircleIcon,
    iconColor: "text-blue-500",
    accent: "border-l-blue-500",
  },
};

export default function Bloc4MatriceRisques({ risques }: { risques: Risque[] }) {
  const grouped = {
    critique: risques.filter((r) => r.niveau === "critique"),
    eleve: risques.filter((r) => r.niveau === "eleve"),
    modere: risques.filter((r) => r.niveau === "modere"),
  };

  return (
    <section id="bloc-4" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          4
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Matrice des risques
          </h2>
          <p className="text-xs text-gray-500">
            Points d'attention spécifiques identifiés dans le RC
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

      <div className="space-y-3">
        {risques.map((risque) => {
          const config = niveauConfig[risque.niveau];
          const Icon = config.icon;
          return (
            <div
              key={risque.id}
              className={`rounded-lg border ${config.border} ${config.bg} border-l-4 ${config.accent} overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Icon
                    className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {risque.point}
                      </h4>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${config.badge}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {risque.critereLie}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {risque.description}
                    </p>
                    <div className="bg-white/70 rounded-md px-3 py-2 border border-gray-200/50">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Recommandation
                      </p>
                      <p className="text-sm text-gray-800">
                        {risque.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
