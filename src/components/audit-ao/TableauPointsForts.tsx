import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { RecapCritere } from "../../data/mockAuditAO";

function buildCopyHtml(recap: RecapCritere[]): string {
  let html = "";

  for (const critere of recap) {
    html += `<h2 style="color:#4c1d95;margin:16px 0 8px;">${critere.critereNom} (${critere.ponderation}%)</h2>`;

    for (const sc of critere.sousCriteres) {
      const differenciants = sc.pointsForts.filter(
        (pf) => pf.type === "differenciant"
      );
      const reponses = sc.pointsForts.filter((pf) => pf.type === "reponse");

      if (differenciants.length === 0 && reponses.length === 0) continue;

      html += `<h3 style="margin:12px 0 6px;">${sc.sousCritereId} - ${sc.sousCritereNom}</h3>`;
      html += `<table style="border-collapse:collapse;width:100%;margin-bottom:12px;" border="1">`;
      html += `<thead><tr style="background:#f5f3ff;">`;
      html += `<th style="padding:6px 10px;text-align:left;border:1px solid #d1d5db;font-size:11px;width:160px;">Catégorie</th>`;
      html += `<th style="padding:6px 10px;text-align:left;border:1px solid #d1d5db;font-size:11px;">Élément</th>`;
      html += `</tr></thead><tbody>`;

      for (const pf of differenciants) {
        html += `<tr style="background:#fffbeb;"><td style="padding:6px 10px;border:1px solid #d1d5db;font-size:12px;color:#b45309;font-weight:bold;">Au-delà des attentes</td>`;
        html += `<td style="padding:6px 10px;border:1px solid #d1d5db;font-size:12px;">${pf.label}</td></tr>`;
      }

      for (const pf of reponses) {
        html += `<tr><td style="padding:6px 10px;border:1px solid #d1d5db;font-size:12px;color:#059669;font-weight:bold;">Réponse aux attentes</td>`;
        html += `<td style="padding:6px 10px;border:1px solid #d1d5db;font-size:12px;">${pf.label}</td></tr>`;
      }

      html += `</tbody></table>`;
    }
  }

  return html;
}

export default function TableauPointsForts({
  recap,
}: {
  recap: RecapCritere[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const html = buildCopyHtml(recap);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html.replace(/<[^>]*>/g, "")], {
            type: "text/plain",
          }),
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      await navigator.clipboard.writeText(html.replace(/<[^>]*>/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="recap-points-forts" className="scroll-mt-16">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center">
            R
          </span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Récapitulatif des points forts
            </h2>
            <p className="text-xs text-gray-500">
              Tableau de synthèse à intégrer dans le mémoire technique
            </p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
            copied
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {copied ? (
            <>
              <ClipboardDocumentCheckIcon className="w-4 h-4" />
              Copié !
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-4 h-4" />
              Copier le tableau
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-violet-600 bg-violet-50 border border-violet-200 rounded-lg px-3 py-1.5 mb-4">
        Ce tableau est formaté pour être collé directement dans Word/Google Docs.
        Il synthétise les réponses aux attentes et la valeur ajoutée
        pour chaque critère.
      </p>

      <div className="space-y-6">
        {recap.map((critere) => (
          <div key={critere.critereId}>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-bold text-gray-900">
                {critere.critereNom}
              </h3>
              <span className="text-xs font-semibold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                {critere.ponderation}%
              </span>
            </div>

            <div className="space-y-4">
              {critere.sousCriteres.map((sc) => {
                const differenciants = sc.pointsForts.filter(
                  (pf) => pf.type === "differenciant"
                );
                const reponses = sc.pointsForts.filter(
                  (pf) => pf.type === "reponse"
                );

                return (
                  <div
                    key={sc.sousCritereId}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-900">
                        <span className="text-violet-600 mr-2">
                          {sc.sousCritereId}
                        </span>
                        {sc.sousCritereNom}
                      </span>
                    </div>

                    {/* Au-delà des attentes (differenciants) - en premier */}
                    {differenciants.length > 0 && (
                      <div className="p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <StarIcon className="w-4 h-4 text-amber-500" />
                          <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                            Au-delà des attentes
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {differenciants.map((pf, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2"
                            >
                              <StarIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">
                                {pf.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Points forts (réponses aux attentes) */}
                    {reponses.length > 0 && (
                      <div
                        className={`p-4 ${differenciants.length > 0 ? "border-t border-gray-100" : ""}`}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                            Réponse aux attentes
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {reponses.map((pf, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                              <span className="text-sm text-gray-700">
                                {pf.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty state */}
                    {differenciants.length === 0 && reponses.length === 0 && (
                      <div className="p-4 text-center text-sm text-gray-400">
                        Aucun élément identifié pour ce sous-critère
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
