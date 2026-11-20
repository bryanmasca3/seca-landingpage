import { site } from '../../data/site'
import styles from './Logo.module.css'

/**
 * Logo del sitio.
 *  - variant "mark": símbolo "A" + nombre en texto (header). Sin imagen → letra inicial.
 *  - variant "full": logo completo + lema en texto (footer).
 *
 * @param {'mark'|'full'} variant
 * @param {boolean} showTagline - (solo "full") muestra el lema debajo
 */
export default function Logo({ href = '#inicio', variant = 'mark', showTagline = true, className = '' }) {
  if (variant === 'full' && site.logoFull) {
    return (
      <a href={href} className={`${styles.full} ${className}`} aria-label={`${site.fullName} - ir al inicio`}>
        <img src={site.logoFull} alt={site.fullName} className={styles.fullImg} />
        {showTagline && site.tagline && <span className={styles.tagline}>{site.tagline}</span>}
      </a>
    )
  }

  return (
    <a href={href} className={`${styles.logo} ${className}`} aria-label={`${site.name} - ir al inicio`}>
      {site.logo ? (
        <img src={site.logo} alt="" className={styles.mark} />
      ) : (
        <span className={styles.letter} aria-hidden="true">{site.name.charAt(0)}</span>
      )}
      <span className={styles.text}>{site.name}</span>
    </a>
  )
}
