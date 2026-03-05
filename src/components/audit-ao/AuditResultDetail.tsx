import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import type { CritereAudit, StatutAudit } from "../../data/mockAuditAO";

const statutConfig: Record<
  StatutAudit,
  {
    label: string;
    icon: typeof CheckCircleIcon;
    iconColor: string;
    bg: string;
    badge: string;
  }
> = {
  couvert: {
    label: "Couvert",
    icon: CheckCircleIcon,
    iconColor: "text-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
  },
  partiel: {
    label: "Partiel",
    icon: ExclamationTriangleIcon,
    iconColor: "text-amber-500",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
  },
  absent: {
    label: "Absent",
    icon: XCircleIcon,
    iconColor: "text-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
  },
  "hors-sujet": {
    label: "Hors sujet",
    icon: QuestionMarkCircleIcon,
    iconColor: "text-gray-400",
    bg: "bg-gray-50",
    badge: "bg-gray-200 text-gray-600",
  },
};

export default function AuditResultDetail({
  criteres,
}: {
  criteres: CritereAudit[];
}) {
  const [expandedSc, setExpandedSc] = useState<Record<string, boolean>>({});
  const [expandedPoint, setExpandedPoint] = useState<Record<string, boolean>>(
    {}
  );

  const toggleSc = (id: string) =>
    setExpandedSc((p) => ({ ...p, [id]: !(p[id] ?? true) }));
  const togglePoint = (id: string) =>
    setExpandedPoint((p) => ({ ...p, [id]: !p[id] }));

  return (
    <section id="audit-detail" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          A
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Audit détaillé du mémoire technique
          </h2>
          <p className="text-xs text-gray-500">
            Vérification point par point de la conformité aux critères
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {criteres.map((critere) => (
          <div key={critere.id}>
            {/* Critere header */}
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-bold text-gray-900">
                {critere.nom}
              </h3>
              <span className="text-xs font-semibold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                {critere.ponderation}%
              </span>
            </div>

            <div className="space-y-3">
              {critere.sousCriteres.map((sc) => {
                const isOpen = expandedSc[sc.id] ?? true;
                const couvert = sc.points.filter(
                  (p) => p.statut === "couvert"
                ).length;
                const total = sc.points.length;
                const ratio = total > 0 ? couvert / total : 0;
                const ratioColor =
                  ratio >= 0.8
                    ? "text-emerald-600"
                    : ratio >= 0.5
                      ? "text-amber-600"
                      : "text-red-600";

                return (
                  <div
                    key={sc.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSc(sc.id)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-semibold text-gray-900">
                          <span className="text-violet-600 mr-2">
                            {sc.id}
                          </span>
                          {sc.nom}
                        </span>
                        <span className="text-xs text-gray-400">
                          {sc.ponderation} pts
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-xs font-bold ${ratioColor}`}
                        >
                          {couvert}/{total}
                        </span>
                        {isOpen ? (
                          <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-gray-100">
                        {sc.points.map((point) => {
                          const config = statutConfig[point.statut];
                          const Icon = config.icon;
                          const isExpanded = expandedPoint[point.id] ?? false;

                          return (
                            <div key={point.id}>
                              <button
                                onClick={() => togglePoint(point.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                              >
                                <Icon
                                  className={`w-5 h-5 ${config.iconColor} shrink-0`}
                                />
                                <span className="text-sm text-gray-700 flex-1">
                                  {point.label}
                                </span>
                                <span
                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${config.badge}`}
                                >
                                  {config.label}
                                </span>
                              </button>

                              {isExpanded && (
                                <div
                                  className={`mx-4 mb-3 rounded-lg ${config.bg} p-3 border-l-3 ${
                                    point.statut === "couvert"
                                      ? "border-l-emerald-500"
                                      : point.statut === "partiel"
                                        ? "border-l-amber-500"
                                        : point.statut === "absent"
                                          ? "border-l-red-500"
                                          : "border-l-gray-400"
                                  }`}
                                >
                                  {point.extrait && (
                                    <div className="mb-2">
                                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        Extrait du mémoire
                                      </p>
                                      <p className="text-sm text-gray-700 italic bg-white/60 rounded px-2 py-1.5">
                                        "{point.extrait}"
                                      </p>
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                      Analyse
                                    </p>
                                    <p className="text-sm text-gray-800">
                                      {point.commentaire}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
