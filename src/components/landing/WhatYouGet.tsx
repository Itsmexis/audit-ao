import {
  CheckBadgeIcon,
  ShieldExclamationIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';

const items = [
  {
    icon: CheckBadgeIcon,
    accent: 'emerald',
    title: 'Points forts',
    body:
      "Ce qui joue en votre faveur dans le mémoire. Les passages solides, les engagements bien formulés, les éléments différenciants à préserver. Vous saurez sur quoi vous appuyer, y compris en soutenance.",
  },
  {
    icon: ShieldExclamationIcon,
    accent: 'amber',
    title: 'Points faibles',
    body:
      "Les zones de fragilité. Formulations floues, engagements insuffisants, passages génériques, éléments qui manquent de consistance. Ce que l'acheteur va sanctionner si vous ne corrigez pas.",
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    accent: 'blue',
    title: 'Justifications',
    body:
      "Chaque point fort et chaque point faible est expliqué. Pourquoi ça tient, pourquoi ça ne tient pas, à quel niveau d'exigence l'acheteur se situe. Pas de jugement vague : un raisonnement que vous pouvez contester ou actionner.",
  },
];

const accentClasses: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-100' },
};

export default function WhatYouGet() {
  return (
    <section className="bg-gradient-to-b from-white via-accent-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight text-balance">
              Un rapport d'audit, <span className="text-blue-900">pas un avis.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trois éléments. Clairs. Argumentés. Actionnables.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const a = accentClasses[it.accent];
            return (
              <FadeIn key={it.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white border border-gray-100 p-7 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
                  <div
                    className={`w-12 h-12 rounded-xl ${a.bg} ${a.border} border flex items-center justify-center mb-5`}
                  >
                    <it.icon className={`w-6 h-6 ${a.text}`} strokeWidth={1.7} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-950 mb-3">{it.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{it.body}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
