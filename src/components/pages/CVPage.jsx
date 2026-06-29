import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, ArrowRight } from '../icons.jsx';
import cvData from '../../data/cv-data.json';

const experiences = cvData.experience;
const education = cvData.education;
const courses = cvData.courses;
const projects = cvData.projects;

export default function CVPage() {
  return (
    <>
      {/* Hero / Profile */}
      <section style={{ paddingTop: '4.5rem', paddingBottom: '5rem', backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(21,97,154,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 80%, rgba(21,97,154,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            {/* Porträttkort av Andreas (ersätter tidigare AD-logga) */}
            <div style={{
              width: 'min(380px, 82vw)',
              margin: '0 auto 1.5rem',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '3px solid #0078D4',
              boxShadow: '0 24px 60px -16px rgba(0,120,212,0.55), 0 0 34px rgba(0,120,212,0.22)',
              aspectRatio: '4 / 5',
              background: '#0b1220',
            }}>
              <img
                src={import.meta.env.BASE_URL + 'andreas-portratt.jpg'}
                alt="Andreas Dahlgren"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
              color: '#fff', lineHeight: 0.95, marginBottom: '0.6rem', letterSpacing: '0.01em',
            }}>
              {cvData.name}
            </h2>
            <p style={{ color: '#8aa9c4', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Grundare &amp; Projektledare · AD Byggprojekt Stockholm AB
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              {cvData.webBornLine}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
          >
            <a href={import.meta.env.BASE_URL + 'kontakt'} className="btn-primary" style={{ padding: '1rem clamp(1.25rem, 5vw, 2.5rem)', fontSize: '1rem', maxWidth: '100%', boxSizing: 'border-box' }}>
              Kontakta mig
              <ArrowRight size={18} />
            </a>
            <a href={import.meta.env.BASE_URL + 'cv-andreas-dahlgren.pdf'} download className="btn-outline" style={{ padding: '1rem clamp(1.25rem, 5vw, 2.5rem)', fontSize: '1rem', maxWidth: '100%', boxSizing: 'border-box' }}>
              <Download size={18} />
              Ladda ner CV
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
          >
            <div style={{
              width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
              background: 'rgba(21, 97, 154, 0.15)', color: '#4f97cc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Briefcase size={22} />
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', letterSpacing: '0.03em',
            }}>
              Arbetslivserfarenhet
            </h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{ position: 'absolute', left: '1.5rem', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, #15619A, rgba(21,97,154,0.1))' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{ position: 'relative', paddingLeft: '3.5rem' }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: '1.125rem', top: '1.5rem',
                    width: '0.75rem', height: '0.75rem', borderRadius: '50%',
                    background: '#15619A', border: '3px solid #0a0f1a',
                    boxShadow: '0 0 0 3px rgba(21,97,154,0.3)',
                  }} />
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '1rem',
                    padding: '1.75rem',
                    transition: 'border-color 0.3s ease',
                  }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{exp.role}</h3>
                      <span style={{
                        fontSize: '0.8125rem', fontWeight: 600, color: '#4f97cc',
                        background: 'rgba(21, 97, 154, 0.12)', padding: '0.25rem 0.875rem', borderRadius: '9999px',
                      }}>{exp.period}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>{exp.company}</p>
                    <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.9375rem' }}>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', backgroundColor: 'transparent', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(21,97,154,0.1) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
          >
            <div style={{
              width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
              background: 'rgba(21, 97, 154, 0.15)', color: '#4f97cc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Briefcase size={22} />
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', letterSpacing: '0.03em',
            }}>
              Uppdragsöversikt
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, flex: 1 }}>{proj.name}</h3>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600, color: '#4f97cc',
                    background: 'rgba(21, 97, 154, 0.12)', padding: '0.2rem 0.625rem', borderRadius: '9999px',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>{proj.period}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 1rem', marginBottom: '0.75rem' }}>
                  {proj.client !== '—' && (
                    <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                      <span style={{ color: '#64748b' }}>Beställare:</span> {proj.client}
                    </span>
                  )}
                  <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                    <span style={{ color: '#64748b' }}>Roll:</span> {proj.role}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.6 }}>{proj.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Courses – sammanhållen kort-modul */}
      <section className="bp-light" style={{ paddingTop: '5rem', paddingBottom: '5rem', backgroundColor: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', background: 'rgba(21, 97, 154, 0.04)', borderRadius: '50%', filter: 'blur(80px)', transform: 'translate(30%, -30%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: '1.5rem',
              boxShadow: '0 10px 30px -12px rgba(2,6,23,0.12)',
              padding: 'clamp(1.5rem, 4vw, 2.75rem)',
            }}
          >
            {/* Utbildning */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{
                width: '3rem', height: '3rem', borderRadius: '0.75rem',
                background: 'rgba(21, 97, 154, 0.1)', color: '#15619A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <GraduationCap size={22} />
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', system-ui, sans-serif",
                fontSize: '2rem', color: '#020617', letterSpacing: '0.03em',
              }}>Utbildning</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
              {education.map((edu, i) => (
                <div key={i} style={{
                  background: '#f8fafc', border: '1px solid #e2e8f0',
                  borderRadius: '0.875rem', padding: '1.25rem',
                }}>
                  <span style={{
                    fontSize: '0.8125rem', fontWeight: 600, color: '#15619A',
                    background: 'rgba(21, 97, 154, 0.08)', padding: '0.25rem 0.75rem', borderRadius: '9999px',
                  }}>{edu.period}</span>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#020617', marginTop: '0.75rem', marginBottom: '0.25rem' }}>{edu.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>{edu.school}</p>
                </div>
              ))}
            </div>

            {/* Avdelare */}
            <div style={{ height: '1px', background: '#e2e8f0', margin: 'clamp(2rem, 5vw, 2.75rem) 0' }} />

            {/* Kurser & certifieringar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{
                width: '3rem', height: '3rem', borderRadius: '0.75rem',
                background: 'rgba(21, 97, 154, 0.1)', color: '#15619A',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Award size={22} />
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', system-ui, sans-serif",
                fontSize: '2rem', color: '#020617', letterSpacing: '0.03em',
              }}>Kurser &amp; certifieringar</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.875rem 2rem' }}>
              {courses.map((course, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '0.5rem', height: '0.5rem', borderRadius: '50%',
                    background: '#15619A', marginTop: '0.5rem', flexShrink: 0,
                  }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#334155' }}>{course.name}</span>
                    {course.organizer && course.organizer !== '—' && (
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>{course.organizer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: '#020617', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'rgba(21, 97, 154, 0.12)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontFamily: "'Bebas Neue', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem', letterSpacing: '0.02em',
            }}>
              Vill du veta <span className="gradient-text-hero">mer</span>?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem', maxWidth: '28rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Hör av dig så berättar jag mer om min bakgrund och hur jag kan hjälpa dig med ditt projekt.
            </p>
            <a href={import.meta.env.BASE_URL + 'kontakt'} className="btn-primary" style={{ padding: '1.125rem clamp(1.5rem, 6vw, 3rem)', fontSize: '1.0625rem', maxWidth: '100%', boxSizing: 'border-box' }}>
              Kontakta AD Byggprojekt
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
