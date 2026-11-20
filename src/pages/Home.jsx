// Página principal: aquí se "cablean" los datos con las secciones.
// Las secciones no conocen los datos; solo reciben props.
import { FiMapPin, FiClock, FiMail, FiPhone, FiNavigation } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import {
  site, cta, contact, socials, identidad, areas, equipo, actividades, anios, ESTADOS, galeria, getArea, getResumen,
} from '../data'
import { Hero, About, Areas, Plan, Team, Gallery, Contact } from '../components/sections'

const ANIO = 2026
const resumen = getResumen(ANIO)

// Miembros con el área resuelta (objeto con nombre, color e ícono)
const miembros = equipo.map((m) => ({ ...m, area: m.area ? getArea(m.area) : null }))

// Datos de contacto (los vacíos se ocultan solos)
const contactInfo = [
  { icon: FiClock, label: 'Horario', value: contact.schedule },
  { icon: FiMapPin, label: 'Dirección', value: contact.address },
  { icon: FiMail, label: 'Correo', value: contact.email, href: contact.email && `mailto:${contact.email}` },
  { icon: FiPhone, label: 'Teléfono', value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s/g, '')}` },
]

const whatsapp = socials.find((s) => s.network === 'whatsapp')?.url
const contactActions = [
  contact.mapUrl && { label: 'Cómo llegar', href: contact.mapUrl, icon: FiNavigation, external: true },
  whatsapp && { label: 'Escríbenos', href: whatsapp, icon: FaWhatsapp, external: true, variant: 'outline' },
].filter(Boolean)

export default function Home() {
  return (
    <>
      <Hero
        eyebrow={`${site.church} · ${site.period}`}
        titleTop="Ministerio de"
        titleMain="Adolescentes"
        tagline={site.tagline}
        text={site.description}
        location={contact.address}
        image={site.heroImage}
        actions={[
          { label: 'Ver plan de trabajo', href: '#plan' },
          { label: 'Conócenos', href: '#nosotros', variant: 'outline' },
        ]}
        stats={[
          { value: resumen.total, label: 'Actividades' },
          { value: resumen.realizado ?? 0, label: 'Realizadas' },
          { value: areas.length, label: 'Áreas' },
          { value: equipo.length, label: 'Líderes' },
        ]}
      />

      {/* Sin objetivos específicos: el usuario pidió no mostrarlos (siguen en identidad.js) */}
      <About
        mision={identidad.mision}
        vision={identidad.vision}
        objetivoGeneral={identidad.objetivoGeneral}
        imagen={identidad.imagen}
        badge={site.name}
      />

      <Areas
        areas={areas}
        description="Cinco áreas de trabajo, cada una con objetivos claros y actividades durante el año."
      />

      <Plan
        actividades={actividades}
        estados={ESTADOS}
        anios={anios}
        description="Así avanzó nuestro cronograma: lo planificado y lo realizado."
      />

      <Team
        miembros={miembros}
        description={`Los líderes que acompañan al ministerio durante el periodo ${site.period}.`}
      />

      <Gallery fotos={galeria} description="Algunos momentos que compartimos como ministerio." />

      <Contact {...cta} mapEmbed={contact.mapEmbed} info={contactInfo} actions={contactActions} socials={socials} />
    </>
  )
}
