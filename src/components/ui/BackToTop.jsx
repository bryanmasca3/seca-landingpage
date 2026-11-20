import { FiArrowUp } from 'react-icons/fi'
import useScrolled from '../../hooks/useScrolled'
import styles from './BackToTop.module.css'

/** Botón flotante para volver al inicio; aparece al bajar `offset` píxeles. */
export default function BackToTop({ href = '#inicio', offset = 700 }) {
  const visible = useScrolled(offset)

  return (
    <a
      href={href}
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <FiArrowUp aria-hidden="true" />
    </a>
  )
}
