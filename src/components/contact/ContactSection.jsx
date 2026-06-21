import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from '../icons.jsx';

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '+46 70 895 31 36', href: 'tel:+46708953136' },
  { icon: Mail, label: 'E-post', value: 'andreas@adbyggprojekt.se', href: 'mailto:andreas@adbyggprojekt.se' },
  { icon: MapPin, label: 'Adress', value: 'Kantarellvägen 4, 184 34 Åkersberga', href: 'https://maps.google.com/?q=Kantarellvägen+4,184+34+Åkersberga' },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projekttyp: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    <section id="kontakt" className="contact-section section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <div className="contact-wrapper">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-card white-info-card"
          >
            <div className="mb-6">
              <span className="eyebrow mb-3 font-bold">Kontakt</span>
              <h2 className="text-balance">
                Låt oss prata om ditt <span className="gradient-text">projekt</span>
              </h2>
            </div>
            <p className="text-lg text-[#64748b] leading-relaxed mb-12">
              Berätta om dina planer så återkommer vi med en kostnadsfri offert inom 24 timmar.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="info-card"
                  >
                    <span className="icon-box">
                      <Icon size={24} />
                    </span>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value">{item.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-card form-container"
          >
            {submitted ? (
              <div className="text-center py-16 flex flex-col justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-[#0078D4] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Tack för din förfrågan!</h3>
                <p className="text-[#94a3b8]">Vi återkommer inom 24 timmar.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="mt-8 text-sm font-semibold text-[#4a9eff] hover:text-white transition-colors"
                >
                  Skicka ny förfrågan
                </button>
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
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ditt namn"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-post <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="din@epost.se"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="070-123 45 67"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projekttyp">Projekttyp</label>
                  <select
                    id="projekttyp"
                    name="projekttyp"
                    value={form.projekttyp}
                    onChange={handleChange}
                    className="form-input"
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
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Berätta om ditt projekt..."
                    className="form-input"
                    required
                  />
                </div>

                <p className="text-white/70 text-xs" style={{ marginBottom: '4px' }}>
                  <span aria-hidden="true" style={{ color: '#f87171' }}>*</span> Obligatoriska fält
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="submit-btn group font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'SKICKAR…' : 'SKICKA FÖRFRÅGAN'}
                  <Send size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                {error && (
                  <p className="text-[#f87171] text-sm mt-1" role="alert">{error}</p>
                )}
                <p className="text-white/70 text-xs mt-1 leading-relaxed">
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
