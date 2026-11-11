import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ compactOnMobile = false }: { compactOnMobile?: boolean }) {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2.5 no-underline" aria-label="Radhakrishna Digital — home">
      <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-white shadow-[0_0_18px_rgb(34_211_238/0.35)]">
        <Image src="/images/brand/logo-mark.webp" alt="" width={36} height={36} priority />
      </span>
      <span className={`font-display text-[1.02rem] font-bold leading-tight ${compactOnMobile ? 'hidden sm:inline' : ''}`}>
        Radhakrishna Digital
      </span>
    </Link>
  );
}
