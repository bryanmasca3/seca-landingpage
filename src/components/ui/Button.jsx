import styles from './Button.module.css'

/**
 * Botón reutilizable. Se renderiza como <a> si recibe `href`, si no como <button>.
 *
 * @param {'primary'|'outline'|'dark'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {React.ElementType} icon  - ícono de react-icons (opcional)
 * @param {'left'|'right'} iconPosition
 * @param {boolean} external        - abre el enlace en otra pestaña
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  external = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    className,
  ].join(' ')

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon aria-hidden="true" className={styles.icon} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon aria-hidden="true" className={styles.icon} />}
    </>
  )

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
