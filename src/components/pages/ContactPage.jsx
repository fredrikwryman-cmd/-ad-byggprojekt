import { motion, MotionConfig } from 'framer-motion';
import { MapPin, Building2, Phone, Mail, Clock, ArrowRight } from '../icons.jsx';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Besöksadress',
    value: 'Sågvägen 33, 184 40 Åkersberga',
    href: 'https://maps.google.com/?q=Sågvägen+33,184+40+Åkersberga',
  },
  {
    icon: Building2,
    label: 'Postadress',
    value: 'Kantarellvägen 4, 184 34 Åkersberga',
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
    <MotionConfig reducedMotion="user">
    <section className="py-14 md:py-20 lg:py-28 bg-[#020617] relative overflow-hidden bp-dark">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />

      <div className="max-w-[920px] mx-auto px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-card white-info-card"
        >
          <p className="text-[#64748b] text-lg mb-10">
            Vi finns i Åkersberga och är verksamma i Stockholm med omnejd. Ring, mejla eller besök oss – så hjälper vi dig vidare.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          {/* GPS-karta – pekar på besöksadressen (Sågvägen 33). */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-[0_10px_30px_rgba(2,6,23,0.08)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0]">
              <MapPin size={16} />
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[#334155]">
                Sågvägen 33 · Åkersberga
              </span>
            </div>
            <iframe
              title="Karta över besöksadressen Sågvägen 33, Åkersberga"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full h-[280px] sm:h-[340px] border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=18.2820%2C59.4730%2C18.3175%2C59.4865&layer=mapnik&marker=59.4794%2C18.2997"
            />
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
    </MotionConfig>
  );
}
