import {
  BuildingOffice2Icon,
  TruckIcon,
  ComputerDesktopIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import FadeIn from './FadeIn';

const sectors = [
  {
    icon: BuildingOffice2Icon,
    title: 'BTP & travaux publics',
    body:
      'Grands comptes et PME, mémoires de 80 à 300 pages, enjeux multi-lots.',
  },
  {
    icon: TruckIcon,
    title: 'Services aux collectivités',
    body:
      'Propreté, restauration, sécurité, espaces verts, multi-sites.',
  },
  {
    icon: ComputerDesktopIcon,
    title: 'IT & conseil public',
    body: 'UGAP, ministères, agences, accords-cadres techniques.',
  },
  {
    icon: RocketLaunchIcon,
    title: 'PME ambitieuses',
    body: 'Premier recours, montée en gamme, accès aux marchés structurants.',
  },
];

export default function ForWho() {
  return (
    <section className="bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight text-balance">
              Construit pour ceux qui <span className="text-brand-900">répondent souvent.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sectors.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand-900 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-white" strokeWidth={1.7} />
                </div>
                <h3 className="text-base font-semibold text-gray-950 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
