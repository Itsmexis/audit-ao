import type { AuditAOData, RecapCritere } from "../../data/mockAuditAO";

function parseScore(score: string): { obtained: number; total: number } {
  const [obtained, total] = score.split("/").map(Number);
  return { obtained, total };
}

const statutConfig = {
  present: { label: "Présent", color: "bg-emerald-500" },
  partiel: { label: "Partiel", color: "bg-amber-500" },
  absent: { label: "Absent", color: "bg-red-500" },
  "hors-sujet": { label: "Hors sujet", color: "bg-gray-400" },
};

export default function AuditScoreHeader({
  data,
  recap,
}: {
  data: AuditAOData;
  recap: RecapCritere[];
}) {
  // Compute estimated weighted score from recap
  const critereScores = recap.map((critere) => {
    let totalObtained = 0;
    let totalMax = 0;
    for (const sc of critere.sousCriteres) {
      const { obtained, total } = parseScore(sc.scoreEstime);
      totalObtained += obtained;
      totalMax += total;
    }
    const percentage = totalMax > 0 ? totalObtained / totalMax : 0;
    return {
      id: critere.critereId,
      nom: critere.critereNom,
      ponderation: critere.ponderation,
      obtained: totalObtained,
      max: totalMax,
      percentage,
    };
  });

  const weightedScore = Math.round(
    critereScores.reduce((sum, c) => sum + c.percentage * c.ponderation, 0)
  );
  const totalWeight = critereScores.reduce((sum, c) => sum + c.ponderation, 0);
  const globalPercentage =
    totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;

  const scoreColor =
    globalPercentage >= 80
      ? "text-emerald-600"
      : globalPercentage >= 60
        ? "text-amber-600"
        : "text-red-600";

  const ringColor =
    globalPercentage >= 80
      ? "stroke-emerald-500"
      : globalPercentage >= 60
        ? "stroke-amber-500"
        : "stroke-red-500";

  const stats = [
    { key: "present" as const, count: data.presentCount },
    { key: "partiel" as const, count: data.partielCount },
    { key: "absent" as const, count: data.absentCount },
    { key: "hors-sujet" as const, count: data.horsSujetCount },
  ];

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
              strokeDasharray={`${globalPercentage * 2.64} ${264 - globalPercentage * 2.64}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${scoreColor}`}>
              {weightedScore}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              /{totalWeight}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
            Note estimée du mémoire
          </p>
          <h3 className="text-sm font-semibold text-gray-900 truncate mt-0.5">
            {data.memoireTitre}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Ref. {data.marcheRef} - Audit du {data.dateAudit}
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-3 flex-wrap">
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

        {/* Per-criteria breakdown */}
        <div className="flex gap-3 flex-wrap">
          {critereScores.map((c) => {
            const pct = Math.round(c.percentage * 100);
            const color =
              pct >= 80
                ? "text-emerald-600"
                : pct >= 60
                  ? "text-amber-600"
                  : "text-red-600";
            const bg =
              pct >= 80
                ? "bg-emerald-50 border-emerald-200"
                : pct >= 60
                  ? "bg-amber-50 border-amber-200"
                  : "bg-red-50 border-red-200";
            return (
              <div
                key={c.id}
                className={`${bg} border rounded-lg px-3 py-2 text-center min-w-[90px]`}
              >
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                  {c.id}
                </p>
                <p className={`text-lg font-bold ${color}`}>
                  {c.obtained}
                  <span className="text-xs text-gray-400 font-medium">
                    /{c.max}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
