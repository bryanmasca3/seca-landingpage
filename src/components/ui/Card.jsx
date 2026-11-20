import styles from './Card.module.css'

/**
 * Tarjeta base con esquinas recortadas. Las tarjetas específicas
 * (AreaCard, TeamCard, ActivityCard...) se construyen encima de esta.
 *
 * @param {React.ElementType} as   - etiqueta a renderizar (div, article, a, li)
 * @param {string} accent          - color del borde superior / glow (ej. 'var(--area-evangelismo)')
 * @param {boolean} hoverable      - efecto al pasar el mouse
 * @param {'none'|'sm'|'md'} padding
 */
export default function Card({
  as: Tag = 'article',
  accent,
  hoverable = true,
  padding = 'md',
  className = '',
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      className={`${styles.card} ${styles[`p-${padding}`]} ${hoverable ? styles.hoverable : ''} ${className}`}
      style={accent ? { '--card-accent': accent, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Imagen superior de la tarjeta. Usa `ratio` para mantener proporción. */
function CardMedia({ src, alt = '', ratio = '4 / 3' }) {
  return (
    <div className={styles.media} style={{ aspectRatio: ratio }}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

/** Contenido de la tarjeta con padding propio (útil si la tarjeta tiene padding="none"). */
function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>
}

Card.Media = CardMedia
Card.Body = CardBody
