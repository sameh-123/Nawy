'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Add Apartment',
    link: '/add-apartment',
  },
];
export function NavLinks() {
  const path = usePathname();
  return (
    <nav className="flex flex-col sm:flex-row items-center gap-4 text-xl text-white">
      {navLinks.map((link) => (
        <Link
          href={link.link}
          key={link.link}
          className={`${path == link.link ? 'border-b-2 font-bold' : ''}`}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu className='size-7'/>
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-primary border-none ring-0 pt-10'>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <NavLinks />
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
