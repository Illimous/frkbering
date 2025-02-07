'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminNavbar from '@/components/AdminNavbar';

interface Review {
  id: string;
  name: string;
  title: string;
  text: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(3); // Standard antal anmeldelser der vises

  useEffect(() => {
    fetchReviews();
    // Hent det gemte antal anmeldelser der skal vises
    const savedCount = localStorage.getItem('reviewDisplayCount');
    if (savedCount) {
      setDisplayCount(parseInt(savedCount));
    }
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Fejl ved hentning af anmeldelser:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: reviewId, status: newStatus }),
      });

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Fejl ved opdatering af anmeldelse:', error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm('Er du sikker på, at du vil slette denne anmeldelse?')) {
      try {
        const response = await fetch(`/api/admin/reviews?id=${reviewId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchReviews();
        }
      } catch (error) {
        console.error('Fejl ved sletning af anmeldelse:', error);
      }
    }
  };

  const handleDisplayCountChange = (newCount: number) => {
    setDisplayCount(newCount);
    localStorage.setItem('reviewDisplayCount', newCount.toString());
  };

  if (loading) {
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
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-[#6C6C75]">Indlæser anmeldelser...</p>
        </div>
      </div>
    );
  }

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
      
      <AdminNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-3xl text-[#59585E] mb-8">Håndter Anmeldelser</h1>
        
        {/* Indstillinger for visning */}
        <div className="bg-white/30 backdrop-blur-sm p-6 rounded-3xl mb-8">
          <h2 className="font-playfair text-xl text-[#59585E] mb-4">Indstillinger for visning</h2>
          <div className="flex items-center gap-4">
            <label className="text-[#6C6C75]">Antal anmeldelser der vises på forsiden:</label>
            <select 
              value={displayCount}
              onChange={(e) => handleDisplayCountChange(parseInt(e.target.value))}
              className="px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/30 backdrop-blur-sm p-6 rounded-3xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-playfair text-xl text-[#59585E] mb-2">{review.name}</h3>
                  <p className="text-[#6C6C75] text-sm">{review.title}</p>
                  <p className="text-[#6C6C75] text-sm">{review.date}</p>
                </div>
                <div className="space-x-2">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(review.id, 'approved')}
                        className="px-4 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full text-sm hover:bg-[#6C6C75] transition-colors"
                      >
                        Godkend
                      </button>
                      <button
                        onClick={() => handleStatusChange(review.id, 'rejected')}
                        className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                      >
                        Afvis
                      </button>
                    </>
                  )}
                  {review.status === 'approved' && (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
                      Godkendt
                    </span>
                  )}
                  {review.status === 'rejected' && (
                    <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm">
                      Afvist
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors ml-2"
                  >
                    Slet
                  </button>
                </div>
              </div>
              <p className="text-[#6C6C75]">{review.text}</p>
            </div>
          ))}
          
          {reviews.length === 0 && (
            <p className="text-center text-[#6C6C75]">Ingen anmeldelser at vise</p>
          )}
        </div>
      </main>
    </div>
  );
} 