import useInView from '../../hooks/useInView'
import styles from './ProgressBar.module.css'

/**
 * Barra de progreso.
 * @param {number} value   - 0 a 100
 * @param {string} label   - texto a la izquierda (opcional)
 * @param {string} color
 * @param {'sm'|'md'} size
 * @param {boolean} showValue - muestra el % a la derecha
 */
export default function ProgressBar({ value = 0, label, color = 'var(--color-primary)', size = 'md', showValue = true, className = '' }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  const [ref, inView] = useInView() // la barra se llena al aparecer en pantalla

  return (
    <div ref={ref} className={`${styles.wrapper} ${styles[size]} ${className}`} style={{ '--bar-color': color }}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{pct}%</span>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progreso'}
      >
        <div className={styles.fill} style={{ width: inView ? `${pct}%` : 0 }} />
      </div>
    </div>
  )
}
