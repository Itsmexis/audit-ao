import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';

const strengths = [
  'Engagement ferme sur les délais d\'intervention (< 2 h sur astreinte).',
  'Dispositif sécurité détaillé, adossé au plan de prévention du marché.',
  'Démarche RSE chiffrée avec indicateurs de suivi trimestriels.',
];

const weaknesses = [
  'Moyens humains : effectifs cités sans ventilation par lot.',
  'Sous-traitance évoquée sans engagement plafond sur le montant.',
  'Continuité de service : aucun scénario de remplacement formalisé.',
];

const justifications = [
  {
    title: 'Engagement délais — solide',
    body:
      'Le mémoire précise un seuil quantifié et opposable. L\'acheteur peut le réutiliser en pièce contractuelle. C\'est ce niveau de précision qui fait la différence.',
  },
  {
    title: 'Sous-traitance — à retravailler',
    body:
      'La mention "ponctuellement" est trop floue. En l\'état, l\'acheteur sanctionnera un engagement non-mesurable sur un critère pondéré.',
  },
];

export default function ReportMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-100/40 via-accent-100/30 to-transparent rounded-3xl blur-xl" aria-hidden />
      <div className="relative rounded-2xl bg-white border border-gray-200 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4 text-brand-900" />
            <span className="text-xs font-semibold text-gray-700 tracking-tight">
              Rapport d'audit — mémoire technique
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            v1 · 2 min
          </span>
        </div>

        <div className="p-6 space-y-5">
          <section aria-labelledby="mockup-strengths">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 border border-emerald-100">
                <CheckCircleIcon className="w-3.5 h-3.5" />
                Points forts
              </span>
              <span className="text-[11px] text-gray-400">{strengths.length} éléments</span>
            </div>
            <ul id="mockup-strengths" className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-snug text-gray-700">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="mockup-weaknesses">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold px-2.5 py-1 border border-amber-100">
                <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                Points faibles
              </span>
              <span className="text-[11px] text-gray-400">{weaknesses.length} éléments</span>
            </div>
            <ul id="mockup-weaknesses" className="space-y-2">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-snug text-gray-700">
                  <ExclamationTriangleIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="mockup-justifs" className="pt-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-900 text-[11px] font-semibold px-2.5 py-1 border border-brand-100">
                Justifications
              </span>
            </div>
            <div id="mockup-justifs" className="space-y-3">
              {justifications.map((j, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-100 bg-gray-50/70 p-3"
                >
                  <div className="text-[12px] font-semibold text-gray-900 mb-1">
                    {j.title}
                  </div>
                  <p className="text-[12px] leading-relaxed text-gray-600">
                    {j.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
