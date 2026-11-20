import { useState } from 'react'
import { FiMaximize2 } from 'react-icons/fi'
import { Section, SectionTitle, Lightbox, Reveal } from '../../ui'
import styles from './Gallery.module.css'

/**
 * Galería en mosaico; al hacer clic se amplía la foto (Lightbox).
 * @param {{id, src, alt, titulo?, layout?: 'large'|'wide'|'tall'}[]} fotos
 */
export default function Gallery({
  id = 'galeria',
  fotos = [],
  eyebrow = 'Momentos',
  title = 'Nuestra',
  highlight = 'galería',
  description,
}) {
  const [abierta, setAbierta] = useState(null)

  return (
    <Section id={id}>
      <SectionTitle eyebrow={eyebrow} title={title} highlight={highlight} description={description} />

      <ul className={styles.grid}>
        {fotos.map((f, i) => (
          <Reveal as="li" key={f.id} className={`${styles.item} ${f.layout ? styles[f.layout] : ''}`} delay={i * 70}>
            <button type="button" className={styles.button} onClick={() => setAbierta(i)}>
              <img src={f.src} alt={f.alt} loading="lazy" className={styles.img} />
              <span className={styles.overlay} aria-hidden="true">
                <span className={styles.zoom}>
                  <FiMaximize2 />
                </span>
                {f.titulo && <span className={styles.title}>{f.titulo}</span>}
              </span>
              <span className="sr-only">Ampliar foto: {f.titulo ?? f.alt}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Lightbox images={fotos} index={abierta} onChange={setAbierta} />
    </Section>
  )
}
