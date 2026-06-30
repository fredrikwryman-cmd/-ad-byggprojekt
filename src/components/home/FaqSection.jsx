import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '../../data/faqs.js';

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#f8fafc] relative overflow-hidden bp-light seam-to-dark">
      <div className="max-w-3xl mx-auto px-safe relative z-10">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 font-bold" style={{ color: '#005A9E' }}>Vanliga frågor</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#020617]">
            Bra att <span className="gradient-text">veta</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-semibold text-[#020617]"
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{faq.q}</span>
                <span className="text-[#0078D4] text-2xl flex-shrink-0 leading-none">
                  {open === i ? '–' : '+'}
                </span>
              </button>
              {open === i && (
                <div id={`faq-panel-${i}`} className="px-6 pb-5 text-[#475569] leading-relaxed">{faq.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
