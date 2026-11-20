import { useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Modal from './Modal'
import styles from './Lightbox.module.css'

/**
 * Visor de imágenes ampliadas con navegación (flechas, teclado ← →).
 *
 * @param {{src, alt, titulo?}[]} images
 * @param {number|null} index  - imagen abierta (null = cerrado)
 * @param {(i: number|null) => void} onChange
 */
export default function Lightbox({ images = [], index, onChange }) {
  const open = index != null && images[index]
  const total = images.length
  const prev = () => onChange((index - 1 + total) % total)
  const next = () => onChange((index + 1) % total)

  // Navegación con teclado mientras está abierto
  useEffect(() => {
    if (index == null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % total)
      if (e.key === 'ArrowLeft') onChange((index - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, onChange])

  const img = open ? images[index] : null

  return (
    <Modal open={Boolean(open)} onClose={() => onChange(null)} title={img?.titulo ?? 'Imagen ampliada'} size="xl" header={null}>
      {img && (
        <figure className={styles.figure}>
          <div className={styles.stage}>
            {/* key fuerza la animación de entrada al cambiar de imagen */}
            <img key={img.src} src={img.src} alt={img.alt} className={styles.img} />

            {total > 1 && (
              <>
                <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={prev} aria-label="Imagen anterior">
                  <FiChevronLeft />
                </button>
                <button type="button" className={`${styles.nav} ${styles.next}`} onClick={next} aria-label="Imagen siguiente">
                  <FiChevronRight />
                </button>
              </>
            )}
          </div>

          <figcaption className={styles.caption}>
            <span>{img.titulo ?? img.alt}</span>
            {total > 1 && (
              <span className={styles.counter}>
                {index + 1} / {total}
              </span>
            )}
          </figcaption>
        </figure>
      )}
    </Modal>
  )
}
