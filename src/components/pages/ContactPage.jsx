import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from '../icons.jsx';

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
    value: '+46 70 462 99 43',
    href: 'tel:+46704629943',
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
  return (
    <section className="py-14 md:py-20 lg:py-28 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-safe relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-card white-info-card"
        >
          <span className="eyebrow">Kontakta oss</span>
          <h2 className="contact-info-side-h2 font-display text-4xl md:text-5xl leading-[0.95] text-[#020617] mb-6">
            Här når du oss
          </h2>
          <p className="text-[#64748b] text-lg mb-10">
            Vi finns i Åkersberga och är verksamma i Stockholm med omnejd. Ring, mejla eller besök oss – så hjälper vi dig vidare.
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
            <p className="text-sm text-[#64748b] mb-5">
              Org.nr: 559131-8695
            </p>
            <a
              href={import.meta.env.BASE_URL + 'offert'}
              className="inline-flex items-center gap-2 bg-[#0078D4] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#0066b8] transition-colors"
            >
              Begär offert
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
