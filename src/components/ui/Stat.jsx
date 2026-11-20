import useCountUp from '../../hooks/useCountUp'
import styles from './Stat.module.css'

/**
 * Número destacado con etiqueta (ej. "21 Actividades").
 * @param {number} value
 * @param {string} label
 * @param {string} suffix - texto tras el número, ej. '+' o '%'
 * @param {string} color  - color de la línea lateral (por defecto el primario)
 * @param {React.ElementType} icon - ícono opcional junto a la etiqueta
 */
export default function Stat({ value, label, suffix = '', color, icon: Icon, className = '' }) {
  const [ref, current] = useCountUp(value)

  return (
    <div ref={ref} className={`${styles.stat} ${className}`} style={color ? { '--stat-color': color } : undefined}>
      <span className={styles.value}>
        {current}
        {suffix}
      </span>
      <span className={styles.label}>
        {Icon && <Icon aria-hidden="true" className={styles.icon} />}
        {label}
      </span>
    </div>
  )
}
