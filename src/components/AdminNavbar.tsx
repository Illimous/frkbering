'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-[#59585E] text-[#F5D9D5]' : 'text-[#59585E] hover:bg-[#59585E] hover:text-[#F5D9D5]';
  };

  return (
    <nav className="bg-[#F5D9D5] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive('/admin/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard/reviews"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive('/admin/dashboard/reviews')}`}
            >
              Anmeldelser
            </Link>
            <Link
              href="/admin/email-templates"
              className={`px-4 py-2 rounded-lg transition-colors ${isActive('/admin/email-templates')}`}
            >
              Email Skabeloner
            </Link>
          </div>
          <Link
            href="/"
            className="text-[#59585E] hover:text-[#6C6C75] transition-colors"
          >
            Gå til forsiden
          </Link>
        </div>
      </div>
    </nav>
  );
} 