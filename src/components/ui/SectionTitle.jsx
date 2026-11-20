import Reveal from './Reveal'
import styles from './SectionTitle.module.css'

/**
 * Encabezado de sección: subtítulo pequeño (eyebrow) + título + descripción.
 * `highlight` pinta en verde una parte del título.
 *
 * Ej: <SectionTitle eyebrow="Lo que hacemos" title="Nuestras" highlight="áreas" />
 *
 * @param {'left'|'center'} align
 * @param {'h1'|'h2'|'h3'} as
 */
export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  as: Heading = 'h2',
  className = '',
}) {
  return (
    <Reveal as="header" className={`${styles.wrapper} ${styles[align]} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Heading className={styles.title}>
        {title} {highlight && <span className={styles.highlight}>{highlight}</span>}
      </Heading>
      {description && <p className={styles.description}>{description}</p>}
    </Reveal>
  )
}
