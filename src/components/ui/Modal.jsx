import { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import styles from './Modal.module.css'

/**
 * Ventana modal reutilizable basada en <dialog> nativo
 * (Escape para cerrar, foco atrapado y accesibilidad incluidos).
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {string} title       - título accesible (se muestra si no hay `header`)
 * @param {React.ReactNode} header - cabecera personalizada (opcional; null = sin cabecera)
 * @param {string} accent      - color de la línea superior
 * @param {'md'|'lg'|'xl'} size
 */
export default function Modal({ open, onClose, title, header, accent, size = 'lg', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cerrar al hacer clic en el fondo (fuera de la caja)
  const handleClick = (e) => {
    if (e.target === ref.current) onClose()
  }

  return (
    <dialog
      ref={ref}
      className={`${styles.modal} ${styles[size]}`}
      style={accent ? { '--modal-accent': accent } : undefined}
      onClose={onClose}
      onClick={handleClick}
      aria-label={title}
    >
      {open && (
        <div className={styles.box}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <FiX />
          </button>
          {header !== undefined ? header : title && <h2 className={styles.title}>{title}</h2>}
          <div className={header === null ? styles.contentFlush : styles.content}>{children}</div>
        </div>
      )}
    </dialog>
  )
}
