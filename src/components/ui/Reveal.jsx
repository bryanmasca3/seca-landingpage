import useInView from '../../hooks/useInView'
import styles from './Reveal.module.css'

/**
 * Hace aparecer su contenido (fade + subida) cuando entra en pantalla.
 * Si el sistema pide "reducir movimiento", se muestra sin animación.
 *
 * @param {React.ElementType} as - etiqueta a renderizar (div, li, header...)
 * @param {number} delay         - retraso en ms (útil para escalonar listas)
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
