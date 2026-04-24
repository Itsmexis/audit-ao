import {
  ExclamationCircleIcon,
  ArrowPathIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import type { Recommandation } from "../../data/mockAuditAO";

const typeConfig = {
  erreur: {
    label: "Erreur",
    badge: "bg-red-100 text-red-700",
    icon: ExclamationCircleIcon,
    iconColor: "text-red-500",
  },
  incoherence: {
    label: "Incohérence",
    badge: "bg-amber-100 text-amber-700",
    icon: ArrowPathIcon,
    iconColor: "text-amber-500",
  },
  amelioration: {
    label: "Amélioration",
    badge: "bg-brand-100 text-brand-700",
    icon: LightBulbIcon,
    iconColor: "text-brand-500",
  },
};

export default function RecommandationsAmelioration({
  recommandations,
}: {
  recommandations: Recommandation[];
}) {
  const erreurs = recommandations.filter((r) => r.type === "erreur");
  const incoherences = recommandations.filter((r) => r.type === "incoherence");
  const ameliorations = recommandations.filter((r) => r.type === "amelioration");

  return (
    <section id="recommandations" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center">
          R
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recommandations
          </h2>
          <p className="text-xs text-gray-500">
            Erreurs, incohérences et pistes d'amélioration détectées dans le mémoire
          </p>
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex gap-3 mb-4">
        {([
          { key: "erreur" as const, items: erreurs },
          { key: "incoherence" as const, items: incoherences },
          { key: "amelioration" as const, items: ameliorations },
        ]).map(({ key, items }) => {
          const config = typeConfig[key];
          const Icon = config.icon;
          return (
            <div
              key={key}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.badge}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {items.length} {config.label}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden divide-y divide-gray-100">
        {recommandations.map((r, i) => {
          const config = typeConfig[r.type];
          const Icon = config.icon;
          return (
            <div key={i} className="px-4 py-3">
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {r.titre}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${config.badge}`}>
                      {config.label}
                    </span>
                    {r.page && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        {r.page}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {r.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
