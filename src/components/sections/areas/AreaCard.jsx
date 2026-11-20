import { FiArrowRight } from 'react-icons/fi'
import { Card } from '../../ui'
import styles from './AreaCard.module.css'

/**
 * Tarjeta de un área. Toda la tarjeta es un botón que abre el detalle.
 * @param {object} area      - objeto de areas.js
 * @param {number} index     - posición (para el número decorativo)
 * @param {() => void} onOpen
 */
export default function AreaCard({ area, index, onOpen }) {
  const { nombre, icon: Icon, objetivo, imagen, color } = area

  return (
    <Card as="article" padding="none" accent={color} className={styles.card}>
      <div className={styles.media}>
        <img src={imagen} alt="" loading="lazy" />
        <span className={styles.number} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={styles.body}>
        <span className={styles.icon} aria-hidden="true">
          <Icon />
        </span>

        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.text}>{objetivo}</p>

        <div className={styles.footer}>
          {/* El botón cubre toda la tarjeta (ver CSS ::after) */}
          <button type="button" className={styles.more} onClick={onOpen}>
            Ver objetivos y actividades <FiArrowRight aria-hidden="true" />
            <span className="sr-only"> de {nombre}</span>
          </button>
        </div>
      </div>
    </Card>
  )
}
