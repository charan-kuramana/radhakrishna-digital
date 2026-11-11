import type { Metadata } from 'next';
import Link from 'next/link';
import ClosingCta from '@/components/ClosingCta';
import { ArrowRight } from '@/components/Icons';
import { MeshBg } from '@/components/fx/Backgrounds';
import { BrowserFrame } from '@/components/fx/Frames';
import { d } from '@/components/fx/Text';
import { CaseStudy, PageHero } from '@/components/sections';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Work — Hostlify, RK Fashions and AP Superspeciality Case Studies',
  description:
    'Named case studies with screenshots and live links: Hostlify hostel software, the RadhaKrishna Fashions store and the AP Superspeciality dental website.',
  alternates: { canonical: '/work' },
};

/** Three live screenshots fanned out like cards; they spread on hover. */
function Fan() {
  const shots = projects.filter((p) => p.images);
  const pos = [
    'left-0 top-10 -rotate-[9deg] group-hover:-translate-x-6 group-hover:-rotate-[13deg]',
    'left-[16%] top-0 z-10 rotate-0 group-hover:-translate-y-4',
    'left-[32%] top-14 rotate-[9deg] group-hover:translate-x-6 group-hover:rotate-[13deg]',
  ];
  return (
    <div className="group relative mx-auto aspect-[5/4] w-full max-w-xl">
      {shots.map((p, i) => (
        <div key={p.id} className={`absolute w-[68%] transition-all duration-700 ease-out ${pos[i]}`}>
          <div className="float" style={d(i, 1200) as React.CSSProperties}>
            <BrowserFrame src={p.images!.desktop} alt={p.images!.alt} url={p.live?.label} sizes="380px" priority={i === 1} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const live = projects.filter((p) => p.live);
  return (
    <div data-page="work">
      <PageHero
        bg={<MeshBg />}
        eyebrow="Our work"
        title={['Live projects you can', { text: 'open and check yourself.', grad: true }]}
        intro="Each case study names the client type, the problem, what we built and the stack — with a link to the live site, so you never have to take our word for it."
        visual={<Fan />}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {live.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="chip min-h-10 no-underline transition-colors hover:border-accent">
                <span className="live-dot" /> {p.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-page grid gap-28 py-20 sm:gap-36 sm:py-28">
        {projects.map((p, i) => (
          <CaseStudy key={p.id} project={p} i={i} />
        ))}
      </div>

      <section className="container-page pb-6">
        <div data-reveal className="card spot flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="eyebrow">Your project here</p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              The next case study could be <span className="text-grad">yours.</span>
            </h2>
          </div>
          <Link href="/start-a-project#enquiry" className="btn btn-primary" data-magnetic data-track="Start Project Clicked" data-track-label="work-next">
            Start a Project <ArrowRight />
          </Link>
        </div>
      </section>

      <ClosingCta />
    </div>
  );
}
