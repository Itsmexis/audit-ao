import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';

const faqs = [
  {
    q: "Que contient exactement mon rapport d'audit ?",
    a: "Votre rapport contient trois éléments : une liste de points forts (ce qui joue en votre faveur), une liste de points faibles (ce qui risque d'être sanctionné), et des justifications argumentées pour chacun. Tous les retours sont rattachés à des passages précis de votre mémoire, pour que vous puissiez les actionner directement.",
  },
  {
    q: "Sur quelle base l'IA juge-t-elle mon mémoire ?",
    a: "L'analyse applique la logique de lecture d'un acheteur public au dépouillement : clarté des engagements, consistance des réponses, traitement des attendus classiques d'un mémoire technique, formulations à risque. Ce n'est ni un correcteur orthographique, ni un rédacteur générique.",
  },
  {
    q: 'Mes documents sont-ils confidentiels ?',
    a: "Oui. Vos fichiers sont hébergés en France, chiffrés, et ne sont jamais utilisés pour entraîner des modèles. Vous pouvez supprimer un audit à tout moment depuis votre espace.",
  },
  {
    q: 'Puis-je ré-auditer après correction ?',
    a: "L'audit est conçu comme un verdict complet et actionnable, pas comme un brouillon à itérer. Si vous souhaitez valider une version corrigée, un audit supplémentaire est disponible à 69 €. La comparaison automatique entre versions arrivera prochainement.",
  },
  {
    q: 'Quels formats de fichiers sont acceptés ?',
    a: "Uniquement le PDF. Vous pouvez déposer plusieurs fichiers d'un même mémoire si celui-ci est découpé (lots, annexes, pièces complémentaires) : ils sont traités ensemble pour l'audit.",
  },
  {
    q: 'En combien de temps reçois-je le rapport ?',
    a: 'En moyenne 2 minutes. Les mémoires les plus volumineux (plus de 200 pages) peuvent demander jusqu\'à 5 minutes.',
  },
  {
    q: 'Quelle différence avec un cabinet AMO ou un bid manager externe ?',
    a: "Un cabinet AMO vous accompagne en amont, sur plusieurs jours, à plusieurs milliers d'euros. Notre audit intervient à la fin de la rédaction, en deux minutes, pour 99 €. Les deux sont complémentaires, pas substituables.",
  },
  {
    q: 'Que se passe-t-il si je dépasse mon quota mensuel ?',
    a: "Vous pouvez acheter des audits supplémentaires à 69 € l'unité, directement depuis votre espace. Aucun quota n'est coupé sans votre action.",
  },
  {
    q: 'Quand la cohérence avec le CCAP et le CCTP sera-t-elle disponible ?',
    a: "Cette fonctionnalité est en cours de développement et sera intégrée prochainement. Elle vérifiera automatiquement que vos engagements sont alignés avec les exigences du CCAP et du CCTP. En attendant, l'audit actuel se concentre sur la solidité intrinsèque du mémoire.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-50/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-white text-gray-700 text-xs font-semibold px-3 py-1 border border-gray-200">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
              Questions fréquentes.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-12 divide-y divide-gray-200 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const contentId = `faq-${i}`;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="text-base font-semibold text-gray-950 pr-2">
                      {f.q}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-900' : ''
                      }`}
                    />
                  </button>
                  <div
                    id={contentId}
                    role="region"
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-gray-600">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
