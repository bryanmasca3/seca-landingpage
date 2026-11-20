import Container from './Container'
import styles from './Section.module.css'

/**
 * Envoltura estándar de cada sección de la página.
 * Da el espaciado vertical, el fondo y el id para el menú (anclas).
 *
 * @param {string} id               - ancla para el menú (#areas, #equipo...)
 * @param {'default'|'deep'|'surface'} variant - color de fondo
 * @param {'default'|'narrow'|'wide'} containerSize
 * @param {boolean} flush           - quita el padding vertical (útil para el hero)
 */
export default function Section({
  id,
  variant = 'default',
  containerSize = 'default',
  flush = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${flush ? styles.flush : ''} ${className}`}
      {...rest}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
