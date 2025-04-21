import Image from 'next/image';
import Link from 'next/link';
import { MobileNav, NavLinks } from './nav-links';
import LangSwitch from './lang-switcher';
import DarkToogle from './dark-toggle';

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="container py-5 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/nawy.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-30"
          />
        </Link>
        <div className="hidden sm:block">
          <NavLinks />
        </div>

        <div className="flex items-center sm:gap-8 gap-4">
          <LangSwitch />
          <DarkToogle />
          <div className="block sm:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
