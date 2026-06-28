import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from '../icons.jsx';
import { allProjects } from '../../data/projects.js';

// Visa ALLA utvalda (featured:true) – inte en hårdkodad delmängd.
const projects = allProjects.filter((p) => p.featured);

export default function ProjectsSection() {
  return (
    <section id="projekt" className="py-16 md:py-24 lg:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-safe relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
              Utvalda <span className="gradient-text-hero">projekt</span>
            </h2>
          </div>
          <p className="text-[#94a3b8] text-lg max-w-md md:text-right">
            Från ikoniska bostadshus till kommersiella landmärken. Se vad vi har skapat.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={import.meta.env.BASE_URL + 'projekt/' + project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#0078D4]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0078D4]/20 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

                {/* Year badge */}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-xs font-semibold">
                  {project.year}
                </span>

                {/* Category badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0078D4] text-white text-xs font-bold uppercase tracking-widest">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="project-card-content">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#7eb8ff] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#0078D4] group-hover:text-white group-hover:border-[#0078D4] transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#94a3b8] mb-4">
                  <MapPin size={15} />
                  <span className="text-sm font-medium">{project.location}</span>
                </div>

                <p className="text-[#94a3b8] leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 md:mt-16 text-center"
        >
          <a
            href={import.meta.env.BASE_URL + 'projekt'}
            className="btn-outline-light"
          >
            Se alla projekt
          </a>
        </motion.div>
      </div>
    </section>
  );
}
