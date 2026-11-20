import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import styles from './SocialLinks.module.css'

const ICONS = {
  facebook: { icon: FaFacebookF, label: 'Facebook' },
  instagram: { icon: FaInstagram, label: 'Instagram' },
  tiktok: { icon: FaTiktok, label: 'TikTok' },
  youtube: { icon: FaYoutube, label: 'YouTube' },
  whatsapp: { icon: FaWhatsapp, label: 'WhatsApp' },
}

/**
 * Lista de íconos de redes sociales. Oculta las que no tienen url.
 * @param {{network: string, url: string}[]} items
 */
export default function SocialLinks({ items = [], className = '' }) {
  const visible = items.filter((s) => s.url && ICONS[s.network])
  if (!visible.length) return null

  return (
    <ul className={`${styles.list} ${className}`}>
      {visible.map(({ network, url }) => {
        const { icon: Icon, label } = ICONS[network]
        return (
          <li key={network}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={label}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
