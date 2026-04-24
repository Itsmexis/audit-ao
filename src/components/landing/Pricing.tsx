import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';
import { BOOKING_URL } from './links';

type Billing = 'annuel' | 'mensuel';

interface Plan {
  id: string;
  name: string;
  tagline: string;
  oneTime?: boolean;
  priceAnnual: string;
  priceMonthly: string;
  periodAnnual: string;
  periodMonthly: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: 'a-la-carte',
    name: 'À la carte',
    tagline: 'Un audit, une fois. Pas plus.',
    oneTime: true,
    priceAnnual: '99 €',
    priceMonthly: '99 €',
    periodAnnual: 'paiement unique',
    periodMonthly: 'paiement unique',
    features: [
      '1 audit complet',
      '1 utilisateur',
      'Résultat en 2 minutes',
      'Paiement unique · aucun engagement',
    ],
    cta: 'Acheter un audit',
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Pour les répondeurs réguliers.',
    priceAnnual: '1 999 €',
    priceMonthly: '179 €',
    periodAnnual: '/ an',
    periodMonthly: '/ mois',
    features: [
      '3 audits / mois · 36 / an',
      '1 utilisateur',
      'Audit supplémentaire à 69 €',
      'Support email sous 24 h',
    ],
    cta: 'Choisir Starter',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Le choix des équipes bid.',
    priceAnnual: '4 999 €',
    priceMonthly: '399 €',
    periodAnnual: '/ an',
    periodMonthly: '/ mois',
    features: [
      '6 audits / mois · 72 / an',
      '2 utilisateurs',
      'Utilisateur supplémentaire à 29 €/mois',
      'Audit supplémentaire à 69 €',
      'Support prioritaire',
    ],
    cta: 'Choisir Pro',
    highlighted: true,
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Cadence haute, multi-lots.',
    priceAnnual: '9 588 €',
    priceMonthly: '799 €',
    periodAnnual: '/ an',
    periodMonthly: '/ mois',
    features: [
      '12 audits / mois · 144 / an',
      '4 utilisateurs',
      'Utilisateur supplémentaire à 29 €/mois',
      'Audit supplémentaire à 69 €',
      'Support dédié · onboarding',
    ],
    cta: 'Choisir Business',
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('annuel');

  return (
    <section id="tarifs" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-brand-50 text-brand-900 text-xs font-semibold px-3 py-1 border border-brand-100">
              Tarifs
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight text-balance">
              Un audit. Un tarif.
              <br />
              <span className="text-brand-900">Pas de surprise.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choisissez un pack adapté à votre cadence de réponse. Pas d'engagement caché.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-10 flex justify-center">
            <div
              role="tablist"
              aria-label="Périodicité de facturation"
              className="inline-flex items-center rounded-full bg-gray-100 p-1"
            >
              {(['mensuel', 'annuel'] as Billing[]).map((b) => (
                <button
                  key={b}
                  role="tab"
                  aria-selected={billing === b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                    billing === b
                      ? 'bg-white text-gray-950 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {b === 'mensuel' ? 'Mensuel' : 'Annuel'}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {plans.map((p, i) => {
            const price = billing === 'annuel' ? p.priceAnnual : p.priceMonthly;
            const period = billing === 'annuel' ? p.periodAnnual : p.periodMonthly;
            const isHighlighted = p.highlighted;
            return (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div
                  className={`relative h-full flex flex-col rounded-2xl p-7 transition-all ${
                    isHighlighted
                      ? 'bg-gray-950 text-white border border-gray-950 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.4)] md:scale-[1.02]'
                      : 'bg-white text-gray-950 border border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isHighlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-accent-100 text-gray-950 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 shadow">
                      Le plus choisi
                    </span>
                  )}
                  <div>
                    <h3 className={`text-lg font-semibold ${isHighlighted ? 'text-white' : 'text-gray-950'}`}>
                      {p.name}
                    </h3>
                    <p className={`mt-1 text-sm ${isHighlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                      {p.tagline}
                    </p>
                  </div>

                  <div className="mt-6 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold tracking-tight">{price}</span>
                      <span className={`text-sm ${isHighlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                        {period}
                      </span>
                    </div>
                    {!p.oneTime && (
                      <p className={`mt-1 text-xs ${isHighlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                        {billing === 'annuel'
                          ? `soit ${p.priceMonthly} équivalent mensuel`
                          : `soit ${p.priceAnnual} en annuel`}
                      </p>
                    )}
                  </div>

                  <ul className={`space-y-2.5 text-sm mb-8 ${isHighlighted ? 'text-gray-200' : 'text-gray-700'}`}>
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <CheckIcon
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isHighlighted ? 'text-accent-100' : 'text-brand-700'
                          }`}
                          strokeWidth={2.5}
                        />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                      isHighlighted
                        ? 'bg-white text-gray-950 hover:bg-accent-100'
                        : 'bg-brand-900 text-white hover:bg-brand-950'
                    }`}
                  >
                    {p.cta}
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.1}>
          <div className="mt-10 rounded-2xl bg-gray-50 border border-gray-100 p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-gray-950">
                Plus de 144 audits par an ?
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Contactez-nous pour une offre Enterprise sur mesure.
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              Nous contacter →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
