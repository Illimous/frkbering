'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminNavbar from '@/components/AdminNavbar';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'booking' | 'bekræftelse' | 'påmindelse' | 'nyhedsbrev';
}

interface Review {
  id: string;
  name: string;
  title: string;
  text: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Nyhedsbrev Velkomst',
    subject: 'Velkommen til Frk. Berings nyhedsbrev',
    content: `Kære nye følger,

Tak fordi du har tilmeldt dig mit nyhedsbrev. Jeg er glad for at kunne dele min rejse med dig.

Her vil du modtage:
- Månedlige opdateringer om nye services og tilbud
- Spirituelle indsigter og guidancer
- Invitation til særlige events og workshops
- Tips til personlig udvikling og transformation

Du kan til enhver tid afmelde dig nyhedsbrevet via linket nederst i mine mails.

De varmeste hilsner,
Line Bering`,
    type: 'nyhedsbrev'
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('mailing');
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [sendingStatus, setSendingStatus] = useState<{
    loading: boolean;
    error?: string;
    success?: boolean;
  }>({ loading: false });
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const subscribers = [
    {
      id: 1,
      email: "marie@example.com",
      date: "2024-02-01",
      interests: ["Healing", "Tarot"]
    },
    // Flere subscribers her...
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      if (response.ok) {
        const data = await response.json();
        setRecentReviews(data.slice(0, 3)); // Vis kun de 3 seneste anmeldelser
      }
    } catch (error) {
      console.error('Fejl ved hentning af anmeldelser:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (template: EmailTemplate) => {
    if (template.id) {
      setTemplates(templates.map(t => 
        t.id === template.id ? template : t
      ));
    } else {
      const newTemplate = {
        ...template,
        id: Date.now().toString()
      };
      setTemplates([...templates, newTemplate]);
    }
    setIsEditing(false);
    setSelectedTemplate(null);
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    setSelectedTemplate(null);
  };

  const handleTestEmail = async (template: EmailTemplate) => {
    if (!testEmail) {
      setSendingStatus({
        loading: false,
        error: 'Indtast venligst en email-adresse'
      });
      return;
    }

    setSendingStatus({ loading: true });

    try {
      // Send test email med skabelonen
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: testEmail,
          subject: template.subject,
          html: template.content,
        }),
      });

      if (response.ok) {
        setSendingStatus({
          loading: false,
          success: true,
        });
        setTimeout(() => {
          setSendingStatus({ loading: false });
        }, 3000);
      } else {
        throw new Error('Kunne ikke sende email');
      }
    } catch {
      setSendingStatus({
        loading: false,
        error: 'Kunne ikke sende email. Prøv igen senere.',
      });
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

      <AdminNavbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-3xl text-[#59585E] mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Anmeldelser Sektion */}
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl text-[#59585E]">Seneste Anmeldelser</h2>
              <Link
                href="/admin/dashboard/reviews"
                className="px-4 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full text-sm hover:bg-[#6C6C75] transition-colors"
              >
                Se alle anmeldelser
              </Link>
            </div>

            {loading ? (
              <p className="text-center text-[#6C6C75]">Indlæser anmeldelser...</p>
            ) : (
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="bg-white/30 backdrop-blur-sm p-4 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-playfair text-lg text-[#59585E]">{review.name}</h3>
                        <p className="text-[#6C6C75] text-sm">{review.title}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        review.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : review.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status === 'approved' ? 'Godkendt' : 
                         review.status === 'rejected' ? 'Afvist' : 'Afventer'}
                      </span>
                    </div>
                    <p className="text-[#6C6C75] text-sm line-clamp-2">{review.text}</p>
                  </div>
                ))}
                {recentReviews.length === 0 && (
                  <p className="text-center text-[#6C6C75]">Ingen anmeldelser at vise</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('mailing')}
              className={`px-6 py-2 rounded-full font-playfair transition-all ${
                activeTab === 'mailing'
                  ? 'bg-[#59585E] text-[#F5D9D5]'
                  : 'bg-white/30 text-[#59585E] hover:bg-white/50'
              }`}
            >
              Mailing Liste
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-2 rounded-full font-playfair transition-all ${
                activeTab === 'templates'
                  ? 'bg-[#59585E] text-[#F5D9D5]'
                  : 'bg-white/30 text-[#59585E] hover:bg-white/50'
              }`}
            >
              Email Skabeloner
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-6">
            {activeTab === 'mailing' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-playfair text-2xl text-[#59585E]">Mailing Liste</h2>
                  <div className="space-x-4">
                    <button 
                      onClick={() => {
                        const newsletterTemplate = templates.find(t => t.type === 'nyhedsbrev');
                        if (newsletterTemplate) {
                          setSelectedTemplate(newsletterTemplate);
                          setIsEditing(true);
                          setActiveTab('templates');
                        } else {
                          alert('Ingen nyhedsbrev skabelon fundet. Opret venligst en først.');
                        }
                      }}
                      className="px-4 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full font-playfair text-sm hover:bg-[#6C6C75] transition-colors"
                    >
                      Send til Alle
                    </button>
                    <button className="px-4 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full font-playfair text-sm hover:bg-[#6C6C75] transition-colors">
                      Eksportér Liste
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#59585E]/20">
                        <th className="text-left py-4 px-4 font-playfair text-[#59585E]">Email</th>
                        <th className="text-left py-4 px-4 font-playfair text-[#59585E]">Tilmeldt Dato</th>
                        <th className="text-left py-4 px-4 font-playfair text-[#59585E]">Interesser</th>
                        <th className="text-left py-4 px-4 font-playfair text-[#59585E]">Handling</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-b border-[#59585E]/10">
                          <td className="py-4 px-4 text-[#6C6C75]">{subscriber.email}</td>
                          <td className="py-4 px-4 text-[#6C6C75]">{subscriber.date}</td>
                          <td className="py-4 px-4">
                            {subscriber.interests.map((interest, index) => (
                              <span
                                key={index}
                                className="inline-block px-3 py-1 bg-[#F5D9D5] text-[#59585E] rounded-full text-sm mr-2"
                              >
                                {interest}
                              </span>
                            ))}
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-red-500 hover:text-red-700 transition-colors">
                              Fjern
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-playfair text-2xl text-[#59585E]">Email Skabeloner</h2>
                  <button
                    onClick={() => {
                      setSelectedTemplate(null);
                      setIsEditing(true);
                    }}
                    className="px-6 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full font-playfair hover:bg-[#6C6C75] transition-colors"
                  >
                    Opret Ny Skabelon
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Liste over skabeloner */}
                  <div className="space-y-4">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        className="bg-white/30 backdrop-blur-sm p-6 rounded-3xl"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-playfair text-xl text-[#59585E] mb-2">{template.name}</h3>
                            <p className="text-[#6C6C75] text-sm">Emne: {template.subject}</p>
                          </div>
                          <div className="space-x-2">
                            <button
                              onClick={() => {
                                setSelectedTemplate(template);
                                setIsEditing(true);
                              }}
                              className="px-4 py-1 bg-[#59585E] text-[#F5D9D5] rounded-full text-sm hover:bg-[#6C6C75] transition-colors"
                            >
                              Rediger
                            </button>
                            <button
                              onClick={() => handleDelete(template.id)}
                              className="px-4 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                            >
                              Slet
                            </button>
                          </div>
                        </div>
                        <div className="bg-white/50 p-4 rounded-xl">
                          <pre className="whitespace-pre-wrap text-sm text-[#6C6C75]">
                            {template.content}
                          </pre>
                        </div>
                        <div className="mt-4">
                          <div className="flex gap-2">
                            <input
                              type="email"
                              placeholder="Test email-adresse"
                              className="flex-1 px-4 py-2 rounded-full bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                              value={testEmail}
                              onChange={(e) => setTestEmail(e.target.value)}
                            />
                            <button
                              onClick={() => handleTestEmail(template)}
                              disabled={sendingStatus.loading}
                              className={`px-4 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full text-sm hover:bg-[#6C6C75] transition-colors ${
                                sendingStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              {sendingStatus.loading ? 'Sender...' : 'Send Test'}
                            </button>
                          </div>
                          {sendingStatus.error && (
                            <p className="mt-2 text-red-500 text-sm">{sendingStatus.error}</p>
                          )}
                          {sendingStatus.success && (
                            <p className="mt-2 text-green-500 text-sm">Email sendt!</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Redigering/oprettelse af skabelon */}
                  {isEditing && (
                    <div className="bg-white/30 backdrop-blur-sm p-6 rounded-3xl">
                      <h2 className="font-playfair text-2xl text-[#59585E] mb-6">
                        {selectedTemplate ? 'Rediger Skabelon' : 'Ny Skabelon'}
                      </h2>
                      <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        const templateToSave = selectedTemplate || {
                          id: '',
                          name: '',
                          subject: '',
                          content: '',
                          type: 'nyhedsbrev' as const
                        };
                        handleSave(templateToSave);
                      }}>
                        <div>
                          <label className="block text-[#59585E] mb-2">Navn</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                            value={selectedTemplate?.name || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedTemplate(prev => 
                                prev ? { ...prev, name: value } : {
                                  id: '',
                                  name: value,
                                  subject: '',
                                  content: '',
                                  type: 'nyhedsbrev'
                                }
                              );
                            }}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#59585E] mb-2">Emne</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                            value={selectedTemplate?.subject || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedTemplate(prev => 
                                prev ? { ...prev, subject: value } : {
                                  id: '',
                                  name: '',
                                  subject: value,
                                  content: '',
                                  type: 'nyhedsbrev'
                                }
                              );
                            }}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#59585E] mb-2">Indhold</label>
                          <textarea
                            rows={10}
                            className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                            value={selectedTemplate?.content || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedTemplate(prev => 
                                prev ? { ...prev, content: value } : {
                                  id: '',
                                  name: '',
                                  subject: '',
                                  content: value,
                                  type: 'nyhedsbrev'
                                }
                              );
                            }}
                            required
                          />
                          <p className="mt-2 text-sm text-[#6C6C75]">
                            Tilgængelige placeholders: {'{navn}'}, {'{service}'}, {'{dato}'}, {'{tid}'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-[#59585E] mb-2">Type</label>
                          <select
                            className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                            value={selectedTemplate?.type || 'nyhedsbrev'}
                            onChange={(e) => {
                              const value = e.target.value as EmailTemplate['type'];
                              setSelectedTemplate(prev => 
                                prev ? { ...prev, type: value } : {
                                  id: '',
                                  name: '',
                                  subject: '',
                                  content: '',
                                  type: value
                                }
                              );
                            }}
                            required
                          >
                            <option value="bekræftelse">Bekræftelse</option>
                            <option value="påmindelse">Påmindelse</option>
                            <option value="nyhedsbrev">Nyhedsbrev</option>
                          </select>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                              setSelectedTemplate(null);
                            }}
                            className="px-6 py-2 border-2 border-[#59585E] text-[#59585E] rounded-full hover:bg-[#59585E] hover:text-[#F5D9D5] transition-colors"
                          >
                            Annuller
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-[#59585E] text-[#F5D9D5] rounded-full hover:bg-[#6C6C75] transition-colors"
                          >
                            Gem
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 