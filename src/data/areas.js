// ==========================================================================
// ÁREAS DEL MINISTERIO
// Para agregar un área nueva: añade un objeto aquí y su color en tokens.css
// (--area-<id>). Todo lo demás (tarjetas, filtros, badges) se actualiza solo.
// ==========================================================================
import { FiFolder, FiBookOpen } from 'react-icons/fi'
import { FaBullhorn, FaHandsHelping, FaUsers } from 'react-icons/fa'
import { placeholder } from './helpers'

const lista = [
  {
    id: 'administracion',
    nombre: 'Administración',
    icon: FiFolder,
    responsable: 'bryan',
    objetivo: 'Mejorar la organización y el liderazgo del ministerio.',
    objetivos: [
      'Implementar evaluaciones periódicas (cada 2 o 3 meses) para medir el progreso en cada área.',
      'Mantener los documentos administrativos y económicos realizando auditorías de las ofrendas y libros como la asistencia.',
      'Velar por el cuidado de los bienes del ministerio de adolescentes.',
    ],
    actividades: [
      'Evaluaciones trimestrales del avance de cada área (abril, agosto, diciembre).',
      'Auditorías de asistencia y ofrendas 2 veces al año (abril y octubre).',
      'Actualizar el inventario de los bienes del ministerio (enero).',
      'Reuniones semanales los días miércoles.',
      'Estufar el salón.',
    ],
  },
  {
    id: 'evangelismo',
    nombre: 'Evangelismo',
    icon: FaBullhorn,
    responsable: 'yaneth',
    objetivo: 'Alcanzar a nuevos adolescentes con el mensaje del evangelio.',
    objetivos: [
      'Fortalecer la capacitación en evangelismo personal y grupal de la directiva y equipo de apoyo.',
      'Desarrollar nuevas estrategias evangelísticas en colegios, parques y lugares recreativos cercanos.',
      'Organizar eventos deportivos o retos con adolescentes de otras iglesias como medio de conexión y evangelización, integrando a adolescentes no creyentes.',
      'Motivar a los adolescentes a invitar a sus amigos y conocidos a las actividades del ministerio y de la iglesia.',
      'Preparar obras teatrales o musicales evangelísticas con los adolescentes.',
      'Usar las redes sociales para compartir el evangelio (con apoyo de comunicaciones).',
    ],
    actividades: [
      'Noche de talentos / concierto junto con los jóvenes (setiembre).',
      'Mañana deportiva entre ministerios de adolescentes de otras iglesias.',
      'Teatro por Semana Santa en la iglesia (marzo y abril).',
      'Escuela Bíblica de Vacaciones – EBDV (febrero).',
      'Taller de Biblia (1 vez al año).',
      'Reuniones fuera de la iglesia, "Trae a tu amigo" (última semana de cada mes).',
      'Clases según la especialidad de los maestros.',
      'Capacitación para el área evangelística.',
      'Noche de antorchas.',
    ],
  },
  {
    id: 'comunion',
    nombre: 'Comunión',
    icon: FaUsers,
    responsable: 'silvia',
    objetivo:
      'Fortalecer los lazos de unidad, compañerismo y apoyo entre los adolescentes, promoviendo un ambiente de amor y crecimiento.',
    objetivos: [
      'Organizar reuniones mensuales o bimestrales de confraternidad con dinámicas de integración.',
      'Motivar a los adolescentes a participar en los cultos y reuniones de la iglesia.',
      'Involucrar a los padres en actividades especiales para fomentar el trabajo en equipo.',
      'Realizar actividades grupales: deportes, caminatas, paseos, cine teens, aniversarios y cumpleaños.',
    ],
    actividades: [
      'Cine teens bimestral con mensajes reflexivos y comilona de confraternidad.',
      'Celebración de cumpleaños de todos los adolescentes (julio).',
      'Aniversario del ministerio con paseo (mayo).',
      'Tarde de juegos bíblicos vs. jóvenes.',
      'Cena de gala.',
      'Culto unido con los jóvenes.',
    ],
  },
  {
    id: 'discipulado',
    nombre: 'Discipulado',
    icon: FiBookOpen,
    responsable: 'nayda',
    objetivo:
      'Formar adolescentes firmes en la fe, comprometidos con Cristo y preparados para servir en la iglesia y la sociedad.',
    objetivos: [
      'Desarrollar un plan integrado de discipulado y mentoreo para los adolescentes.',
      'Impulsar la lectura bíblica diaria y la oración personal mediante retos mensuales.',
      'Involucrar a los adolescentes en la participación activa de las reuniones.',
      'Brindar acompañamiento espiritual personalizado.',
      'Involucrar a la congregación en la oración y apoyo espiritual.',
    ],
    actividades: [
      'Mentorías personales (1 maestro por cada 2–3 adolescentes) con encuentros mensuales.',
      'Retiro con los jóvenes.',
      'Reunión de oración mensual de maestros (presencial y virtual).',
      'Visitas trimestrales a los adolescentes.',
      'Semana de oración y lectura bíblica (junio y noviembre).',
      'Club de lectura cristiana con un libro devocional.',
      'Talleres con padres: cómo acompañar a un hijo adolescente en la fe.',
    ],
  },
  {
    id: 'accion-social',
    nombre: 'Acción social',
    icon: FaHandsHelping,
    responsable: 'diego',
    objetivo: 'Promover la práctica del amor al prójimo a través de proyectos y actividades de servicio y ayuda social.',
    objetivos: [
      'Participar como ministerio en actividades comunitarias: limpieza, apoyo escolar, visitas a hogares, etc.',
      'Motivar a los adolescentes y a la iglesia a ofrecer su tiempo y talentos para servir a los demás.',
      'Crear alianzas con ministerios de otras iglesias para ampliar el impacto social.',
      'Promover actividades de acción social en nuestro vecindario.',
    ],
    actividades: [
      'Campaña "Limpieza de mi barrio" con murales de esperanza (marzo).',
      'Acción social navideña para niños y adultos mayores (diciembre).',
      'Campaña ecológica: siembra de arbolitos o concientización sobre residuos sólidos, con apoyo de la municipalidad.',
    ],
  },
]

export const areas = lista.map((a) => ({
  ...a,
  color: `var(--area-${a.id})`,
  imagen: a.imagen ?? placeholder(`area-${a.id}`, 800, 600),
}))

export const getArea = (id) => areas.find((a) => a.id === id)
