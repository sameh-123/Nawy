'use client';

import { Globe } from 'lucide-react';

export default function LangSwitch() {
  const lang = 'EN';
  const handleLanguageChange = () => {
    // logic to change language
    console.log('language changed');
  };
  return (
    <button
      className="flex items-center gap-1 text-white lg:text-xl sm:text-lg text-xl cursor-pointer focus-visible:ring-0 focus-visible:border-none focus-visible:outline-0"
      onClick={handleLanguageChange}
    >
      <Globe size={30} />
      {lang}
    </button>
  );
}
