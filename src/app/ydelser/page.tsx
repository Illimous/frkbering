'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Services() {
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
          <h1 className="font-playfair text-5xl text-[#59585E] text-center mb-16">Mine Ydelser</h1>
          
          {[
            {
              title: "Clairvoyance & Afdødekontakt",
              description: "Få indsigt i dine livsuddrag og opdag nye perspektiver på dine udfordringer. Gennem clairvoyant vejledning hjælper jeg dig med at se klarere og finde svar på livets store spørgsmål. Ved afdødekontakt skaber vi en bro mellem verdener, der kan bringe healing og fred.",
              price: "Fra 800 kr",
              duration: "60 minutter",
              icon: "✨",
              image: "/images/photo_2025-02-06_23-53-08.jpg"
            },
            {
              title: "Tarotlæsning",
              description: "Udforsk livets mysterier gennem tarotkortenes gamle visdom. Jeg guider dig gennem en dybdegående læsning, der kan kaste lys over dine muligheder og potentielle veje fremad. Perfekt for dig, der søger klarhed og indsigt i specifikke livssituationer.",
              price: "Fra 200 kr",
              duration: "30 minutter",
              icon: "🌙",
              image: "/images/photo_2025-02-06_23-53-07.jpg"
            },
            {
              title: "Healing",
              description: "Oplev dyb indre ro og balance gennem healing. Mine healingsessioner arbejder med din krops naturlige energier for at genoprette harmoni og velvære. Ideelt for dig, der oplever stress, energiblokader eller søger spirituel fornyelse.",
              price: "400 kr",
              duration: "45 minutter",
              icon: "🌿",
              image: "/images/photo_2025-02-06_23-53-08.jpg"
            },
            {
              title: "Relationelle Processer",
              description: "Skab stærkere forbindelser og bedre kommunikation i din virksomhed. Gennem målrettede workshops og individuelle sessioner hjælper jeg teams med at opbygge tillid, forbedre samarbejdet og styrke den interne kommunikation.",
              price: "Fra 1250 kr",
              duration: "Efter behov",
              icon: "💫",
              image: "/images/photo_2025-02-06_23-53-07.jpg"
            },
            {
              title: "CBI",
              description: "Conscious Business Integration - en unik tilgang til forretningsudvikling, der kombinerer intuitive indsigter med praktisk forretningsforståelse. Få hjælp til at identificere skjulte potentialer og overvinde udfordringer i din virksomhed.",
              price: "1250 kr",
              duration: "90 minutter",
              icon: "🔮",
              image: "/images/photo_2025-02-06_23-53-08.jpg"
            }
          ].map((service, index) => (
            <div key={index} className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#59585E]/50 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-4xl mb-4 block">{service.icon}</span>
                    <h2 className="font-playfair text-3xl">{service.title}</h2>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-[#59585E] font-medium">Pris: {service.price}</p>
                    <p className="text-[#59585E] font-medium">Varighed: {service.duration}</p>
                  </div>
                  <Link 
                    href="/booking" 
                    className="font-playfair bg-transparent border-2 border-[#59585E] text-[#59585E] px-8 py-3 rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-all duration-300 inline-block"
                  >
                    Book Nu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 