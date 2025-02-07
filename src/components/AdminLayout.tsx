'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/email-templates', label: 'Email Skabeloner' },
    // Tilføj flere menupunkter her efter behov
  ];

  return (
    <div className="min-h-screen relative">
      {/* Baggrundsbillede */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/photo_2025-02-06_23-53-07.jpg"
          alt="Baggrundsbillede"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5D9D5]/95 via-[#F2CFCA]/95 to-[#F5D9D5]/95"></div>
      </div>

      {/* Admin navigation */}
      <nav className="bg-white/30 backdrop-blur-sm border-b border-[#59585E]/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-16">
            <Link 
              href="/admin"
              className="font-playfair text-xl text-[#59585E] hover:text-[#6C6C75] transition-colors"
            >
              Admin Panel
            </Link>
            <div className="flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-[#59585E] text-[#F5D9D5]'
                      : 'text-[#59585E] hover:bg-[#59585E]/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hovedindhold */}
      <main className="pt-8">
        {children}
      </main>
    </div>
  );
} 