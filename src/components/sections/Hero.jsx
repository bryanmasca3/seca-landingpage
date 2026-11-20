import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import { Button, Container, Stat } from '../ui'
import styles from './Hero.module.css'

/**
 * Portada principal.
 *
 * @param {string} eyebrow      - texto pequeño superior
 * @param {string} titleTop     - primera línea del título (contorno)
 * @param {string} titleMain    - segunda línea (verde con brillo)
 * @param {string} tagline      - lema bajo el título (opcional)
 * @param {string} text         - párrafo descriptivo
 * @param {string} location     - texto con ícono de ubicación (opcional)
 * @param {string} image        - imagen de fondo
 * @param {{label, href, variant?}[]} actions - botones
 * @param {{value, label, suffix?}[]} stats   - contadores
 */
export default function Hero({
  id = 'inicio',
  eyebrow,
  titleTop,
  titleMain,
  tagline,
  text,
  location,
  image,
  actions = [],
  stats = [],
}) {
  return (
    <section id={id} className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        {image && <img src={image} alt="" fetchPriority="high" />}
      </div>

      {/* formas decorativas */}
      <span className={`${styles.shape} ${styles.shape1}`} aria-hidden="true" />
      <span className={`${styles.shape} ${styles.shape2}`} aria-hidden="true" />
      <span className={`${styles.shape} ${styles.shape3}`} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.content}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

          <h1 className={styles.title}>
            {titleTop && <span className={styles.outline}>{titleTop}</span>}
            <span className={styles.main}>{titleMain}</span>
          </h1>

          {tagline && <p className={styles.tagline}>{tagline}</p>}

          {text && <p className={styles.text}>{text}</p>}

          {location && (
            <p className={styles.location}>
              <FiMapPin aria-hidden="true" /> {location}
            </p>
          )}

          {actions.length > 0 && (
            <div className={styles.actions}>
              {actions.map(({ label, href, variant = 'primary' }, i) => (
                <Button key={href} href={href} variant={variant} size="lg" icon={i === 0 ? FiArrowRight : undefined}>
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>


        {stats.length > 0 && (
          <div className={styles.stats}>
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
