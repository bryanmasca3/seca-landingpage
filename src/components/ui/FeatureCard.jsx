import Card from './Card'
import styles from './FeatureCard.module.css'

/**
 * Tarjeta con ícono (o número) + título + texto.
 * Sirve para misión/visión, objetivos, valores, etc.
 *
 * @param {React.ElementType} icon - ícono de react-icons (opcional)
 * @param {number|string} number   - número grande decorativo (opcional)
 * @param {string} accent          - color del acento
 */
export default function FeatureCard({ icon: Icon, number, title, text, accent, children, className = '' }) {
  return (
    <Card accent={accent} className={`${styles.feature} ${className}`}>
      {number != null && (
        <span className={styles.number} aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
      )}
      {Icon && (
        <span className={styles.icon} aria-hidden="true">
          <Icon />
        </span>
      )}
      {title && <h3 className={styles.title}>{title}</h3>}
      {text && <p className={styles.text}>{text}</p>}
      {children}
    </Card>
  )
}
