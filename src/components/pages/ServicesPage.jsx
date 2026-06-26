import { motion } from 'framer-motion';
import { Building2, PaintRoller, ClipboardCheck, MessagesSquare, ArrowRight, CheckCircle2, Users, Shield, Wallet } from '../icons.jsx';

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
    description: [
      'Redan innan du har en färdig ritning kan vi bistå med teknisk rådgivning, kostnadsbedömningar och lösningsförslag. Vi finns också med som stöttning och support genom hela resan vid komplexa och krävande projekt – ett extra par erfarna ögon när besluten är svåra och insatserna höga, oavsett om det gäller en knivig teknisk fråga, en pressad tidplan eller en tuff förhandling. Målet är att du ska känna dig trygg i varje beslut: vi hjälper dig utvärdera alternativ, undvika kostsamma misstag och fatta beslut på rätt grunder, tidigt i processen där de gör störst skillnad. Ofta sparar några timmars rådgivning både tid och pengar längre fram.',
      'Vi kan även kliva in med support / stöd vid projekt som ökar i omfattning eller att det blir en tyngre belastning på tjänstemän än vad det är beräknat med från start och givetvis bistå med framtagande av merkostnader för detta vid behov. Detta för att ej tappa ekonomin i projekt.',
      'Vi kan även stötta med seniora kunskaper när det har resurssatts med oerfaren personal som behöver stöttning för att kunna lösa sina uppgifter innan personal går in i väggen m.m.',
      'Dessa tjänster brukar innefattas av 1–2 arbetsdagar/vecka.',
    ],
    features: ['Stöttning vid komplexa & krävande projekt', 'Kostnadsbedömningar', 'Förstudier & second opinion', 'Tekniska konsultationer', 'Materialval & upphandlingsstöd', 'Bygglovsstöd', 'Besiktningsstöd', 'Support', 'Stöd', 'Vägledning'],
  },
  {
    title: 'Bygg & renovering',
    icon: PaintRoller,
    summary: 'Vid behov tar vi även ansvar för utförandet – nybyggnad och renovering.',
    description: 'När uppdraget kräver det tar vi även hand om själva utförandet, från nyproduktion till varsam renovering. Vi samordnar yrkesarbetare och underentreprenörer och arbetar enligt branschens regler, även i bebodda fastigheter och med pågående verksamhet. Samma fokus på kvalitet, arbetsmiljö och ekonomi följer med hela vägen till slutbesiktning.',
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

const process = [
  { step: '01', title: 'Kostnadsfritt möte', text: 'Vi lyssnar på dina idéer, gör en första bedömning och ger en indikativ kostnadsbild. Mötet är förutsättningslöst och kostar dig ingenting – vi vill förstå dina behov innan vi pratar pris.' },
  { step: '02', title: 'Planering & offert', text: 'Du får en detaljerad projektplan, tidsplan och en tydlig offert. Vi går igenom upplägg, lösningar och varje moment tillsammans så att du vet exakt vad som ingår. Inga överraskningar längre fram.' },
  { step: '03', title: 'Produktion', text: 'Erfarna hantverkare och en dedikerad projektledare genomför arbetet med hög kvalitet och säkerhet. Du får löpande uppdateringar och en tydlig kontaktperson genom hela bygget.' },
  { step: '04', title: 'Överlämning', text: 'Vi avslutar med slutbesiktning, fullständig dokumentation och garanti. Eventuella synpunkter åtgärdas innan du får nycklarna till ett färdigt och kontrollerat resultat.' },
];

const values = [
  { icon: CheckCircle2, title: 'Kvalitet', text: 'Högsta standard i varje detalj, med egenkontroll och noggrann uppföljning hela vägen till slutbesiktning.' },
  { icon: Shield, title: 'Arbetsmiljö', text: 'Säkra arbetsplatser med ordning och reda. Som Bas-U tar vi arbetsmiljöansvaret på största allvar.' },
  { icon: Wallet, title: 'Ekonomi', text: 'Kostnadskontroll och förutsägbar ekonomi. Du har alltid koll på status, kostnader och nästa steg.' },
  { icon: Users, title: 'Närhet', text: 'Personlig kontakt och löpande dialog genom hela projektet. Du har alltid en namngiven kontaktperson.' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Detailed services */}
      <section className="py-14 md:py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078D4]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  id={service.cm ? 'cm-uppdrag' : undefined}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative bg-[#f8fafc] border rounded-3xl p-6 sm:p-8 md:p-10 hover:shadow-2xl hover:shadow-[#0078D4]/10 hover:-translate-y-1 transition-all duration-500 ${service.cm ? 'scroll-mt-28 border-[#0078D4]/30' : 'border-[#e2e8f0]'}`}
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0078D4] to-[#4a9eff] text-white flex items-center justify-center shadow-lg shadow-[#0078D4]/25">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#020617] mb-2">
                        {service.title}
                      </h2>
                      <p className="text-[#64748b] leading-relaxed">
                        {service.summary}
                      </p>
                    </div>
                  </div>

                  {(Array.isArray(service.description) ? service.description : [service.description]).map((para, pi) => (
                    <p key={pi} className="text-[#334155] leading-relaxed mb-6">
                      {para}
                    </p>
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
                      className="mt-7 inline-flex items-center gap-2 font-semibold text-[#0078D4] hover:gap-3 transition-all"
                    >
                      Till Bygg &amp; Projektgruppen
                      <ArrowRight size={18} />
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>


      {/* Process */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
              Så arbetar vi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Från idé till <span className="gradient-text-hero">inflyttning</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative bg-[#0f172a] border border-white/5 rounded-3xl p-8 hover:border-[#0078D4]/30 transition-colors duration-300"
              >
                <span className="font-display text-5xl text-[#0078D4]/30 mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[#94a3b8] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-safe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0078D4] mb-4">
              Varför välja oss
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#020617]">
              Byggt på <span className="gradient-text">pålitliga värderingar</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center p-6 sm:p-8 bg-[#f8fafc] rounded-3xl border border-[#e2e8f0] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0078D4]/10 to-[#4a9eff]/10 text-[#0078D4] flex items-center justify-center mx-auto mb-5">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#020617] mb-2">{value.title}</h3>
                  <p className="text-[#64748b]">{value.text}</p>
                </motion.div>
              );
            })}
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
