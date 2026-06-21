import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from '../icons.jsx';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Besöksadress',
    value: 'Kantarellvägen 4, 184 34 Åkersberga',
    href: 'https://maps.google.com/?q=Kantarellvägen+4,184+34+Åkersberga',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+46 70 895 31 36',
    href: 'tel:+46708953136',
  },
  {
    icon: Mail,
    label: 'E-post',
    value: 'andreas@adbyggprojekt.se',
    href: 'mailto:andreas@adbyggprojekt.se',
  },
  {
    icon: Clock,
    label: 'Öppettider',
    value: 'Mån–Fre: 07:00–16:00',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projekttyp: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'ef4a060a-38a9-4591-add1-5a39a8ef7148',
          subject: 'Ny förfrågan från adbyggprojekt.se',
          from_name: 'AD Byggprojekt webbplats',
          name: form.name,
          email: form.email,
          phone: form.phone,
          projekttyp: form.projekttyp,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError('Något gick fel. Försök igen, eller mejla oss på andreas@adbyggprojekt.se.');
      }
    } catch (err) {
      setError('Kunde inte skicka just nu. Kontrollera din uppkoppling och försök igen.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-14 md:py-20 lg:py-28 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <div className="contact-wrapper">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-card white-info-card"
          >
            <span className="eyebrow">Kontakta oss</span>
            <h2 className="contact-info-side-h2 font-display text-4xl md:text-5xl leading-[0.95] text-[#020617] mb-6">
              Vi svarar inom 24 timmar
            </h2>
            <p className="text-[#64748b] text-lg mb-10">
              Berätta om dina planer så återkommer vi med en kostnadsfri offert och en preliminär tidsplan.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="info-card">
                    <div className="icon-box">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value">{item.value}</div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-[#e2e8f0]">
              <p className="text-sm text-[#64748b]">
                Org.nr: 559131-8695
              </p>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="contact-card form-container"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#0078D4]/20 text-[#4a9eff] flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Tack för din förfrågan!</h3>
                <p className="text-[#94a3b8] max-w-sm">
                  Vi har tagit emot ditt meddelande och återkommer så snart som möjligt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} method="post" action="https://api.web3forms.com/submit" className="form-layout">
                <input type="hidden" name="access_key" value="ef4a060a-38a9-4591-add1-5a39a8ef7148" />
                <input type="hidden" name="subject" value="Ny förfrågan från adbyggprojekt.se" />
                <input type="hidden" name="from_name" value="AD Byggprojekt webbplats" />
                <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Namn <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="form-input"
                      placeholder="Ditt namn"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-post <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="form-input"
                      placeholder="Din e-post"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="form-input"
                    placeholder="Ditt telefonnummer"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projekttyp">Projekttyp</label>
                  <select
                    id="projekttyp"
                    name="projekttyp"
                    className="form-input"
                    value={form.projekttyp}
                    onChange={(e) => setForm({ ...form, projekttyp: e.target.value })}
                  >
                    <option value="">Välj projekttyp (valfritt)</option>
                    <option value="Nybygge">Nybygge</option>
                    <option value="Renovering">Renovering</option>
                    <option value="Projektledning">Projektledning</option>
                    <option value="Rådgivning">Rådgivning</option>
                    <option value="Annat">Annat</option>
                  </select>
                </div>

                <div className="form-group message-group">
                  <label htmlFor="message">Meddelande <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder="Beskriv ditt projekt..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                <p className="text-white/45 text-xs" style={{ marginBottom: '4px' }}>
                  <span aria-hidden="true" style={{ color: '#f87171' }}>*</span> Obligatoriska fält
                </p>
                <button type="submit" disabled={submitting} className="submit-btn disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Skickar…' : 'Skicka förfrågan'}
                  <Send size={18} />
                </button>
                {error && (
                  <p className="text-[#f87171] text-sm mt-1" role="alert">{error}</p>
                )}
                <p className="text-white/40 text-xs mt-1 leading-relaxed">
                  Genom att skicka godkänner du att vi behandlar dina uppgifter enligt vår{' '}
                  <a href={import.meta.env.BASE_URL + 'integritetspolicy'} className="underline hover:text-white/70">integritetspolicy</a>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
