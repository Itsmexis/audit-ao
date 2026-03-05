import type { AuditAOData } from "../../data/mockAuditAO";

const statutConfig = {
  couvert: { label: "Couvert", color: "bg-emerald-500" },
  partiel: { label: "Partiel", color: "bg-amber-500" },
  absent: { label: "Absent", color: "bg-red-500" },
  "hors-sujet": { label: "Hors sujet", color: "bg-gray-400" },
};

export default function AuditScoreHeader({ data }: { data: AuditAOData }) {
  const stats = [
    { key: "couvert" as const, count: data.couvertCount },
    { key: "partiel" as const, count: data.partielCount },
    { key: "absent" as const, count: data.absentCount },
    { key: "hors-sujet" as const, count: data.horsSujetCount },
  ];

  const scoreColor =
    data.scoreGlobal >= 80
      ? "text-emerald-600"
      : data.scoreGlobal >= 60
        ? "text-amber-600"
        : "text-red-600";

  const ringColor =
    data.scoreGlobal >= 80
      ? "stroke-emerald-500"
      : data.scoreGlobal >= 60
        ? "stroke-amber-500"
        : "stroke-red-500";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-6 flex-wrap">
        {/* Score ring */}
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              className={ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${data.scoreGlobal * 2.64} ${264 - data.scoreGlobal * 2.64}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${scoreColor}`}>
              {data.scoreGlobal}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">/100</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {data.memoireTitre}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Ref. {data.marcheRef} - Audit du {data.dateAudit}
          </p>

          {/* Stats bar */}
          <div className="mt-3 flex h-3 rounded-full overflow-hidden bg-gray-100">
            {stats.map(
              ({ key, count }) =>
                count > 0 && (
                  <div
                    key={key}
                    className={`${statutConfig[key].color} transition-all`}
                    style={{
                      width: `${(count / data.totalPoints) * 100}%`,
                    }}
                  />
                )
            )}
          </div>

          <div className="flex gap-4 mt-2 flex-wrap">
            {stats.map(({ key, count }) => (
              <span
                key={key}
                className="flex items-center gap-1.5 text-xs text-gray-600"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${statutConfig[key].color}`}
                />
                {count} {statutConfig[key].label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
