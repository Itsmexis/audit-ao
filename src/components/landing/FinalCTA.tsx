import { ArrowRightIcon } from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';
import { BOOKING_URL } from './links';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gray-950">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(30,58,138,0.45),transparent_70%),radial-gradient(50%_50%_at_100%_100%,rgba(244,236,223,0.08),transparent_70%)]"
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
            Votre prochain mémoire mérite mieux
            <br />
            <span className="text-accent-100">qu'une relecture à J-1.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Testez un audit complet pour 99 €. Sans engagement. Résultat en 2 minutes.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-accent-100 text-gray-950 text-base md:text-lg font-semibold px-7 py-4 transition-colors shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)]"
            >
              Auditer mon mémoire maintenant
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
