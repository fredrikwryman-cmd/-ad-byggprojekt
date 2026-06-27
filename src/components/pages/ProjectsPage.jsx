import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ArrowUpRight, Ruler, Clock, Wallet } from '../icons.jsx';
import { slugByTitle } from '../../data/projects.js';

const projects = [
  {
    title: 'Kv Paraden, Barkarbystaden',
    location: 'Stockholm',
    category: 'Bostäder',
    year: '2015–2016',
    image: import.meta.env.BASE_URL + 'projekt/paraden.jpg',
    description: 'Nyproduktion av 215 lägenheter. Generalentreprenör, totalentreprenad, fast pris.',
    stats: { area: '3 000 kvm', time: '24 månader', value: 'Ca 270 mkr' },
    featured: true,
  },
  {
    title: 'Kv Fjärdingen, Uppsala',
    location: 'Uppsala',
    category: 'Renovering',
    year: '2018–2019',
    image: import.meta.env.BASE_URL + 'projekt/fjardingen.jpg',
    description: 'Ombyggnad av kontor till ca 50 lägenheter i fastighet från 1910. Omfattande konstruktionslösningar på plats.',
    stats: { area: '8 500 kvm', time: '18 månader', value: '85 mkr' },
    featured: true,
  },
  {
    title: 'BRF Estrad, Vallentuna',
    location: 'Vallentuna',
    category: 'Bostäder',
    year: '2016–2018',
    image: import.meta.env.BASE_URL + 'projekt/estraden.jpg',
    description: 'Nyproduktion av 27 lägenheter och 6 radhus med omfattande markarbeten och komplicerade stomlösningar.',
    stats: { area: '3 000 kvm', time: '24 månader', value: '70 mkr' },
    featured: true,
  },
  {
    title: 'Kyrkskolan Hus A, Täby',
    location: 'Täby',
    category: 'Renovering',
    year: '2020–2022',
    image: import.meta.env.BASE_URL + 'projekt/kyrkskolan.jpg',
    description: 'Totalrenovering av skola från 1910, invändigt och utvändigt. Nya installationer och omfattande markarbeten.',
    stats: { area: '2 000 kvm', time: '24 månader', value: '55 mkr' },
    featured: false,
  },
  {
    title: 'Klastorpsskolan Hus C, Kungsholmen',
    location: 'Stockholm',
    category: 'Renovering',
    year: '2019–2020',
    image: import.meta.env.BASE_URL + 'projekt/klastorp.jpg',
    description: 'Totalrenovering av skola från 1960. Matsal, storkök, gymnastiksal, personalutrymmen, ventilation, värme och el.',
    stats: { area: '1 200 kvm', time: '12 månader', value: '43 mkr' },
    featured: false,
  },
  {
    title: 'Gravyren 23, Södertälje',
    location: 'Södertälje',
    category: 'Renovering',
    year: '2022–2023',
    image: import.meta.env.BASE_URL + 'projekt/gravyren.jpg',
    description: 'Ombyggnad av lokaler i två etapper. Nya ventilation, EL, VS och ytskikt.',
    stats: { area: '1 500 kvm', time: '12 månader', value: '22 mkr' },
    featured: false,
  },
  {
    title: 'Återställning Sätra hamn',
    location: 'Stockholm',
    category: 'Anläggning',
    year: '2024–pågår',
    image: import.meta.env.BASE_URL + 'projekt/satrahamn.jpg',
    description: 'Återställning av markytor efter tunnelarbeten, inklusive en kaj med krönbalk.',
    stats: { area: '15 000 kvm', time: 'Pågående', value: '35 mkr' },
    featured: true,
  },
  {
    title: 'Avluftstorn Sätra',
    location: 'Stockholm',
    category: 'Anläggning',
    year: '2024–pågår',
    image: import.meta.env.BASE_URL + 'projekt/avluftstorn.jpg',
    description: 'Uppförande av massiv betongskorsten ca 25 m hög samt inslagsvalv m.m.',
    stats: { area: '2 000 kvm', time: 'Pågående', value: '65 mkr' },
    featured: true,
  },
];

// categories definieras efter moreProjects nedan (annars uppstår ett TDZ-fel).

// Övriga uppdrag ur Andreas CV – visas utan bild i sektionen "Fler genomförda uppdrag".
const moreProjects = [
  {
    year: '2024–pågår', title: 'Förbifarten Stockholm m.fl.', location: 'Stockholm',
    client: 'Metrolit / Trafikverket', category: 'Anläggning',
    description: 'Diverse anläggningsuppdrag åt Trafikverket.',
    value: '7 mkr', role: 'Platschef / Bas-U',
  },
  {
    year: '2024–pågår', title: 'Rivning betongbrygga, Sätra hamn', location: 'Stockholm',
    client: 'Metrolit / Trafikverket', category: 'Anläggning',
    description: 'Rivning av betongbrygga i Sätra hamn.',
    value: '10 mkr', role: 'Platschef',
  },
  {
    year: '2023–2024', title: 'Proj 23, Solna', location: 'Solna',
    client: 'Metrolit / Humlegården', category: 'Lokalanpassning',
    description: 'Lokalanpassningar i samverkans- och utförandeentreprenad.',
    value: '30 mkr · 4 000 kvm', role: 'Platschef',
  },
  {
    year: '2023–2024', title: 'Stenhöga 3,5, Solna', location: 'Solna',
    client: 'Metrolit / Humlegården', category: 'Lokalanpassning',
    description: 'Lokalanpassningar inklusive omfattande ventilationsarbeten.',
    value: '5,5 mkr', role: 'Platschef',
  },
  {
    year: '2023–2024', title: 'Wasaskolan, Södertälje', location: 'Södertälje',
    client: 'Metrolit / Telge Fastighet', category: 'Renovering',
    description: 'Ombyggnad och renovering av storkök, fläktrum samt matsal.',
    value: '10 mkr', role: 'Totalentreprenad, fast pris',
  },
  {
    year: '2023–2024', title: 'Transportvägen 9', location: 'Stockholm',
    client: 'Xter Logistics', category: 'Kommersiellt',
    description: 'Utbyggnad av befintlig lokal med lastkajer m.m.',
    value: '15 mkr · 1 500 kvm', role: 'Bas-U',
  },
  {
    year: '2023–2026', title: 'Stämstigen', location: 'Stockholm',
    client: 'Privatperson', category: 'Renovering',
    description: 'Åtgärdande av byggfel på nybyggd villa.',
    value: '600 kvm', role: 'Byggledare',
  },
];

const categories = ['Alla', ...Array.from(new Set([...projects, ...moreProjects].map((p) => p.category)))];

function ProjectCard({ project, index }) {
  const { title, location, category, year, image, description, stats } = project;

  return (
    <motion.a
      href={import.meta.env.BASE_URL + 'projekt/' + slugByTitle[title]}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#0078D4]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0078D4]/15 hover:-translate-y-2"
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs font-semibold">
          {year}
        </span>
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0078D4] text-white text-xs font-bold uppercase tracking-wider">
          {category}
        </span>
      </div>

      <div className="flex-1 flex flex-col" style={{ padding: '2rem 2.5rem 2.5rem' }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#7eb8ff] transition-colors duration-300">
            {title}
          </h3>
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#0078D4] group-hover:text-white group-hover:border-[#0078D4] transition-all duration-300">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[#64748b] mb-4">
          <MapPin size={15} />
          <span className="text-sm font-medium">{location}</span>
        </div>

        <p className="text-[#94a3b8] leading-relaxed mb-6 flex-1">
          {description}
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-white/5">
          <div>
            <div className="flex items-center gap-1 text-[#64748b] text-xs mb-1">
              <Ruler size={12} />
              <span className="uppercase tracking-wide">Yta</span>
            </div>
            <p className="text-white font-semibold text-xs sm:text-sm">{stats.area}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-[#64748b] text-xs mb-1">
              <Clock size={12} />
              <span className="uppercase tracking-wide">Tid</span>
            </div>
            <p className="text-white font-semibold text-xs sm:text-sm">{stats.time}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-[#64748b] text-xs mb-1">
              <Wallet size={12} />
              <span className="uppercase tracking-wide">Värde</span>
            </div>
            <p className="text-white font-semibold text-xs sm:text-sm">{stats.value}</p>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function MoreProjectCard({ project, index }) {
  const { year, title, location, client, category, description, value, role } = project;

  return (
    <motion.a
      href={import.meta.env.BASE_URL + 'projekt/' + slugByTitle[title]}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-[#0f172a] rounded-2xl border border-white/5 hover:border-[#0078D4]/40 transition-all duration-500 hover:-translate-y-1"
      style={{ padding: '1.75rem 1.875rem' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2.5 py-1 rounded-full bg-[#0078D4]/15 text-[#7eb8ff] text-[0.7rem] font-bold uppercase tracking-wider">
          {category}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[0.7rem] font-semibold">
          {year}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#7eb8ff] transition-colors duration-300">
        {title}
      </h3>

      <div className="flex items-center gap-1.5 text-[#64748b] mb-3">
        <MapPin size={14} />
        <span className="text-sm font-medium">{location} · {client}</span>
      </div>

      <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 border-t border-white/5 text-xs">
        <span className="flex items-center gap-1.5 text-white font-semibold">
          <Wallet size={13} />
          {value}
        </span>
        <span className="text-[#94a3b8] font-medium">{role}</span>
      </div>
    </motion.a>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Alla');
  const filteredProjects =
    activeCategory === 'Alla' ? projects : projects.filter((p) => p.category === activeCategory);
  const filteredMore =
    activeCategory === 'Alla' ? moreProjects : moreProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Projects grid */}
      <section className="pt-20 pb-14 md:pt-24 md:pb-20 lg:pt-28 lg:pb-28 bg-[#020617] relative">
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-8 md:mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  category === activeCategory
                    ? 'bg-[#0078D4] text-white'
                    : 'bg-white/5 text-[#94a3b8] border border-white/10 hover:border-[#0078D4]/40 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fler genomförda uppdrag (utan bild) */}
      {filteredMore.length > 0 && (
      <section className="pb-16 md:pb-24 lg:pb-28 bg-[#020617] relative">
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-3">
              Mer ur portföljen
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Fler genomförda uppdrag
            </h2>
            <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl">
              Ett urval av ytterligare projekt som Andreas lett genom åren – från anläggning och
              lokalanpassningar till större renoveringar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filteredMore.map((project, i) => (
              <MoreProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
      )}

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
              Nästa projekt
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
              Låt oss bygga <span className="gradient-text-hero">ditt</span> nästa referensprojekt
            </h2>
            <p className="text-[#94a3b8] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10">
              Oavsett om det handlar om en villa, en kontorsfastighet eller en större renovering har vi erfarenheten och teamet för att förverkliga din vision.
            </p>
            <a href={import.meta.env.BASE_URL + 'kontakt'} className="btn-primary">
              Få en offert
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
