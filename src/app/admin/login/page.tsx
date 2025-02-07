'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simpel validering (dette skal selvfølgelig erstattes med rigtig auth senere)
    if (email === 'line@frk-bering.dk' && password === 'admin123') {
      // Gem login status i en cookie der udløber efter 24 timer
      Cookies.set('isLoggedIn', 'true', { expires: 1 });
      router.push('/admin/dashboard');
    } else {
      setError('Forkert email eller adgangskode');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Baggrundsbillede */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/photo_2025-02-06_23-53-07.jpg"
          alt="Admin baggrund"
          fill
          className="object-cover object-center opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5D9D5]/95 via-[#F2CFCA]/95 to-[#F5D9D5]/95"></div>
      </div>

      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-sm rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl text-[#59585E] mb-2">Admin Login</h1>
          <p className="text-[#6C6C75] font-light">Log ind for at administrere din side</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[#59585E] mb-2 font-playfair">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border-b-2 border-[#87898C] focus:border-[#59585E] transition-colors rounded-lg text-[#6C6C75] font-light"
              placeholder="Din admin email"
              required
            />
          </div>

          <div>
            <label className="block text-[#59585E] mb-2 font-playfair">Adgangskode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 border-b-2 border-[#87898C] focus:border-[#59585E] transition-colors rounded-lg text-[#6C6C75] font-light"
              placeholder="Din adgangskode"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full font-playfair bg-[#59585E] text-[#F5D9D5] px-8 py-3 rounded-full hover:bg-[#6C6C75] transition-all duration-300"
          >
            Log Ind
          </button>
        </form>
      </div>
    </div>
  );
} 