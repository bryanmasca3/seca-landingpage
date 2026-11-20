import styles from './Container.module.css'

/**
 * Centra el contenido y limita el ancho máximo.
 * @param {'default'|'narrow'|'wide'} size
 */
export default function Container({ size = 'default', className = '', children, ...rest }) {
  return (
    <div className={`${styles.container} ${styles[size]} ${className}`} {...rest}>
      {children}
    </div>
  )
}
