import { Link } from 'react-router-dom';
import { ShieldCheckIcon, LockClosedIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';
import { BOOKING_URL } from './links';

type FooterLink = {
  label: string;
  href: string;
  internal?: boolean;
  newTab?: boolean;
};

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnement', href: '/#fonctionnement', internal: true },
      { label: 'Tarifs', href: '/#tarifs', internal: true },
      { label: 'FAQ', href: '/#faq', internal: true },
      { label: 'Exemple de rapport', href: '/app/audit-ao', internal: true },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: 'https://www.deadline.fr/a-propos', newTab: true },
      { label: 'Contact', href: BOOKING_URL, newTab: true },
      { label: 'Blog', href: 'https://www.deadline.fr/blog', newTab: true },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: 'https://www.deadline.fr/mentions-legales', newTab: true },
      { label: 'Confidentialité & RGPD', href: '/confidentialite', internal: true },
    ],
  },
];

export default function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Logo className="h-7 w-auto" />
            <p className="mt-4 text-sm text-gray-600 max-w-xs leading-relaxed">
              L'audit de votre mémoire technique, comme si un acheteur public le dépouillait.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4" /> Hébergement France
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LockClosedIcon className="w-4 h-4" /> Données chiffrées
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4" /> Conforme RGPD
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-gray-950 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  const className =
                    'text-sm text-gray-600 hover:text-brand-900 transition-colors';
                  if (l.internal) {
                    return (
                      <li key={l.label}>
                        <Link to={l.href} className={className}>
                          {l.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className={className}
                        {...(l.newTab && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} Deadline.ao. Tous droits réservés.</p>
          <p>Fait en France · Pour ceux qui répondent aux marchés publics.</p>
        </div>
      </div>
    </footer>
  );
}
