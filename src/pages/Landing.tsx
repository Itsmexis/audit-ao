import { Helmet } from 'react-helmet-async';
import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import SocialProof from '../components/landing/SocialProof';
import Problem from '../components/landing/Problem';
import HowItWorks from '../components/landing/HowItWorks';
import WhatYouGet from '../components/landing/WhatYouGet';
import ComingSoon from '../components/landing/ComingSoon';
import ForWho from '../components/landing/ForWho';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import LandingFooter from '../components/landing/LandingFooter';

const faqsJsonLd = [
  {
    q: "Que contient exactement mon rapport d'audit ?",
    a: "Votre rapport contient trois éléments : une liste de points forts, une liste de points faibles, et des justifications argumentées pour chacun.",
  },
  {
    q: "Sur quelle base l'IA juge-t-elle mon mémoire ?",
    a: "L'analyse applique la logique de lecture d'un acheteur public au dépouillement : clarté des engagements, consistance des réponses, traitement des attendus classiques.",
  },
  {
    q: 'Mes documents sont-ils confidentiels ?',
    a: "Oui. Vos fichiers sont hébergés en France, chiffrés, et ne sont jamais utilisés pour entraîner des modèles.",
  },
  {
    q: 'En combien de temps reçois-je le rapport ?',
    a: "En moyenne 2 minutes. Les mémoires les plus volumineux peuvent demander jusqu'à 5 minutes.",
  },
];

export default function Landing() {
  const siteUrl = 'https://deadline.ao';
  const title = 'Deadline.ao — Audit de mémoires techniques pour marchés publics';
  const description =
    "Déposez votre mémoire technique. Recevez une analyse structurée : points forts, points faibles, justifications. En 2 minutes, avant la soumission.";

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Deadline.ao — Audit de mémoire technique',
    description,
    brand: { '@type': 'Brand', name: 'Deadline.ao' },
    offers: {
      '@type': 'Offer',
      price: '99',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/app/audit-ao`,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsJsonLd.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="theme-color" content="#1E3A8A" />
        <link rel="canonical" href={siteUrl} />
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-white text-gray-900 antialiased">
        <LandingNavbar />
        <main>
          <Hero />
          <SocialProof />
          <Problem />
          <HowItWorks />
          <WhatYouGet />
          <ComingSoon />
          <ForWho />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <LandingFooter />
      </div>
    </>
  );
}
