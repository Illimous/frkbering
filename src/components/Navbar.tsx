'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-[#59585E]' : 'text-[#6C6C75]';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5D9D5]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-playfair text-2xl text-[#59585E] hover:text-[#6C6C75] transition-colors">
            Frk. Bering
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`font-playfair ${isActive('/')} hover:text-[#59585E] transition-colors`}
            >
              Forside
            </Link>
            <Link 
              href="/ydelser" 
              className={`font-playfair ${isActive('/ydelser')} hover:text-[#59585E] transition-colors`}
            >
              Ydelser
            </Link>
            <Link 
              href="/om-mig" 
              className={`font-playfair ${isActive('/om-mig')} hover:text-[#59585E] transition-colors`}
            >
              Om Mig
            </Link>
            <Link 
              href="/booking" 
              className={`font-playfair ${isActive('/booking')} hover:text-[#59585E] transition-colors`}
            >
              Book Tid
            </Link>
          </div>
          <button className="md:hidden text-[#59585E]">
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>
    </nav>
  );
} 