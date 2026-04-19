import {
  DocumentDuplicateIcon,
  ChartBarSquareIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';

const roadmap = [
  {
    icon: DocumentDuplicateIcon,
    title: 'Cohérence CCAP / CCTP',
    body:
      "Déposez aussi le CCAP et le CCTP. L'audit vérifiera la cohérence entre vos engagements et les exigences contractuelles du marché. Chaque écart signalé, chaque clause critique tracée.",
  },
  {
    icon: ChartBarSquareIcon,
    title: 'Score prédictif par critère',
    body:
      "Une note probable pour chaque critère de jugement du RC, ventilée selon la pondération annoncée par l'acheteur.",
  },
  {
    icon: ArrowsRightLeftIcon,
    title: 'Comparaison entre versions',
    body:
      "Ré-auditez un mémoire corrigé et visualisez ce qui a progressé, ce qui reste à traiter.",
  },
];

export default function ComingSoon() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-accent-100 text-gray-800 text-xs font-semibold px-3 py-1">
              Roadmap
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
              Ce qui arrive.
            </h2>
            <p className="mt-4 text-lg text-gray-600">La roadmap de votre audit.</p>
          </div>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {roadmap.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl bg-gray-50/80 border border-dashed border-gray-200 p-7 opacity-90 hover:opacity-100 transition-opacity">
                <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-accent-100 text-gray-900 text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                  Bientôt
                </span>
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-5">
                  <r.icon className="w-6 h-6 text-gray-700" strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-16">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
