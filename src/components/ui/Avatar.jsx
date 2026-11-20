import styles from './Avatar.module.css'

/**
 * Foto pequeña + nombre + texto secundario (ej. responsable de un área).
 * @param {string} src
 * @param {string} name
 * @param {string} caption - texto debajo del nombre (cargo, rol)
 * @param {'sm'|'md'} size
 */
export default function Avatar({ src, name, caption, size = 'sm', className = '' }) {
  return (
    <div className={`${styles.avatar} ${styles[size]} ${className}`}>
      <img src={src} alt="" className={styles.img} loading="lazy" />
      <div className={styles.text}>
        {caption && <span className={styles.caption}>{caption}</span>}
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  )
}
