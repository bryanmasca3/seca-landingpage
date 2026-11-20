import Header from './Header'
import Footer from './Footer'
import { BackToTop } from '../ui'

/** Estructura común de todas las páginas: Header + contenido + Footer. */
export default function Layout({ children }) {
  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
