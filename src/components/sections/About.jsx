import { FiTarget, FiEye } from 'react-icons/fi'
import { Section, SectionTitle, FeatureCard, Reveal } from '../ui'
import styles from './About.module.css'

/**
 * Sección "Nosotros": imagen + objetivo general, misión/visión y objetivos específicos.
 *
 * @param {string} mision
 * @param {string} vision
 * @param {string} objetivoGeneral
 * @param {string[]} objetivosEspecificos
 * @param {string} imagen
 * @param {string} badge - texto del sello sobre la imagen (opcional)
 */
export default function About({
  id = 'nosotros',
  mision,
  vision,
  objetivoGeneral,
  objetivosEspecificos = [],
  imagen,
  badge,
}) {
  return (
    <Section id={id}>
      {/* ---- Bloque 1: imagen + objetivo general ---- */}
      <div className={styles.intro}>
        <Reveal className={styles.media}>
          <div className={styles.frame}>
            <img src={imagen} alt="Adolescentes del ministerio" loading="lazy" />
          </div>
          {badge && <span className={styles.badge}>{badge}</span>}
        </Reveal>

        <Reveal className={styles.text} delay={150}>
          <SectionTitle eyebrow="Quiénes somos" title="Nuestra" highlight="identidad" align="left" className={styles.title} />
          <h3 className={styles.subheading}>Objetivo general</h3>
          <p className={styles.lead}>{objetivoGeneral}</p>

          {/* Misión y visión */}
          <div className={styles.mv}>
            <FeatureCard icon={FiTarget} title="Misión" text={mision} />
            <FeatureCard icon={FiEye} title="Visión" text={vision} accent="var(--color-secondary)" />
          </div>
        </Reveal>
      </div>

      {/* ---- Bloque 2: objetivos específicos ---- */}
      {objetivosEspecificos.length > 0 && (
        <div className={styles.goals}>
          <SectionTitle eyebrow="Hacia dónde vamos" title="Objetivos" highlight="específicos" />
          <ol className={styles.goalsGrid}>
            {objetivosEspecificos.map((texto, i) => (
              <li key={i}>
                <FeatureCard number={i + 1} text={texto} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  )
}
