'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white text-blue-900 px-3 py-1 rounded font-bold">DTB</div>
            <span className="font-bold text-lg">DITREVION Trust Bank</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {user && (
              <>
                <Link href="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <Link href="/transfer" className="hover:text-blue-200 transition">
                  Transfer
                </Link>
                <Link href="/crypto" className="hover:text-blue-200 transition">
                  Crypto
                </Link>
                <Link href="/loans" className="hover:text-blue-200 transition">
                  Loans
                </Link>
                <Link href="/chat" className="hover:text-blue-200 transition">
                  Support
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && user && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <Link href="/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link href="/transfer" className="hover:text-blue-200">
              Transfer
            </Link>
            <Link href="/crypto" className="hover:text-blue-200">
              Crypto
            </Link>
            <Link href="/loans" className="hover:text-blue-200">
              Loans
            </Link>
            <Link href="/chat" className="hover:text-blue-200">
              Support
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
