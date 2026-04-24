import {
  ArrowPathIcon,
  DocumentArrowUpIcon,
  DocumentTextIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

type Source = "analyse-rc" | "manuel" | null;

interface UploadedFile {
  name: string;
}

export default function SourceSelection({
  onLaunchAudit,
}: {
  onLaunchAudit: () => void;
}) {
  const [source, setSource] = useState<Source>(null);
  const [grille, setGrille] = useState<UploadedFile | null>(null);
  const [memoire, setMemoire] = useState<UploadedFile | null>(null);

  const canLaunch =
    source === "analyse-rc"
      ? memoire !== null
      : source === "manuel"
        ? grille !== null && memoire !== null
        : false;

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Source des données
      </h2>

      {/* Choice cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSource("analyse-rc")}
          className={`text-left p-4 rounded-lg border-2 transition-all ${
            source === "analyse-rc"
              ? "border-brand-500 bg-brand-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <ArrowPathIcon
              className={`w-6 h-6 ${source === "analyse-rc" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span
              className={`text-sm font-semibold ${source === "analyse-rc" ? "text-brand-700" : "text-gray-700"}`}
            >
              Depuis l'Analyse RC
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Réutiliser les critères, sous-critères et grille d'évaluation
            produits par l'analyse du règlement de consultation.
          </p>
          {source === "analyse-rc" && (
            <div className="mt-3 flex items-center gap-2 text-xs text-brand-600 bg-brand-100 rounded-md px-2.5 py-1.5">
              <ArrowPathIcon className="w-3.5 h-3.5" />
              Grille d'évaluation importée depuis l'Analyse RC
            </div>
          )}
        </button>

        <button
          onClick={() => setSource("manuel")}
          className={`text-left p-4 rounded-lg border-2 transition-all ${
            source === "manuel"
              ? "border-brand-500 bg-brand-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <DocumentArrowUpIcon
              className={`w-6 h-6 ${source === "manuel" ? "text-brand-600" : "text-gray-400"}`}
            />
            <span
              className={`text-sm font-semibold ${source === "manuel" ? "text-brand-700" : "text-gray-700"}`}
            >
              Chargement manuel
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Importer votre propre grille d'évaluation
            (critères/sous-critères/points évalués) et votre mémoire technique.
          </p>
        </button>
      </div>

      {/* Uploads based on selection */}
      {source && (
        <div className="border-t border-gray-100 pt-4">
          <div
            className={`grid grid-cols-1 ${source === "manuel" ? "lg:grid-cols-2" : ""} gap-4`}
          >
            {/* Grille - only for manual */}
            {source === "manuel" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grille d'évaluation
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {grille ? (
                  <div className="flex items-center gap-3 p-4 bg-brand-50 border border-brand-200 rounded-lg">
                    <DocumentPlusIcon className="w-6 h-6 text-brand-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {grille.name}
                      </p>
                      <p className="text-xs text-brand-600">
                        Grille d'évaluation
                      </p>
                    </div>
                    <button
                      onClick={() => setGrille(null)}
                      className="text-gray-400 hover:text-red-500 text-sm"
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setGrille({ name: "Grille_evaluation_CCVL.xlsx" })
                    }
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 hover:bg-brand-50/50 transition-colors cursor-pointer group"
                  >
                    <DocumentPlusIcon className="w-8 h-8 text-gray-400 group-hover:text-brand-500 mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-medium text-gray-700 group-hover:text-brand-700">
                      Déposer la grille ici
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, XLSX, DOC - 50 Mo max
                    </p>
                  </button>
                )}
              </div>
            )}

            {/* Memoire technique - always shown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mémoire technique
                <span className="text-red-500 ml-1">*</span>
              </label>
              {memoire ? (
                <div className="flex items-center gap-3 p-4 bg-brand-50 border border-brand-200 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-brand-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {memoire.name}
                    </p>
                    <p className="text-xs text-brand-600">
                      Mémoire technique à auditer
                    </p>
                  </div>
                  <button
                    onClick={() => setMemoire(null)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    setMemoire({
                      name: "Memoire_technique_CCVL-2026-SI-003.pdf",
                    })
                  }
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 hover:bg-brand-50/50 transition-colors cursor-pointer group"
                >
                  <DocumentTextIcon className="w-8 h-8 text-gray-400 group-hover:text-brand-500 mx-auto mb-2 transition-colors" />
                  <p className="text-sm font-medium text-gray-700 group-hover:text-brand-700">
                    Déposer le mémoire technique ici
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX - 50 Mo max
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Launch */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {canLaunch
                ? "Documents prêts pour l'audit"
                : "Importez les documents requis pour lancer l'audit"}
            </p>
            <button
              onClick={onLaunchAudit}
              disabled={!canLaunch}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Lancer l'audit
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
