import { FiUsers } from 'react-icons/fi'
import { Container, SectionTitle, Button, SocialLinks, Reveal } from '../ui'
import styles from './Contact.module.css'

/**
 * Sección final "Únete": mapa a todo el ancho + franja de invitación superpuesta
 * en su borde inferior (con laterales en diagonal que bajan hacia el footer).
 *
 * @param {string} eyebrow, title, highlight, description - encabezado de sección (SectionTitle)
 * @param {{title, highlight?, text?}} box             - textos de la franja verde
 * @param {string} mapEmbed                           - URL de Google Maps "embed"
 * @param {string} image                              - fondo alternativo si no hay mapa
 * @param {React.ElementType} icon                    - ícono del recuadro (por defecto FiUsers)
 * @param {{icon, label, value, href?}[]} info        - datos (horario, dirección...). Los vacíos no se muestran.
 * @param {{label, href, icon?, external?}[]} actions - botones
 * @param {{network, url}[]} socials
 */
export default function Contact({
  id = 'contacto',
  eyebrow,
  title,
  highlight,
  description,
  box = {},
  mapEmbed,
  image,
  icon: Icon = FiUsers,
  info = [],
  actions = [],
  socials = [],
}) {
  const datos = info.filter((i) => i.value)

  return (
    <section id={id} className={styles.contact}>
      {/* ---- Encabezado (igual que el resto de secciones) ---- */}
      <Container className={styles.header}>
        <SectionTitle eyebrow={eyebrow} title={title} highlight={highlight} description={description} />
      </Container>

      {/* ---- Mapa / fondo a todo el ancho ---- */}
      <div className={styles.backdrop}>
        {mapEmbed ? (
          <iframe
            className={styles.map}
            src={mapEmbed}
            title="Ubicación en Google Maps"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          image && <img className={styles.image} src={image} alt="" loading="lazy" />
        )}
      </div>

      {/* ---- Franja de invitación ---- */}
      <div className={styles.band}>
        <Container>
          <Reveal className={styles.box}>
            <span className={styles.icon} aria-hidden="true">
              <Icon />
            </span>

            <div className={styles.text}>
              {box.title && (
                <h3 className={styles.title}>
                  {box.title} {box.highlight && <span className={styles.highlight}>{box.highlight}</span>}
                </h3>
              )}
              {box.text && <p className={styles.lead}>{box.text}</p>}
            </div>

            <div className={styles.side}>
              {datos.length > 0 && (
                <ul className={styles.info}>
                  {datos.map(({ icon: ItemIcon, label, value, href }) => (
                    <li key={label} className={styles.infoItem}>
                      <ItemIcon aria-hidden="true" className={styles.infoIcon} />
                      <div>
                        <span className={styles.infoLabel}>{label}</span>
                        {href ? (
                          <a href={href} className={styles.infoValue}>{value}</a>
                        ) : (
                          <span className={styles.infoValue}>{value}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {actions.length > 0 && (
                <div className={styles.actions}>
                  {actions.map(({ label, href, icon, external }) => (
                    <Button key={label} href={href} icon={icon} iconPosition="left" external={external} variant="dark">
                      {label}
                    </Button>
                  ))}
                </div>
              )}

              <SocialLinks items={socials} className={styles.socials} />
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
