import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from '../icons.jsx';

// Projekttyp = kategorierna från Projekt-fliken (src/data/projects.js).
const PROJEKTTYPER = ['Bostäder', 'Renovering', 'Anläggning', 'Lokalanpassning', 'Kommersiellt'];
// Uppdragstyp = tjänsterna från Tjänster-fliken + Annat.
const UPPDRAGSTYPER = ['Byggledning', 'Platsledning', 'Projektledning', 'Rådgivning / Stöd', 'Bygg & renovering', 'CM-uppdrag', 'Annat'];

export default function OffertPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projekttyp: '', uppdragstyp: '', message: '' });
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
          subject: 'Ny offertförfrågan från adbyggprojekt.se',
          from_name: 'AD Byggprojekt webbplats',
          name: form.name,
          email: form.email,
          phone: form.phone,
          projekttyp: form.projekttyp,
          uppdragstyp: form.uppdragstyp,
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

      <div className="max-w-2xl mx-auto px-safe relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-card form-container"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#0078D4]/20 text-[#4a9eff] flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Tack för din offertförfrågan!</h3>
              <p className="text-[#94a3b8] max-w-sm">
                Vi har tagit emot din förfrågan och återkommer med en kostnadsfri offert så snart vi kan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} method="post" action="https://api.web3forms.com/submit" className="form-layout">
              <input type="hidden" name="access_key" value="ef4a060a-38a9-4591-add1-5a39a8ef7148" />
              <input type="hidden" name="subject" value="Ny offertförfrågan från adbyggprojekt.se" />
              <input type="hidden" name="from_name" value="AD Byggprojekt webbplats" />
              <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Namn <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                  <input id="name" name="name" type="text" autoComplete="name" className="form-input" placeholder="Ditt namn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-post <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" className="form-input" placeholder="Din e-post" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className="form-input" placeholder="Ditt telefonnummer" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projekttyp">Projekttyp</label>
                  <select id="projekttyp" name="projekttyp" className="form-input" value={form.projekttyp} onChange={(e) => setForm({ ...form, projekttyp: e.target.value })}>
                    <option value="">Välj projekttyp (valfritt)</option>
                    {PROJEKTTYPER.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="uppdragstyp">Uppdragstyp</label>
                  <select id="uppdragstyp" name="uppdragstyp" className="form-input" value={form.uppdragstyp} onChange={(e) => setForm({ ...form, uppdragstyp: e.target.value })}>
                    <option value="">Välj uppdragstyp (valfritt)</option>
                    {UPPDRAGSTYPER.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group message-group">
                <label htmlFor="message">Meddelande <span aria-hidden="true" style={{ color: '#f87171' }}>*</span></label>
                <textarea id="message" name="message" className="form-input" placeholder="Beskriv ditt projekt..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>

              <p className="text-white/70 text-xs" style={{ marginBottom: '4px' }}>
                <span aria-hidden="true" style={{ color: '#f87171' }}>*</span> Obligatoriska fält
              </p>
              <button type="submit" disabled={submitting} className="submit-btn disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? 'Skickar…' : 'Skicka offertförfrågan'}
                <Send size={18} />
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
    </section>
  );
}
