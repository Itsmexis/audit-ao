import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import type {
  CritereAudit,
  StatutAudit,
  RecapCritere,
} from "../../data/mockAuditAO";

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
  present: {
    label: "Présent",
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

const filterOptions: { key: StatutAudit | "all"; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "present", label: "Présent" },
  { key: "partiel", label: "Partiel" },
  { key: "absent", label: "Absent" },
  { key: "hors-sujet", label: "Hors sujet" },
];

export default function AuditResultDetail({
  criteres,
  recap,
}: {
  criteres: CritereAudit[];
  recap: RecapCritere[];
}) {
  const [expandedSc, setExpandedSc] = useState<Record<string, boolean>>({});
  const [expandedPoint, setExpandedPoint] = useState<Record<string, boolean>>(
    {}
  );
  const [activeFilter, setActiveFilter] = useState<StatutAudit | "all">("all");

  const toggleSc = (id: string) =>
    setExpandedSc((p) => ({ ...p, [id]: !(p[id] ?? true) }));
  const togglePoint = (id: string) =>
    setExpandedPoint((p) => ({ ...p, [id]: !p[id] }));

  // Build a map of sub-criteria scores from recap
  const scoreMap = new Map<string, string>();
  for (const critere of recap) {
    for (const sc of critere.sousCriteres) {
      scoreMap.set(sc.sousCritereId, sc.scoreEstime);
    }
  }

  return (
    <section id="audit-detail" className="scroll-mt-16">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
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
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <FunnelIcon className="w-4 h-4 text-gray-400" />
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.key;
          const countForFilter =
            opt.key === "all"
              ? criteres.reduce(
                  (sum, c) =>
                    sum +
                    c.sousCriteres.reduce(
                      (s, sc) => s + sc.points.length,
                      0
                    ),
                  0
                )
              : criteres.reduce(
                  (sum, c) =>
                    sum +
                    c.sousCriteres.reduce(
                      (s, sc) =>
                        s +
                        sc.points.filter((p) => p.statut === opt.key).length,
                      0
                    ),
                  0
                );
          return (
            <button
              key={opt.key}
              onClick={() => setActiveFilter(opt.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.key !== "all" && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    statutConfig[opt.key as StatutAudit].iconColor.replace(
                      "text-",
                      "bg-"
                    )
                  }`}
                />
              )}
              {opt.label}
              <span className="text-[10px] opacity-60">({countForFilter})</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {criteres.map((critere) => {
          // Check if any points match the filter for this entire critere
          const hasMatchingPoints =
            activeFilter === "all" ||
            critere.sousCriteres.some((sc) =>
              sc.points.some((p) => p.statut === activeFilter)
            );

          if (!hasMatchingPoints) return null;

          return (
            <div key={critere.id}>
              {/* Critere header */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-bold text-gray-900">
                  {critere.nom}
                </h3>
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {critere.ponderation}%
                </span>
              </div>

              <div className="space-y-3">
                {critere.sousCriteres.map((sc) => {
                  const filteredPoints =
                    activeFilter === "all"
                      ? sc.points
                      : sc.points.filter((p) => p.statut === activeFilter);

                  if (filteredPoints.length === 0) return null;

                  const isOpen = expandedSc[sc.id] ?? true;
                  const conforme = sc.points.filter(
                    (p) => p.statut === "present"
                  ).length;
                  const total = sc.points.length;
                  const ratio = total > 0 ? conforme / total : 0;
                  const ratioColor =
                    ratio >= 0.8
                      ? "text-emerald-600"
                      : ratio >= 0.5
                        ? "text-amber-600"
                        : "text-red-600";

                  const estimatedScore = scoreMap.get(sc.id);

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
                            <span className="text-blue-600 mr-2">
                              {sc.id}
                            </span>
                            {sc.nom}
                          </span>
                          <span className="text-xs text-gray-400">
                            {sc.ponderation} pts
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {estimatedScore && (
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                ratio >= 0.8
                                  ? "bg-emerald-100 text-emerald-700"
                                  : ratio >= 0.5
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {estimatedScore}
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold ${ratioColor}`}
                          >
                            {conforme}/{total}
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
                          {filteredPoints.map((point) => {
                            const config = statutConfig[point.statut];
                            const Icon = config.icon;
                            const isExpanded =
                              expandedPoint[point.id] ?? false;

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
                                      point.statut === "present"
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
          );
        })}
      </div>
    </section>
  );
}
