import { DocumentArrowUpIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface UploadedFile {
  name: string;
  type: "rc" | "cctp" | "ccap" | "autre";
}

export default function UploadSection({ onAnalyse }: { onAnalyse: () => void }) {
  const [rcFile, setRcFile] = useState<UploadedFile | null>(null);
  const [complementFiles, setComplementFiles] = useState<UploadedFile[]>([]);

  const handleFakeUpload = (type: UploadedFile["type"]) => {
    if (type === "rc") {
      setRcFile({ name: "RC_CCVL-2026-SI-003.pdf", type: "rc" });
    } else {
      const labels = { cctp: "CCTP", ccap: "CCAP", autre: "Document" };
      setComplementFiles((prev) => {
        if ((type === "cctp" || type === "ccap") && prev.some((f) => f.type === type)) {
          return prev;
        }
        return [...prev, { name: `${labels[type]}_${prev.length + 1}.pdf`, type }];
      });
    }
  };

  const removeComplement = (index: number) => {
    setComplementFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Documents du marché
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RC Upload - Principal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Règlement de Consultation (RC)
            <span className="text-red-500 ml-1">*</span>
          </label>
          {rcFile ? (
            <div className="flex items-center gap-3 p-4 bg-violet-50 border border-violet-200 rounded-lg">
              <DocumentArrowUpIcon className="w-8 h-8 text-violet-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {rcFile.name}
                </p>
                <p className="text-xs text-violet-600">Document principal</p>
              </div>
              <button
                onClick={() => setRcFile(null)}
                className="text-gray-400 hover:text-red-500 text-sm"
              >
                Retirer
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleFakeUpload("rc")}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-400 hover:bg-violet-50/50 transition-colors cursor-pointer group"
            >
              <DocumentArrowUpIcon className="w-10 h-10 text-gray-400 group-hover:text-violet-500 mx-auto mb-3 transition-colors" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-violet-700">
                Déposer votre RC ici
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX - 50 Mo max
              </p>
            </button>
          )}
        </div>

        {/* Complement docs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pièces complémentaires
            <span className="text-gray-400 ml-1 font-normal">(optionnel)</span>
          </label>
          <div className="space-y-2">
            {complementFiles.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <DocumentPlusIcon className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 truncate flex-1">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400 uppercase">
                  {file.type}
                </span>
                <button
                  onClick={() => removeComplement(i)}
                  className="text-gray-400 hover:text-red-500 text-xs"
                >
                  Retirer
                </button>
              </div>
            ))}
            <div className="flex gap-2 flex-wrap">
              {(["cctp", "ccap", "autre"] as const).map((type) => {
                const alreadyAdded =
                  (type === "cctp" || type === "ccap") &&
                  complementFiles.some((f) => f.type === type);
                return (
                  <button
                    key={type}
                    onClick={() => handleFakeUpload(type)}
                    disabled={alreadyAdded}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      alreadyAdded
                        ? "text-gray-300 bg-gray-50 border-gray-100 cursor-not-allowed"
                        : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <DocumentPlusIcon className="w-4 h-4" />
                    {type === "autre" ? "Autre pièce" : type.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lancer l'analyse */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {rcFile
            ? `${1 + complementFiles.length} document(s) prêt(s) pour l'analyse`
            : "Importez au minimum le RC pour lancer l'analyse"}
        </p>
        <button
          onClick={onAnalyse}
          disabled={!rcFile}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Lancer l'analyse
        </button>
      </div>
    </section>
  );
}
