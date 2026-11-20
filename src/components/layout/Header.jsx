import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { navLinks, headerCta, socials } from '../../data/site'
import useScrolled from '../../hooks/useScrolled'
import useActiveSection from '../../hooks/useActiveSection'
import { Button, Container, Logo, SocialLinks } from '../ui'
import styles from './Header.module.css'

const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)

  // Bloquea el scroll del body y permite cerrar con Escape cuando el menú móvil está abierto
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <Logo />

        <nav
          id="main-nav"
          className={`${styles.nav} ${open ? styles.open : ''}`}
          aria-label="Menú principal"
        >
          <ul className={styles.links}>
            {navLinks.map(({ label, href }) => {
              const isActive = active === href.replace('#', '')
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={close}
                    className={`${styles.link} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Solo visible dentro del menú móvil */}
          <div className={styles.mobileExtra}>
            <Button href={headerCta.href} onClick={close} fullWidth>
              {headerCta.label}
            </Button>
            <SocialLinks items={socials} />
          </div>
        </nav>

        <div className={styles.actions}>
          <Button href={headerCta.href} size="sm" className={styles.cta}>
            {headerCta.label}
          </Button>
          <button
            className={styles.toggle}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </Container>

      {/* Fondo oscuro detrás del menú móvil */}
      {open && <div className={styles.backdrop} onClick={close} aria-hidden="true" />}
    </header>
  )
}
