'use client';
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'booking' | 'bekræftelse' | 'påmindelse' | 'nyhedsbrev';
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

export default function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [sendingStatus, setSendingStatus] = useState<{
    loading: boolean;
    error?: string;
    success?: boolean;
  }>({ loading: false });

  const handleSave = (template: EmailTemplate) => {
    if (selectedTemplate) {
      // Opdater eksisterende skabelon
      setTemplates(templates.map(t => 
        t.id === template.id ? template : t
      ));
    } else {
      // Tilføj ny skabelon
      setTemplates([...templates, { ...template, id: Date.now().toString() }]);
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
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl text-[#59585E]">Email Skabeloner</h1>
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
              <form className="space-y-4">
                <div>
                  <label className="block text-[#59585E] mb-2">Navn</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                    value={selectedTemplate?.name || ''}
                    onChange={(e) => setSelectedTemplate(prev => 
                      prev ? { ...prev, name: e.target.value } : {
                        id: '',
                        name: e.target.value,
                        subject: '',
                        content: '',
                        type: 'booking'
                      }
                    )}
                  />
                </div>
                <div>
                  <label className="block text-[#59585E] mb-2">Emne</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                    value={selectedTemplate?.subject || ''}
                    onChange={(e) => setSelectedTemplate(prev => 
                      prev ? { ...prev, subject: e.target.value } : null
                    )}
                  />
                </div>
                <div>
                  <label className="block text-[#59585E] mb-2">Indhold</label>
                  <textarea
                    rows={10}
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                    value={selectedTemplate?.content || ''}
                    onChange={(e) => setSelectedTemplate(prev => 
                      prev ? { ...prev, content: e.target.value } : null
                    )}
                  />
                  <p className="mt-2 text-sm text-[#6C6C75]">
                    Tilgængelige placeholders: {'{navn}'}, {'{service}'}, {'{dato}'}, {'{tid}'}
                  </p>
                </div>
                <div>
                  <label className="block text-[#59585E] mb-2">Type</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white/50 border-2 border-[#59585E]/20 focus:border-[#59585E] transition-colors"
                    value={selectedTemplate?.type || 'booking'}
                    onChange={(e) => setSelectedTemplate(prev => 
                      prev ? { ...prev, type: e.target.value as EmailTemplate['type'] } : null
                    )}
                  >
                    <option value="booking">Booking</option>
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
                    type="button"
                    onClick={() => selectedTemplate && handleSave(selectedTemplate)}
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
    </AdminLayout>
  );
} 