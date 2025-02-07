'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function SkrivAnmeldelse() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    text: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleDateString('da-DK', { year: 'numeric', month: 'long' })
        }),
      });

      if (response.ok) {
        alert('Tak for din anmeldelse! Den vil blive gennemgået og tilføjet til siden snarest.');
        router.push('/');
      } else {
        alert('Der skete desværre en fejl. Prøv venligst igen.');
      }
    } catch {
      alert('Der skete desværre en fejl. Prøv venligst igen.');
    }
  };

  return (
    <div className="min-h-screen relative">
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

      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-playfair text-4xl font-light text-center mb-12 text-[#59585E]">Skriv en anmeldelse</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8 bg-white/30 backdrop-blur-sm p-8 rounded-3xl">
            <div>
              <label htmlFor="name" className="block text-[#59585E] mb-2">Dit navn</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 bg-white/50 border border-[#59585E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59585E]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-[#59585E] mb-2">Din titel (f.eks. &ldquo;Privat klient&rdquo;)</label>
              <input
                type="text"
                id="title"
                required
                className="w-full px-4 py-2 bg-white/50 border border-[#59585E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59585E]"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="text" className="block text-[#59585E] mb-2">Din anmeldelse</label>
              <textarea
                id="text"
                required
                rows={6}
                className="w-full px-4 py-2 bg-white/50 border border-[#59585E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59585E]"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="font-playfair bg-transparent border-2 border-[#59585E] text-[#59585E] px-8 py-3 rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-all duration-300"
              >
                Send anmeldelse
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 