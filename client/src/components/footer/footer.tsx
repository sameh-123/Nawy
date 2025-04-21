import { Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary h-50 flex items-center justify-center">
      <div className="container flex items-center justify-center flex-wrap gap-4 md:text-2xl text-white font-bold">
        all rights are reserved (sam07a{'<'}3)
        <Copyright className="md:size-8" /> 2025
      </div>
    </footer>
  );
}
