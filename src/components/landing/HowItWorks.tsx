import {
  ArrowUpTrayIcon,
  CpuChipIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';

const steps = [
  {
    n: '01',
    icon: ArrowUpTrayIcon,
    title: 'Déposez votre mémoire',
    body: 'PDF ou Word. Aucune préparation. Aucun formulaire.',
  },
  {
    n: '02',
    icon: CpuChipIcon,
    title: "L'analyse tourne",
    body:
      "Notre IA lit votre mémoire avec la rigueur d'un acheteur public au dépouillement. Elle identifie ce qui tient, ce qui ne tient pas, et pourquoi.",
  },
  {
    n: '03',
    icon: DocumentCheckIcon,
    title: 'Recevez votre rapport',
    body: 'Points forts, points faibles, justifications. Prêt à corriger, prêt à soumettre.',
  },
];

export default function HowItWorks() {
  return (
    <section id="fonctionnement" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-900 text-xs font-semibold px-3 py-1 border border-blue-100">
              Fonctionnement
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight text-balance">
              3 étapes. 2 minutes.
              <br />
              <span className="text-blue-900">Un audit sérieux.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 relative">
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          />
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="inline-flex md:flex md:mx-0 mx-auto items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white text-sm font-bold flex items-center justify-center shadow-sm">
                      {s.n}
                    </div>
                    <s.icon className="w-6 h-6 text-blue-900" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-950">{s.title}</h3>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-sm">
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
