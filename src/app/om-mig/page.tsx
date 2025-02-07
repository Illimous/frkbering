'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AboutMe() {
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
            <h1 className="font-playfair text-5xl text-[#59585E] text-center mb-16">Om Mig</h1>
            
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              <div className="relative h-[600px] rounded-[40px] overflow-hidden transform -rotate-2 shadow-2xl">
                <Image
                  src="/images/photo_2025-02-06_23-53-08.jpg"
                  alt="Line Bering"
                  fill
                  className="object-cover object-center scale-110 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#59585E]/30 to-transparent"></div>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-[#6C6C75] leading-relaxed font-light italic">
                  &ldquo;Jeg brænder for at hjælpe mennesker og virksomheder med at opdage deres fulde potentiale og skabe balance og indsigt gennem både intuition og praktisk erfaring.&rdquo;
                </p>
                <div className="w-16 h-1 bg-[#59585E]/20"></div>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                  Jeg arbejder med både private klienter og virksomheder, hvor jeg anvender mine clairvoyante og mediale evner sammen med min unikke evne til at identificere både synlige og skjulte udfordringer, optimere processer og skabe vækstmuligheder.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <section className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl">
                <h2 className="font-playfair text-2xl text-[#59585E] mb-6">For Private Klienter</h2>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                  For private klienter tilbyder jeg støtte i forbindelse med personlig vækst, livsudfordringer og kontakt med afdøde. Jeg tilbyder både individuelle sessioner og små, private arrangementer online, hvor klienter kan få dyb indsigt og opnå varige forandringer.
                </p>
              </section>

              <section className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl">
                <h2 className="font-playfair text-2xl text-[#59585E] mb-6">Clairvoyant Business Konsulent</h2>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                  Som clairvoyant business konsulent, kombinerer jeg på en unik måde min spirituelle tilgang med en stærk forståelse for struktur, udvikling, organisation og relationelle processer samt det enkelte menneske og adfærd. Jeg hjælper virksomheder med at optimere arbejdsmiljø, forbedre processer og identificere vækstmuligheder. Samtidig giver jeg indsigt i de energier, der påvirker virksomheden, og hvordan disse kan udnyttes til at skabe bæredygtige, succes og autentiske resultater.
                </p>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light mt-4">
                  Jeg mener, at ægte succes opstår, når vi er autentiske og tro mod os selv, både i privatlivet og i erhvervslivet.
                </p>
              </section>

              <section className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl">
                <h2 className="font-playfair text-2xl text-[#59585E] mb-6">Min Unikke Tilgang</h2>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                  Min tilgang er unik, da jeg kombinerer mine clairvoyante evner med min uddannelse og erfaring som administrativ koordinator. Dette gør mig i stand til at tilbyde en helhedsorienteret tilgang til både personlig og professionel udvikling.
                </p>
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl">
                    <h3 className="font-playfair text-xl text-[#59585E] mb-4">Mine Evner</h3>
                    <p className="text-[#6C6C75] font-light mb-4">
                      Mine evner som clairvoyant og medie falder mig naturligt og kommer til udtryk gennem en kombination af sanser:
                    </p>
                    <ul className="space-y-2 text-[#6C6C75] font-light">
                      <li>✨ Klarsyn (at se) - Evnen til at modtage visuelle indtryk og billeder</li>
                      <li>🎵 Klarhørelse (at høre) - Evnen til at modtage budskaber og lyde</li>
                      <li>💫 Klarfølelse (at mærke) - Evnen til at fornemme energier og følelser</li>
                      <li>🌸 Klarduft og -smag - Evnen til at opfange dufte og smage</li>
                    </ul>
                    <p className="text-[#6C6C75] font-light mt-4">
                      Jeg er overbevist om, at vi alle besidder disse evner – det handler blot om at lære at bruge og udvikle dem bevidst.
                    </p>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl">
                    <h3 className="font-playfair text-xl text-[#59585E] mb-4">Min Arbejdsmetode</h3>
                    <p className="text-[#6C6C75] font-light">
                      Mit arbejde er intuitivt og styres af den åndelige verden. Jeg følger de indsigter og den vejledning, der kommer til mig under sessionen, og bruger forskellige metoder – såsom kort eller andre redskaber – alt efter, hvad der kommer til mig i den enkelte klient eller virksomheden.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl">
                <h2 className="font-playfair text-2xl text-[#59585E] mb-6">Min Personlige Historie</h2>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                  Min personlige historie har fra barnsben givet mig en stærk intuition og evnen til at mærke både mennesker og energier – herunder også den åndelige verden. Denne indsigt gør mig i stand til at skabe varige, positive forandringer for dem, jeg hjælper – uanset om det er på individuelt plan eller i en forretningskontekst.
                </p>
                <p className="text-lg text-[#6C6C75] leading-relaxed font-light mt-4">
                  Mit mål er at give det skub i den rigtige retning, som både du og din virksomhed har brug for.
                </p>
              </section>
            </div>

            <div className="mt-16 text-center">
              <Link 
                href="/booking"
                className="font-playfair bg-transparent border-2 border-[#59585E] text-[#59585E] px-12 py-4 rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-all duration-300 text-lg inline-block"
              >
                Book en Session
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 