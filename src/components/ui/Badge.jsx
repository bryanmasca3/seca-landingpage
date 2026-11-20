import styles from './Badge.module.css'

/**
 * Etiqueta pequeña (área, año, estado...).
 * @param {string} color - cualquier color CSS, ej. 'var(--area-comunion)'
 * @param {'soft'|'solid'} variant
 */
export default function Badge({ color = 'var(--color-primary)', variant = 'soft', icon: Icon, children, className = '' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`} style={{ '--badge-color': color }}>
      {Icon && <Icon aria-hidden="true" />}
      {children}
    </span>
  )
}
