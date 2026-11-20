import { FiCheck } from 'react-icons/fi'
import styles from './CheckList.module.css'

/**
 * Lista con viñeta de ícono. Útil para objetivos, actividades, requisitos...
 * @param {string[]} items
 * @param {React.ElementType} icon - ícono de la viñeta (por defecto un check)
 * @param {string} color           - color de la viñeta
 */
export default function CheckList({ items = [], icon: Icon = FiCheck, color = 'var(--color-primary)', className = '' }) {
  if (!items.length) return null
  return (
    <ul className={`${styles.list} ${className}`} style={{ '--check-color': color }}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <span className={styles.icon} aria-hidden="true">
            <Icon />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
