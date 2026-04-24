import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';
import ReportMockup from './ReportMockup';
import { BOOKING_URL } from './links';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(30,58,138,0.08),transparent_60%),radial-gradient(40%_40%_at_90%_10%,rgba(244,236,223,0.6),transparent_70%)]"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-700" />
                </span>
                Audit pré-soumission · Marchés publics
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-gray-950 leading-[1.05]">
                Votre mémoire technique,{' '}
                <span className="text-brand-900">audité comme par un acheteur public.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Déposez votre mémoire technique. Recevez une analyse structurée :
                points forts, points faibles, justifications.{' '}
                <span className="text-gray-900 font-medium">
                  En 2 minutes, avant la soumission.
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-900 hover:bg-brand-950 text-white text-base font-semibold px-5 py-3 transition-colors shadow-[0_10px_25px_-8px_rgba(30,58,138,0.5)]"
                >
                  Auditer mon mémoire
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
                <Link
                  to="/app/audit-ao"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 text-base font-semibold px-5 py-3 transition-colors"
                >
                  <PlayCircleIcon className="w-5 h-5 text-brand-900" />
                  Voir un exemple
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-5 text-sm text-gray-500">
                99 € · Paiement unique · Résultat en 2 min · Aucun engagement
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} y={24}>
            <ReportMockup />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
