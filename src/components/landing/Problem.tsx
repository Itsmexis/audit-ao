import {
  NoSymbolIcon,
  EyeSlashIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';

const pains = [
  {
    icon: NoSymbolIcon,
    title: 'Un oubli = points zéro',
    body:
      'Dans un mémoire de 80 pages, un seul point attendu non traité peut faire basculer la note. Et vous ne le verrez pas seul à J-1.',
  },
  {
    icon: EyeSlashIcon,
    title: 'Vous ne saurez jamais pourquoi vous avez perdu',
    body:
      'Les acheteurs publics motivent peu leurs décisions. Les mêmes erreurs se répètent, invisibles, soumission après soumission.',
  },
  {
    icon: BanknotesIcon,
    title: 'Un mémoire perdu = 5 à 15 jours-homme',
    body:
      'Une réponse coûte cher. Une relecture externe, sérieuse et rapide, peut tout changer.',
  },
];

export default function Problem() {
  return (
    <section className="bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 text-center max-w-3xl mx-auto leading-tight text-balance">
            Vous écrivez à l'aveugle.
            <br />
            <span className="text-brand-900">L'acheteur, lui, a sa grille.</span>
          </h2>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white border border-gray-100 p-7 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-brand-900" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-gray-950 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
