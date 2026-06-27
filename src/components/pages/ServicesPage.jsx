import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Building2, PaintRoller, ClipboardCheck, MessagesSquare, ArrowRight, CheckCircle2, Users } from '../icons.jsx';

const services = [
  {
    title: 'Byggledning',
    icon: ClipboardCheck,
    summary: 'Åt dig som beställare eller byggherre — vi är din ansvariga representant på plats.',
    description: 'Byggledning utför vi oftast åt en beställare eller byggherre, till exempel kommuner, fastighetsägare eller andra beställare. Vi är er person på arbetsplatsen som ser till att bygget rullar — bevakar er beställning, leder byggmöten och följer upp tid, kvalitet, arbetsmiljö och ekonomi, så att entreprenören levererar det som är avtalat.',
    features: ['Beställarens representant på plats', 'Upphandling av entreprenörer', 'Byggmöten & samordning', 'Tid-, kvalitets- & ekonomiuppföljning', 'Arbetsmiljö & Bas-U', 'Delta vid besiktning', 'Löpande rapportering'],
  },
  {
    title: 'Platsledning',
    icon: Users,
    summary: 'Åt dig som entreprenör — vi driver produktionen på plats i total- eller generalentreprenad.',
    description: 'Platsledning utför vi oftast åt en entreprenör som tagit på sig ett uppdrag, vanligtvis total- eller generalentreprenad. Som platschef tar vi ansvar för den dagliga styrningen på arbetsplatsen — samordning av yrkesarbetare och underentreprenörer, tidplan, arbetsmiljö som Bas-U, egenkontroll och ekonomisk uppföljning — hela vägen fram till färdigt och besiktigat.',
    features: ['Platschef på plats', 'Daglig arbetsledning', 'Samordning av yrkesarbetare', 'Bas-U & arbetsmiljö', 'Kvalitets- & egenkontroll', 'Delta vid besiktning'],
  },
  {
    title: 'Projektledning',
    icon: Building2,
    summary: 'Komplett ledning med fokus på tid, budget och kvalitet. Vi samordnar allt.',
    description: 'Med strukturerad projektledning håller vi ihop varje fas – upphandling, tidsplanering, ekonomisk uppföljning och arbetsmiljö. Du får en dedikerad projektledare som ansvarar för kommunikationen. Vare sig du behöver hjälp med ett enskilt skede eller hela projektet ser vi till att alla aktörer drar åt samma håll. Med tät uppföljning och löpande rapportering har du alltid full koll på status, kostnader och nästa steg.',
    features: ['Tids- & budgetplanering', 'Upphandling av entreprenörer', 'Byggmöten & samordning', 'Arbetsmiljöplaner', 'Kvalitets- & miljöuppföljning', 'Ekonomisk uppföljning', 'Daglig rapportering'],
  },
  {
    title: 'Rådgivning / Stöd',
    icon: MessagesSquare,
    summary: 'Expertis genom hela byggprocessen. Vi hjälper dig fatta rätt beslut.',
    description: 'Redan innan du har en färdig ritning bistår vi med teknisk rådgivning, kostnadsbedömningar och lösningsförslag – ett extra par erfarna ögon vid komplexa och krävande projekt, när besluten är svåra och insatserna höga. Vi kliver även in med stöd när projekt växer i omfattning eller belastningen på tjänstemännen blir tyngre än planerat, och tar fram merkostnader vid behov så att ekonomin inte tappas. Dessutom stöttar vi med seniora kunskaper när teamet har mindre erfaren personal. Tjänsterna omfattar vanligtvis 1–2 arbetsdagar per vecka.',
    features: ['Stöttning vid komplexa & krävande projekt', 'Kostnadsbedömningar', 'Förstudier & second opinion', 'Tekniska konsultationer', 'Materialval & upphandlingsstöd', 'Bygglovsstöd', 'Besiktningsstöd', 'Support', 'Stöd', 'Vägledning'],
  },
  {
    title: 'Bygg & renovering',
    icon: PaintRoller,
    summary: 'Vid behov tar vi även ansvar för utförandet – nybyggnad och renovering.',
    description: 'När uppdraget kräver det tar vi även hand om utförandet – från nyproduktion till varsam renovering. Vi samordnar yrkesarbetare och underentreprenörer enligt branschens regler, även i bebodda fastigheter, med fokus på kvalitet, arbetsmiljö och ekonomi hela vägen till slutbesiktning.',
    features: ['Nyproduktion', 'Om- & tillbyggnad', 'Renovering & ROT', 'Våtrum enligt branschregler', 'Arbete i bebodda fastigheter', 'Kvalitetssäkring', 'Slutbesiktning & garanti'],
  },
  {
    title: 'CM-uppdrag',
    icon: Building2,
    cm: true,
    href: 'https://fredrikwryman-cmd.github.io/bopg/',
    summary: 'Söker du Construction Management? Det hanteras av vårt systerbolag.',
    description: 'Construction Management (CM) hanteras av vårt systerbolag Bygg & Projektgruppen i Stockholm AB — en samlad byggpartner som håller ihop hela kedjan från projektledning till färdig byggnad. Behöver ditt projekt en helhetspartner snarare än enskild byggledning, lotsar vi dig vidare dit.',
    features: ['Samlad byggpartner', 'Helhetsansvar genom hela kedjan', 'Projektledning till färdig byggnad'],
  },
];

// Delat kortinnehåll (ikon, rubrik, text, punkter, ev. CTA) — identiskt för alla kort.
function CardBody({ service }) {
  const Icon = service.icon;
  return (
    <>
      <div className="flex items-start gap-5 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0078D4] to-[#4a9eff] text-white flex items-center justify-center shadow-lg shadow-[#0078D4]/25 flex-shrink-0">
          <Icon size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#020617] mb-2">{service.title}</h2>
          <p className="text-[#64748b] leading-relaxed">{service.summary}</p>
        </div>
      </div>

      {(Array.isArray(service.description) ? service.description : [service.description]).map((para, pi) => (
        <p key={pi} className="text-[#334155] leading-relaxed mb-6">{para}</p>
      ))}

      <ul className="space-y-3">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-[#334155]">
            <span className="w-5 h-5 rounded-full bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={12} />
            </span>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      {service.cm && (
        <a
          href={service.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 bg-[#0078D4] text-white rounded-full px-5 py-2.5 font-semibold hover:bg-[#0066b8] transition-colors"
        >
          Till Bygg &amp; Projektgruppen
          <ArrowRight size={18} />
        </a>
      )}
    </>
  );
}

// CM-kortet: sidans tydligaste kort — premium 3D-tilt + hologram-sken som följer musen.
// Respekterar prefers-reduced-motion och faller tillbaka till enbart hover-lyft/glow på touch.
function CmCard({ service, i }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');
  const [sheen, setSheen] = useState({ x: 50, y: 50, active: false });
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setInteractive(!reduce && finePointer);
  }, []);

  const handleMove = (e) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 9;
    const rx = (0.5 - py) * 9;
    setTransform(`perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-10px)`);
    setSheen({ x: +(px * 100).toFixed(1), y: +(py * 100).toFixed(1), active: true });
  };

  const handleLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)');
    setSheen((s) => ({ ...s, active: false }));
  };

  return (
    <motion.div
      id="cm-uppdrag"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative scroll-mt-28 h-full"
      style={{ perspective: '900px' }}
    >
      <article
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full w-full bg-gradient-to-b from-white to-[#eef6ff] ring-2 ring-[#0078D4]/45 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-[#0078D4]/25 hover:shadow-[0_30px_60px_-15px_rgba(0,120,212,0.45)] hover:-translate-y-3 transition-all duration-300"
        style={{
          transform: transform || undefined,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: sheen.active
            ? 'transform 0.18s ease-out, box-shadow 0.3s ease'
            : 'transform 0.6s ease, box-shadow 0.3s ease',
        }}
      >
        <span
          className="absolute -top-3 right-6 z-20 bg-[#0078D4] text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-md"
          style={{ transform: 'translateZ(40px)' }}
        >
          Systerbolag
        </span>

        {/* Lokala keyframes: hologrammets långsamma idle-drift */}
        <style>{`
          @keyframes cmHoloDrift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .cm-holo-idle { animation: cmHoloDrift 16s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .cm-holo-idle { animation: none; }
          }
        `}</style>

        {/* Lager 1 (z-[1]) – mättad iriserande botten, syns alltid och driver långsamt */}
        <div
          aria-hidden="true"
          className="cm-holo-idle absolute inset-0 rounded-3xl pointer-events-none z-[1]"
          style={{
            background:
              'linear-gradient(115deg, rgba(120,0,255,.45), rgba(0,180,255,.45), rgba(0,255,180,.40), rgba(255,0,200,.45), rgba(80,120,255,.45))',
            backgroundSize: '220% 220%',
            opacity: 0.35,
          }}
        />

        {/* Lager 2 (z-[1]) – musstyrt iriserande sken som roterar/flyttas med pekaren */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none z-[1]"
          style={{
            background: `conic-gradient(from ${(sheen.x * 3.6).toFixed(0)}deg at ${sheen.x}% ${sheen.y}%, rgba(120,0,255,.5), rgba(0,180,255,.5), rgba(0,255,180,.45), rgba(255,0,200,.5), rgba(80,120,255,.5), rgba(120,0,255,.5))`,
            opacity: sheen.active ? 0.55 : 0.3,
            transition: 'opacity 0.45s ease, background 0.12s ease-out',
          }}
        />

        {/* Sheen-remsa (z-[2]) – smalt ljust streck som vandrar med pekaren + glasig kant */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none z-[2] overflow-hidden ring-1 ring-inset ring-white/30"
        >
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(100deg, transparent 44%, rgba(255,255,255,.7) 50%, transparent 56%)',
              backgroundSize: '300% 100%',
              backgroundPosition: `${sheen.x}% 0%`,
              opacity: sheen.active ? 0.7 : 0.22,
              transition: 'opacity 0.45s ease, background-position 0.12s ease-out',
            }}
          />
        </div>

        {/* Innehåll (z-10) – alltid ovanför hologrammet, fullt läsbart */}
        <div
          className="relative z-10"
          style={{ transform: interactive ? 'translateZ(35px)' : undefined, transformStyle: 'preserve-3d' }}
        >
          <CardBody service={service} />
        </div>
      </article>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Detailed services */}
      <section className="py-14 md:py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078D4]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, i) =>
              service.cm ? (
                <CmCard key={service.title} service={service} i={i} />
              ) : (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-gradient-to-b from-white to-[#eef6ff] ring-1 ring-[#0078D4]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-[#0078D4]/15 hover:shadow-2xl hover:shadow-[#0078D4]/25 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <CardBody service={service} />
                </motion.article>
              )
            )}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0078D4]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-safe relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
              Kom igång
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
             Redo att starta ditt <span className="gradient-text-hero">projekt</span>?
            </h2>
            <p className="text-[#94a3b8] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10">
              Boka ett kostnadsfritt möte så går vi igenom dina behov och ger en skräddarsydd lösning.
            </p>
            <a href={import.meta.env.BASE_URL + 'kontakt'} className="btn-primary">
              Kontakta oss
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
