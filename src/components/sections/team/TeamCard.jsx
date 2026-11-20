import styles from './TeamCard.module.css'

const iniciales = (nombre) =>
  nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

/**
 * Tarjeta de un integrante del equipo: foto (o iniciales) + nombre.
 * El color de acento sale del área del miembro (si tiene), pero el área y el cargo
 * no se muestran por decisión del usuario.
 * @param {object} miembro - { nombre, foto, area } con `area` resuelta a objeto (o null)
 */
export default function TeamCard({ miembro }) {
  const { nombre, foto, area } = miembro
  const accent = area?.color ?? 'var(--color-primary)'

  return (
    <article className={styles.card} style={{ '--accent': accent }}>
      <div className={styles.media}>
        {foto ? (
          <img src={foto} alt={`Foto de ${nombre}`} loading="lazy" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <span>{iniciales(nombre)}</span>
          </div>
        )}
      </div>

      <div className={styles.plate}>
        <h3 className={styles.name}>{nombre}</h3>
      </div>
    </article>
  )
}
