import { FiMapPin, FiClock, FiMail, FiPhone } from 'react-icons/fi'
import { site, navLinks, contact, socials } from '../../data/site'
import { Container, Logo, SocialLinks } from '../ui'
import styles from './Footer.module.css'

// Solo se muestran los datos de contacto que tengan valor en site.js
const contactItems = [
  { icon: FiMapPin, value: contact.address },
  { icon: FiClock, value: contact.schedule },
  { icon: FiMail, value: contact.email, href: contact.email && `mailto:${contact.email}` },
  { icon: FiPhone, value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s/g, '')}` },
].filter((item) => item.value)

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.about}>
            <Logo variant="full" />
            <p>{site.description}</p>
            <SocialLinks items={socials} />
          </div>

          <div>
            <h2 className={styles.heading}>Enlaces</h2>
            <ul className={styles.list}>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.link}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {contactItems.length > 0 && (
            <div>
              <h2 className={styles.heading}>Contacto</h2>
              <ul className={styles.list}>
                {contactItems.map(({ icon: Icon, value, href }) => (
                  <li key={value} className={styles.contactItem}>
                    <Icon aria-hidden="true" className={styles.contactIcon} />
                    {href ? <a href={href} className={styles.link}>{value}</a> : <span>{value}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>

      <div className={styles.bottom}>
        <Container className={styles.bottomInner}>
          <p>
            © {year} <span className="text-primary">{site.name}</span> · {site.church}
          </p>
          <p>{site.fullName}</p>
        </Container>
      </div>
    </footer>
  )
}
