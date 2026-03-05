import {
  CheckIcon,
  XMarkIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import type { ConformiteGroupe } from "../../data/mockAnalyseRC";

export default function Bloc6MatriceConformite({
  conformite: initial,
}: {
  conformite: ConformiteGroupe[];
}) {
  const [data, setData] = useState(initial);

  const cycleState = (groupIdx: number, itemIdx: number) => {
    setData((prev) => {
      const next = prev.map((g, gi) => {
        if (gi !== groupIdx) return g;
        return {
          ...g,
          items: g.items.map((item, ii) => {
            if (ii !== itemIdx) return item;
            const nextState =
              item.conforme === null
                ? true
                : item.conforme === true
                  ? false
                  : null;
            return { ...item, conforme: nextState };
          }),
        };
      });
      return next;
    });
  };

  const totalItems = data.reduce((sum, g) => sum + g.items.length, 0);
  const conformeCount = data.reduce(
    (sum, g) => sum + g.items.filter((i) => i.conforme === true).length,
    0
  );
  const nonConformeCount = data.reduce(
    (sum, g) => sum + g.items.filter((i) => i.conforme === false).length,
    0
  );
  const pendingCount = totalItems - conformeCount - nonConformeCount;
  const progressPercent =
    totalItems > 0
      ? Math.round(((conformeCount + nonConformeCount) / totalItems) * 100)
      : 0;

  return (
    <section id="bloc-6" className="scroll-mt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
          6
        </span>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Matrice de conformité
          </h2>
          <p className="text-xs text-gray-500">
            Suivez votre conformité point par point - cliquez pour changer l'état
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progression
          </span>
          <span className="text-sm text-gray-500">
            {progressPercent}% vérifié
          </span>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
          {conformeCount > 0 && (
            <div
              className="bg-emerald-500 transition-all"
              style={{ width: `${(conformeCount / totalItems) * 100}%` }}
            />
          )}
          {nonConformeCount > 0 && (
            <div
              className="bg-red-400 transition-all"
              style={{ width: `${(nonConformeCount / totalItems) * 100}%` }}
            />
          )}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {conformeCount} conforme(s)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            {nonConformeCount} non conforme(s)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            {pendingCount} à vérifier
          </span>
        </div>
      </div>

      {/* Conformite groups */}
      <div className="space-y-3">
        {data.map((groupe, gIdx) => {
          const gConforme = groupe.items.filter(
            (i) => i.conforme === true
          ).length;
          const gTotal = groupe.items.length;
          return (
            <div
              key={gIdx}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-900">
                  {groupe.critere}
                </span>
                <span className="text-xs text-gray-500">
                  {gConforme}/{gTotal}
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {groupe.items.map((item, iIdx) => {
                  const isDiff = item.label.startsWith("[Differenciant]");
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <button
                        onClick={() => cycleState(gIdx, iIdx)}
                        className={`w-7 h-7 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                          item.conforme === true
                            ? "bg-emerald-500 border-emerald-500"
                            : item.conforme === false
                              ? "bg-red-400 border-red-400"
                              : "bg-white border-gray-300 hover:border-violet-400"
                        }`}
                      >
                        {item.conforme === true && (
                          <CheckIcon className="w-4 h-4 text-white" />
                        )}
                        {item.conforme === false && (
                          <XMarkIcon className="w-4 h-4 text-white" />
                        )}
                        {item.conforme === null && (
                          <MinusIcon className="w-3 h-3 text-gray-300" />
                        )}
                      </button>
                      <span
                        className={`text-sm ${
                          isDiff
                            ? "text-amber-700 font-medium"
                            : "text-gray-700"
                        } ${item.conforme === true ? "line-through text-gray-400" : ""}`}
                      >
                        {isDiff && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-600 mr-2">
                            DIFF
                          </span>
                        )}
                        {item.label.replace("[Differenciant] ", "")}
                      </span>
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
