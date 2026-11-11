'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasWhatsapp, nav, whatsappHref } from '@/content/site';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { CloseIcon, MenuIcon, WhatsAppIcon } from './Icons';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/work' ? pathname === '/work' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-line bg-bg/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-[4.5rem]">
        <Logo compactOnMobile />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.94rem] font-medium no-underline transition-colors after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-gradient-to-r after:from-accent after:to-accent-2 after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 ${
                    isActive(item.href) ? 'text-ink after:scale-x-100' : 'text-muted after:scale-x-0'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="hidden sm:grid" />
          {hasWhatsapp && (
            <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            data-track="WhatsApp Clicked"
            data-track-label="header"
            aria-label="Chat on WhatsApp"
            className="grid size-11 place-items-center rounded-full text-whatsapp transition-colors hover:bg-surface-2 lg:hidden"
          >
            <WhatsAppIcon size={22} className="ai-wiggle" />
          </a>
          )}
          <Link
            href="/start-a-project"
            data-track="Start Project Clicked"
            data-track-label="header"
            data-magnetic
            className="btn btn-primary px-4 text-sm sm:px-5"
          >
            Start a Project
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main mobile"
        hidden={!open}
        className="border-t border-line bg-bg lg:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          <li>
            <Link href="/" className="flex min-h-12 items-center text-lg font-semibold no-underline" aria-current={pathname === '/' ? 'page' : undefined}>
              Home
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`flex min-h-12 items-center text-lg font-semibold no-underline ${isActive(item.href) ? 'text-accent' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-line pt-2 sm:hidden">
            <ThemeToggle withLabel />
          </li>
        </ul>
      </nav>
    </header>
  );
}
