'use client';

import { Sun } from 'lucide-react';

export default function DarkToogle() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle('dark');
        if (localStorage.getItem('theme') == 'dark')
          localStorage.setItem('theme', 'light');
        else localStorage.setItem('theme', 'dark');
      }}
      className="size-8 rounded-full  dark:bg-white bg-black cursor-pointer flex items-center justify-center"
    >
      <Sun className="text-white dark:text-black" />
    </button>
  );
}
