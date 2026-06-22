import { Linkedin, MapPin, Phone, Mail } from '../icons.jsx';
import Logo from './Logo.jsx';

const BASE = '/-ad-byggprojekt';

const links = [
  { label: 'Hem', href: BASE + '/' },
  { label: 'Projekt', href: BASE + '/projekt' },
  { label: 'Tjänster', href: BASE + '/tjanster' },
  { label: 'Om oss', href: BASE + '/#om-oss' },
  { label: 'CV', href: BASE + '/cv' },
  { label: 'Kontakt', href: BASE + '/kontakt' },
];

const socials = [
  { icon: Linkedin, href: 'https://se.linkedin.com/in/andreas-dahlgren-067948105', label: 'LinkedIn' },
];

const contact = [
  { icon: MapPin, text: 'Kantarellvägen 4, 184 34 Åkersberga' },
  { icon: Phone, text: '+46 70 462 99 43', href: 'tel:+46704629943' },
  { icon: Mail, text: 'andreas@adbyggprojekt.se', href: 'mailto:andreas@adbyggprojekt.se' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <a href={BASE + '/'} className="inline-block group mb-6">
            <Logo className="w-48 md:w-56 h-auto text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)] transition-transform duration-300 group-hover:scale-[1.02]" />
          </a>
          <p>
            AD Byggprojekt Stockholm AB bygger framtiden med precision, kvalitet och hantverk.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#8892b0] hover:bg-[#0078D4] hover:border-[#0078D4] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <span className="footer-title">Snabblänkar</span>
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <span className="footer-title">Kontakt</span>
          {contact.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="icon-box">
                  <Icon size={16} />
                </span>
                <span>{item.text}</span>
              </>
            );
            return (
              <div key={item.text} className="contact-item">
                {item.href ? (
                  <a href={item.href} className="inline-flex items-center gap-4 group hover:text-[#0078D4] transition-colors duration-300">
                    {content}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-4">{content}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} AD Byggprojekt Stockholm AB — Org.nr: 559131-8695
        {' · '}
        <a href={BASE + '/integritetspolicy'} className="underline hover:text-white transition-colors">Integritetspolicy</a>
      </div>
    </footer>
  );
}
