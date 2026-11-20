// ==========================================================================
// DATOS GENERALES DEL SITIO
// Edita aquí nombre, menú, contacto y redes. Los componentes solo leen esto.
// Los valores marcados con "PENDIENTE" son provisionales.
// ==========================================================================

export const site = {
  name: 'SECA',
  fullName: 'Ministerio de Adolescentes',
  church: 'IEP San Martín', // Iglesia Evangélica Peruana San Martín – Cayma
  period: '2026 – 2027',
  tagline: 'Living for Christ', // lema del logo (en la imagen dice "Crist"; aquí va bien escrito)
  description:
    'Ministerio de adolescentes que busca crecer en una relación cercana con Jesús, vivir en comunión y servir a su comunidad.',
  logo: '/img/logo-mark.webp', // símbolo "A" (header, favicon). null = solo texto
  logoFull: '/img/logo.webp', // logo completo SIN el lema (el lema se escribe como texto)
  heroImage: '/img/grupal.webp',
}

// Menú principal: `href` apunta al `id` de cada sección de la página.
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Áreas', href: '#areas' },
  { label: 'Plan de trabajo', href: '#plan' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Galería', href: '#galeria' },
]

// Botón destacado del header
export const headerCta = { label: 'Únete', href: '#contacto' }

// Sección final "Únete" (llamado a participar)
export const cta = {
  // Encabezado de la sección (mismo estilo que las demás)
  eyebrow: 'Únete',
  title: 'Ven y sé',
  highlight: 'parte',
  description: 'Crece en la fe, comparte y sirve junto a otros adolescentes. Aquí te mostramos dónde encontrarnos.',
  // Franja verde sobre el mapa
  box: {
    title: 'Te esperamos',
    highlight: 'cada domingo',
    text: '¡Trae a un amigo y vive la fe con nosotros!',
  },
}

// Nombre del templo tal como figura en Google Maps (usado por "Cómo llegar")
const mapQuery = encodeURIComponent('Iglesia Evangélica Peruana San Martin Cayma, Arequipa')

export const contact = {
  address: 'Asoc. San Martín de Porras Mz. "Ñ", Lt. 8 – Cayma – Arequipa',
  // Horario al que se invita a los adolescentes (NO la reunión del equipo de los miércoles)
  schedule: 'Domingos de 8:30 a 10:00 a.\u00A0m.', // \u00A0 = espacio que no se corta (evita 'a.' y 'm.' en líneas distintas)
  email: '', // PENDIENTE (vacío = no se muestra)
  phone: '', // PENDIENTE (vacío = no se muestra)
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  // Mapa incrustado: URL del src="..." de Google Maps → Compartir → "Insertar un mapa"
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61255.270489882896!2d-71.58664631267077!3d-16.35079866733564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9142499474b7a66f%3A0x7ccccba4438f3843!2sIglesia%20Evang%C3%A9lica%20Peruana%20San%20Martin%20Cayma!5e0!3m2!1sen!2spe!4v1795140928669!5m2!1sen!2spe',
}

// `network` debe ser una de: facebook, instagram, tiktok, youtube, whatsapp
// Deja `url` vacío para ocultar la red.
export const socials = [
  { network: 'facebook', url: '' },
  { network: 'instagram', url: '' },
  { network: 'tiktok', url: '' },
  { network: 'youtube', url: '' },
  { network: 'whatsapp', url: '' },
]
