import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from '../icons.jsx';

// ⚠️ PLATSHÅLLARE – dessa omdömen är PÅHITTADE exempel och får INTE visas live.
// Ersätt med riktiga, godkända kundomdömen innan modulen aktiveras i index.astro.
const testimonials = [
  {
    quote: 'AD Byggprojekt levererade vårt drömhus med en precision och omsorg som överträffade alla förväntningar. Kommunikationen var tydlig från dag ett.',
    author: 'Anna Lindqvist',
    role: 'Privatkund, Stockholm',
    rating: 5,
  },
  {
    quote: 'Professionellt från första mötet till slutbesiktning. De höll både tider och budget – något som är sällsynt i byggbranschen.',
    author: 'Erik Johansson',
    role: 'Fastighetsägare',
    rating: 5,
  },
  {
    quote: 'Vi anlitade AD Byggprojekt för renovering av vårt kontor. Resultatet blev fantastiskt och våra medarbetare trivs som aldrig förr.',
    author: 'Maria Svensson',
    role: 'VD, Svensson Consulting',
    rating: 5,
  },
  {
    quote: 'Vi totalrenoverade vår villa från 70-talet och teamet höll ihop allt – hantverkare, tidplan och ekonomi. Inga obehagliga överraskningar, bara tydliga besked hela vägen.',
    author: 'Johan Hedlund',
    role: 'Privatkund, Nacka',
    rating: 5,
  },
  {
    quote: 'En stam- och fasadrenovering i en bebodd förening är aldrig enkel, men kommunikationen mot våra medlemmar var föredömlig. Allt blev klart i tid och med hög kvalitet.',
    author: 'Camilla Boström',
    role: 'Ordförande, BRF Sjöutsikten',
    rating: 5,
  },
  {
    quote: 'Vi har anlitat AD Byggprojekt i flera ombyggnadsprojekt i vårt bestånd. De levererar det de lovar och är enkla att samarbeta med – en partner vi gärna återkommer till.',
    author: 'Henrik Ahlgren',
    role: 'Förvaltningschef, Nordvärden Fastigheter',
    rating: 5,
  },
  {
    quote: 'Nytt kök och två badrum, klart på utsatt tid och till fast pris. Det märks att de har koll på detaljerna och faktiskt bryr sig om slutresultatet.',
    author: 'Sara Mörk',
    role: 'Privatkund, Lidingö',
    rating: 5,
  },
  {
    quote: 'Renoveringen av vårt storkök och vår matsal genomfördes mitt under pågående verksamhet. Den närvarande platsledningen gjorde att vi kunde hålla driften igång hela tiden.',
    author: 'Daniel Krasniqi',
    role: 'Fastighetschef, Mälarvik Förvaltning',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonial-section section-padding">
      <div className="max-w-5xl mx-auto px-safe">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <span className="eyebrow mb-3 font-bold">Omdömen</span>
          <h2>
            Det säger våra <span className="gradient-text">kunder</span>
          </h2>
        </motion.div>

        <div className="testimonial-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="stars">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={24} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <blockquote>
                "{testimonials[active].quote}"
              </blockquote>

              <div className="avatar">
                {testimonials[active].author.charAt(0)}
              </div>
              <div className="author-name">
                {testimonials[active].author}
              </div>
              <div className="author-title">
                {testimonials[active].role}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:border-[#0078D4] hover:text-[#0078D4] transition-colors"
              aria-label="Föregående"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-[#0078D4] w-8' : 'bg-[#e2e8f0] hover:bg-[#94a3b8]'
                  }`}
                  aria-label={`Gå till omdöme ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:border-[#0078D4] hover:text-[#0078D4] transition-colors"
              aria-label="Nästa"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
