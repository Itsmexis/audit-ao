import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  NoSymbolIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Logo from '../components/Logo';
import LandingFooter from '../components/landing/LandingFooter';

const principles = [
  {
    icon: LockClosedIcon,
    title: 'Confidentialité & secret des affaires',
    body: "Vos mémoires, vos critères, vos RC — tout ce que vous téléversez reste strictement confidentiel. Nous traitons ces documents comme des informations couvertes par le secret des affaires.",
  },
  {
    icon: NoSymbolIcon,
    title: 'Pas de réutilisation des données',
    body: "Vos données ne sont jamais utilisées pour entraîner des modèles, générer des statistiques publiques, ou alimenter un quelconque produit dérivé. Ni par nous, ni par nos sous-traitants.",
  },
  {
    icon: EyeSlashIcon,
    title: "Pas d'accès aux données",
    body: "Personne — pas même nos équipes — n'accède à vos documents en dehors de la production du rapport d'audit. Des accès techniques strictement limités (support, incident) sont tracés et journalisés.",
  },
  {
    icon: ShieldCheckIcon,
    title: 'Hébergement France & traitements UE',
    body: "Hébergement en France, traitements réalisés exclusivement au sein de l'Union européenne. Chiffrement en transit (TLS) et au repos. Suppression automatique des fichiers uploadés après la durée nécessaire au traitement.",
  },
];

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" aria-label="Deadline.ao — accueil" className="flex items-center">
            <Logo className="h-7 w-auto" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-900 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
            Confidentialité & RGPD
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-950 tracking-tight">
            Vos données vous appartiennent.
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
            Vue d'ensemble des grands principes qui encadrent notre traitement
            des documents et des informations que vous nous confiez.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-gray-200 bg-white"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-950 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">
            Traitement des données personnelles
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-950">Principe général —</span>{' '}
                Deadline.ao ne traite pas de données personnelles pour le compte
                de ses clients. Notre cœur de métier, c'est l'analyse de mémoires
                techniques et de règlements de consultation : des documents
                business, pas des données personnelles.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200">
              <div className="flex items-start gap-3">
                <DocumentTextIcon className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-gray-950 mb-2">
                    Données personnelles présentes dans vos fichiers
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Les fichiers que vous téléversez (mémoires, RC, annexes)
                    peuvent contenir incidemment des données personnelles —
                    noms, CV, références de projets. Ces données ne sont pas
                    le cœur du traitement : elles transitent pour produire
                    l'audit et sont supprimées avec le fichier source.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200">
              <div className="flex items-start gap-3">
                <UserIcon className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-gray-950 mb-2">
                    Service Data
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Pour permettre la connexion et l'usage de la plateforme,
                    nous traitons un minimum de données de compte : email,
                    nom, identifiants techniques, logs de connexion. Ces
                    données servent uniquement à faire fonctionner le service
                    et à la facturation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-950 mb-4">Vos droits</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification, de suppression, de limitation et de portabilité sur
            vos données. Pour exercer ces droits ou pour toute question sur la
            protection de vos données, contactez-nous à{' '}
            <a
              href="mailto:contact@deadline.fr"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              contact@deadline.fr
            </a>
            .
          </p>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
