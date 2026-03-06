import {
  CheckCircleIcon,
  StarIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { ChecklistItem } from "../../data/mockAnalyseRC";

const categoryConfig = {
  imperatif: {
    icon: CheckCircleIcon,
    iconColor: "text-emerald-500",
    title: "Éléments impératifs",
    headerBg: "bg-emerald-50 border-emerald-200",
    headerText: "text-emerald-700",
  },
  differenciant: {
    icon: StarIcon,
    iconColor: "text-amber-500",
    title: "Éléments différenciants",
    headerBg: "bg-amber-50 border-amber-200",
    headerText: "text-amber-700",
  },
  erreur: {
    icon: ExclamationCircleIcon,
    iconColor: "text-red-500",
    title: "Erreurs pénalisantes",
    headerBg: "bg-red-50 border-red-200",
    headerText: "text-red-700",
  },
} as const;

type Category = keyof typeof categoryConfig;

interface ClickedState {
  [groupId: string]: { [category: string]: Set<number> };
}

export default function Bloc5ChecklistCandidat({
  checklist,
}: {
  checklist: ChecklistItem[];
}) {
  const [clicked, setClicked] = useState<ClickedState>({});

  const isClicked = (groupId: string, category: string, idx: number) =>
    clicked[groupId]?.[category]?.has(idx) ?? false;

  const toggleItem = (groupId: string, category: string, idx: number) => {
    setClicked((prev) => {
      const group = prev[groupId] ?? {};
      const set = new Set(group[category] ?? []);
      if (set.has(idx)) set.delete(idx);
      else set.add(idx);
      return { ...prev, [groupId]: { ...group, [category]: set } };
    });
  };

  const getItems = (item: ChecklistItem, cat: Category): string[] => {
    if (cat === "imperatif") return item.elementsImperatifs;
    if (cat === "differenciant") return item.elementsDifferenciants;
    return item.erreursPenalisantes;
  };

  return (
    <section id="bloc-5" className="scroll-mt-16">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
            5
          </span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Checklist candidat
            </h2>
            <p className="text-xs text-gray-500">
              Cliquez sur les éléments intégrés dans votre mémoire pour maximiser vos chances
            </p>
          </div>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-not-allowed"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Exporter
        </button>
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
              {(["imperatif", "differenciant", "erreur"] as const).map((cat) => {
                const config = categoryConfig[cat];
                const Icon = config.icon;
                const items = getItems(item, cat);
                if (items.length === 0) return null;

                return (
                  <div key={cat} className="flex flex-col">
                    <div className={`flex items-center gap-2 px-4 py-2 border-b ${config.headerBg}`}>
                      <Icon className={`w-4 h-4 ${config.iconColor}`} />
                      <span className={`text-xs font-semibold uppercase tracking-wide ${config.headerText}`}>
                        {config.title}
                      </span>
                    </div>
                    <ul className="p-3 space-y-1 flex-1">
                      {items.map((el, i) => {
                        const done = isClicked(item.sousCritereId, cat, i);
                        return (
                          <li
                            key={i}
                            onClick={() => toggleItem(item.sousCritereId, cat, i)}
                            className={`text-sm flex items-start gap-2 px-2 py-1.5 rounded-md cursor-pointer select-none transition-colors hover:bg-gray-50 ${
                              done ? "text-gray-400 line-through" : "text-gray-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                              done ? "bg-gray-300" : config.iconColor.replace("text-", "bg-")
                            }`} />
                            {el}
                          </li>
                        );
                      })}
                    </ul>
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
