'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  title: string;
  text: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const allReviews = await response.json();
        // Hent det gemte antal anmeldelser der skal vises
        const displayCount = localStorage.getItem('reviewDisplayCount') || '3';
        const count = parseInt(displayCount);
        // Tag kun det specificerede antal anmeldelser
        setReviews(allReviews.slice(0, count));
      }
    } catch (error) {
      console.error('Fejl ved hentning af anmeldelser:', error);
    } finally {
      setLoading(false);
    }
  };

  // Automatisk slide hver 5. sekund
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
  };

  return (
    <div className="min-h-screen relative">
      {/* Baggrundsbillede for hele siden */}
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

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photo_2025-02-06_23-53-07.jpg"
            alt="Naturlig og rolig baggrund"
            fill
            className="object-cover object-center opacity-30 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5D9D5]/80 via-transparent to-[#F2CFCA]/80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-3xl md:text-4xl text-[#6C6C75] mb-8 inline-block font-playfair">Velkommen til Frk. Bering</span>
          <h1 className="font-playfair text-5xl md:text-7xl font-light mb-8 text-[#59585E] leading-relaxed">
            Din Rejse Mod
            <span className="block">Indsigtsfuld Livsføring</span>
          </h1>
          <p className="font-playfair text-xl md:text-2xl text-[#6C6C75] max-w-3xl mx-auto mb-12 leading-relaxed">
            Mit navn er Line Bering, og jeg er både clairvoyant, medie og businesskonsulent. 
            Min mission er at hjælpe dig med at opdage den magt, der allerede bor i dig.
          </p>
          <Link 
            href="/booking" 
            className="font-playfair bg-transparent border-2 border-[#59585E] text-[#59585E] px-12 py-4 rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-all duration-300 text-lg"
          >
            Book en session
          </Link>
        </div>
      </header>

      {/* Vision Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photo_2025-02-06_23-53-08.jpg"
            alt="Vision baggrund"
            fill
            className="object-cover object-center opacity-10 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5D9D5]/90 via-[#F2CFCA]/80 to-[#E9C8C4]/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-[60px] overflow-hidden transform -rotate-2 shadow-2xl">
              <Image
                src="/images/photo_2025-02-06_23-53-08.jpg"
                alt="Professionelt portræt"
                fill
                className="object-cover object-center scale-110 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#59585E]/20 to-transparent"></div>
            </div>
            <div className="space-y-8">
              <h2 className="font-playfair text-4xl font-light text-[#59585E] leading-relaxed">Min Vision</h2>
              <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                Jeg arbejder fra en grundtro på, at hver eneste person bærer en unik styrke og visdom inden i sig. 
                Min rolle er at guide dig til at udnytte denne indre kraft, så du kan leve et mere bevidst, 
                fyldestgørende og harmonisk liv.
              </p>
              <p className="text-lg text-[#6C6C75] leading-relaxed font-light">
                Jeg tror dybt på, at åndelighed ikke er noget ekstraordinært, men en naturlig del af vores eksistens. 
                Og når vi lærer at lytte til vores indre stemme, kan vi løfte os selv og hinanden til nye højder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
            <Image
            src="/images/photo_2025-02-06_23-53-07.jpg"
            alt="Services baggrund"
            fill
            className="object-cover object-center opacity-10 scale-105 rotate-180"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F5D9D5]/90 via-[#F2CFCA]/80 to-[#E9C8C4]/90"></div>
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-playfair text-4xl font-light text-center mb-8 text-[#59585E]">Mine Tjenester</h2>
          <p className="text-lg text-[#6C6C75] text-center max-w-3xl mx-auto mb-20 leading-relaxed font-light">
            Uanset om du søger svar på personlige udfordringer, ønsker kontakt til afdøde kære eller 
            søger vejledning til at optimere din virksomhed, er jeg her for at hjælpe dig med at se 
            tingene fra en ny vinkel.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Clairvoyance & Afdødekontakt",
                description: "Få indsigt i dine livsuddrag og opdag nye perspektiver på dine udfordringer",
                price: "Fra 800 kr",
              },
              {
                title: "Tarotlæsning",
                description: "Lær at læse dine egne kort og få en ny vinkel på dine muligheder",
                price: "Fra 200 kr",
              },
              {
                title: "Healing",
                description: "Genopfrisk din krop og sjæl ved hjælp af healing-sessioner, der bringer ro og klarhed",
                price: "400 kr",
              },
              {
                title: "Relationelle Processer",
                description: "Forbedr arbejdsmiljøet og skab dybere forståelse mellem medarbejdere og ledelse",
                price: "Fra 1250 kr",
              },
              {
                title: "CBI",
                description: "Få intuitive indsigter i din virksomheds potentiale og udfordringer",
                price: "1250 kr",
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-[#F2CFCA]/50 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className="relative p-8">
                  <h3 className="font-playfair text-2xl font-light mb-4 text-[#59585E]">{service.title}</h3>
                  <p className="text-lg text-[#6C6C75] mb-6 leading-relaxed font-light">{service.description}</p>
                  <p className="text-[#59585E] font-medium">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photo_2025-02-06_23-53-08.jpg"
            alt="Reviews baggrund"
            fill
            className="object-cover object-center opacity-10 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#F5D9D5]/90 via-[#F2CFCA]/80 to-[#E9C8C4]/90"></div>
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-playfair text-4xl font-light text-center mb-20 text-[#59585E]">Review</h2>
          
          {/* Reviews Slider */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                {loading ? (
                  <div className="text-center text-[#6C6C75]">Indlæser anmeldelser...</div>
                ) : reviews.length > 0 ? (
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentReview * 100}%)` }}
                  >
                    {reviews.map((review, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-3xl">
                          <div className="space-y-4">
                            <p className="text-lg text-[#6C6C75] leading-relaxed font-light italic">&ldquo;{review.text}&rdquo;</p>
                            <div className="pt-4 border-t border-[#59585E]/10">
                              <p className="font-playfair text-[#59585E]">{review.name}</p>
                              <p className="text-[#6C6C75] text-sm">{review.title}</p>
                              <p className="text-[#6C6C75] text-sm">{review.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-[#6C6C75]">Ingen anmeldelser at vise</div>
                )}
              </div>
              
              {/* Navigation Dots */}
              {reviews.length > 0 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToReview(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentReview === index ? 'bg-[#59585E]' : 'bg-[#59585E]/30'
                      }`}
                    ></button>
                  ))}
                </div>
              )}
              
              {/* Navigation Arrows */}
              {reviews.length > 1 && (
                <>
                  <button
                    onClick={prevReview}
                    className="absolute top-1/2 -left-12 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#59585E] text-[#F5D9D5] flex items-center justify-center hover:bg-[#6C6C75] transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextReview}
                    className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#59585E] text-[#F5D9D5] flex items-center justify-center hover:bg-[#6C6C75] transition-colors"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Skriv anmeldelse knap */}
          <div className="text-center mt-12">
            <Link href="/skriv-anmeldelse" className="font-playfair bg-transparent border-2 border-[#59585E] text-[#59585E] px-8 py-3 rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-all duration-300 inline-block">
              Skriv en anmeldelse
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photo_2025-02-06_23-53-07.jpg"
            alt="Kontakt baggrund"
            fill
            className="object-cover object-center opacity-15 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5D9D5]/95 via-[#F2CFCA]/90 to-[#F5D9D5]/95"></div>
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-4xl font-light mb-8 text-[#59585E]">Lad Os Begynde Rejsen</h2>
            <p className="text-lg text-[#6C6C75] mb-12 leading-relaxed font-light">
              Husk: Du er en sjæl med en krop – ikke en krop med en sjæl. 
              Lad os sammen sprede ringe i vandet og gøre verden lidt lysere. 💫
            </p>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    placeholder="Dit navn"
                    className="w-full px-6 py-4 bg-white/50 border-b-2 border-[#87898C] focus:border-[#59585E] transition-colors duration-300 text-lg placeholder:text-[#6C6C75]/50 font-light"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Din email"
                    className="w-full px-6 py-4 bg-white/50 border-b-2 border-[#87898C] focus:border-[#59585E] transition-colors duration-300 text-lg placeholder:text-[#6C6C75]/50 font-light"
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Din besked"
                  rows={6}
                  className="w-full px-6 py-4 bg-white/50 border-b-2 border-[#87898C] focus:border-[#59585E] transition-colors duration-300 text-lg placeholder:text-[#6C6C75]/50 font-light"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="font-playfair bg-transparent border-2 border-[#59585E] text-[#59585E] px-12 py-4 rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-all duration-300 text-lg inline-block"
                >
                  Send Besked
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photo_2025-02-06_23-53-07.jpg"
            alt="Footer baggrund"
            fill
            className="object-cover object-center opacity-10 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5D9D5]/95 via-[#F2CFCA]/95 to-[#E9C8C4]/95"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4">
            <p className="text-[#6C6C75] font-light">© 2024 Frk-bering.dk - Alle rettigheder forbeholdes</p>
            <p className="text-[#6C6C75] font-light">
              <a href="mailto:line@frk-bering.dk" className="hover:text-[#59585E] transition-colors">
                line@frk-bering.dk
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
