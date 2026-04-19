import type { ReactElement } from 'react';
import FadeIn from './FadeIn';

const logos = [
  { name: 'Batiprov', type: 'btp' },
  { name: 'NetVille', type: 'proprete' },
  { name: 'Kodex Conseil', type: 'it' },
  { name: 'Table Commune', type: 'restauration' },
  { name: 'GreenLine TP', type: 'btp' },
  { name: 'SecuriCap', type: 'securite' },
];

function LogoBadge({ name, type }: { name: string; type: string }) {
  const glyph: Record<string, ReactElement> = {
    btp: (
      <path d="M3 17L12 4l9 13M6 17v4h12v-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    proprete: (
      <path d="M5 20h14M7 20V9l5-5 5 5v11M9 20v-6h6v6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    it: (
      <path d="M4 6h16v10H4zM8 20h8M12 16v4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    restauration: (
      <path d="M7 3v9a3 3 0 003 3v6M17 3c-2 0-3 1-3 3v5a2 2 0 002 2h1v8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    securite: (
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  };

  return (
    <div className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
      <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" aria-hidden>
        {glyph[type]}
      </svg>
      <span className="text-sm font-semibold tracking-tight">{name}</span>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <FadeIn>
          <p className="text-center text-sm font-medium text-gray-500">
            Déjà utilisé par des entreprises qui répondent aux marchés publics.
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {logos.map((l) => (
              <LogoBadge key={l.name} name={l.name} type={l.type} />
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-10 text-center text-base text-gray-600">
            Plus de <span className="font-bold text-gray-900">240 M€ de marchés</span>{' '}
            analysés par nos utilisateurs.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
