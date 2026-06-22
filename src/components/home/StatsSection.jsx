import { motion } from 'framer-motion';

const stats = [
  { value: '15', suffix: '+', label: 'Genomförda projekt' },
  { value: '25', suffix: '+', label: 'Års erfarenhet' },
  { value: '270', suffix: ' mkr', label: 'Största projekt' },
  { value: '750', suffix: ' mkr', label: 'I ledda projekt' },
];

export default function StatsSection() {
  return (
    <section className="px-safe relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className="stats-bar">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-value">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
