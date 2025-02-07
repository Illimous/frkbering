'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    // Indlæs Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-5xl text-[#59585E] mb-6">Book en Tid</h1>
              <p className="text-xl text-[#6C6C75] font-light">Tag det første skridt på din transformerende rejse</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
                  <h2 className="font-playfair text-2xl text-[#59585E] mb-4">Praktisk Information</h2>
                  <ul className="space-y-4 text-[#6C6C75] font-light">
                    <li className="flex items-center">
                      <span className="text-xl mr-3">📍</span>
                      <span>Sessioner foregår i rolige og trygge omgivelser</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-xl mr-3">⏰</span>
                      <span>Varighed varierer efter type af session</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-xl mr-3">💫</span>
                      <span>Online sessioner er også mulige</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-xl mr-3">💌</span>
                      <span>Bekræftelse sendes pr. email</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
                  <h2 className="font-playfair text-2xl text-[#59585E] mb-4">Kontakt</h2>
                  <p className="text-[#6C6C75] font-light mb-4">
                    Har du spørgsmål inden booking? Kontakt mig gerne:
                  </p>
                  <a 
                    href="mailto:line@frk-bering.dk" 
                    className="text-[#59585E] hover:text-[#6C6C75] transition-colors"
                  >
                    line@frk-bering.dk
                  </a>
                </div>
              </div>

              <div className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl min-h-[600px]">
                {/* Calendly inline widget */}
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/frkberingsessioner"
                  style={{ 
                    minWidth: '320px',
                    height: '600px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 