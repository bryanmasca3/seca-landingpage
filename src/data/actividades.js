// ==========================================================================
// ACTIVIDADES (cronograma 2026)
//
// Campos:
//   id          identificador único (sin espacios)
//   anio        año al que pertenece
//   fecha       'AAAA-MM-DD'
//   fechaFin    opcional, para actividades de varios días
//   titulo      nombre de la actividad
//   area        id de areas.js
//   encargado   id de equipo.js (opcional)
//   estado      realizado | no-realizado | reprogramado  (ver estados.js)
//   nota        comentario opcional
//   imagen      ruta de la foto (opcional; si falta se usa una referencial)
//
// Para añadir una actividad nueva solo agrega un objeto a la lista.
// ==========================================================================
import { placeholder } from './helpers'

const lista = [
  // ------------------------------ 2026 ------------------------------
  // Enero
  { id: 'inventario-2026', anio: 2026, fecha: '2026-01-11', titulo: 'Actualizar el inventario de los bienes del ministerio', area: 'administracion', estado: 'realizado' },
  { id: 'cine-teens-ene-2026', anio: 2026, fecha: '2026-01-18', titulo: 'Cine teens', area: 'comunion', estado: 'realizado' },
  { id: 'capacitacion-evangelistica-2026', anio: 2026, fecha: '2026-01-24', titulo: 'Capacitación para el área evangelística', area: 'evangelismo', estado: 'no-realizado' },
  { id: 'fuera-iglesia-ene-2026', anio: 2026, fecha: '2026-01-25', titulo: 'Reunión de adolescentes fuera de la iglesia', area: 'evangelismo', estado: 'realizado' },

  // Febrero
  { id: 'visitas-feb-2026', anio: 2026, fecha: '2026-02-02', titulo: 'Visita trimestral a los adolescentes', area: 'discipulado', estado: 'realizado' },
  { id: 'ebdv-2026', anio: 2026, fecha: '2026-02-09', fechaFin: '2026-02-13', titulo: 'Escuela Bíblica de Vacaciones (EBDV)', area: 'evangelismo', estado: 'realizado' },
  { id: 'capacitacion-evangelizacion-2026', anio: 2026, fecha: '2026-02-28', titulo: 'Capacitación de evangelización', area: 'evangelismo', estado: 'no-realizado' },

  // Marzo
  { id: 'limpieza-barrio-2026', anio: 2026, fecha: '2026-03-08', titulo: 'Campaña "Limpieza de mi barrio" con murales de esperanza', area: 'accion-social', encargado: 'silvia', estado: 'no-realizado' },
  { id: 'fuera-iglesia-mar-2026', anio: 2026, fecha: '2026-03-29', titulo: 'Reunión de adolescentes fuera de la iglesia', area: 'evangelismo', estado: 'no-realizado' },

  // Abril
  { id: 'teatro-semana-santa-2026', anio: 2026, fecha: '2026-04-05', titulo: 'Teatro por Semana Santa en la iglesia', area: 'evangelismo', estado: 'no-realizado' },
  { id: 'noche-antorchas-2026', anio: 2026, fecha: '2026-04-18', titulo: 'Noche de antorchas', area: 'evangelismo', encargado: 'bryan', estado: 'realizado', nota: 'Con jóvenes, niños e iglesia.' },
  { id: 'evaluacion-abr-2026', anio: 2026, fecha: '2026-04-26', titulo: 'Evaluación trimestral de áreas y auditoría de asistencia y ofrendas', area: 'administracion', estado: 'realizado' },

  // Mayo
  { id: 'visitas-may-2026', anio: 2026, fecha: '2026-05-02', titulo: 'Visita trimestral a los adolescentes', area: 'discipulado', estado: 'realizado' },
  { id: 'aniversario-2026', anio: 2026, fecha: '2026-05-03', titulo: 'Aniversario del ministerio con paseo', area: 'comunion', estado: 'realizado', nota: 'Salida al mall y comida.' },
  { id: 'cine-teens-may-2026', anio: 2026, fecha: '2026-05-31', titulo: 'Cine teens', area: 'comunion', estado: 'no-realizado' },

  // Junio
  { id: 'culto-unido-2026', anio: 2026, fecha: '2026-06-14', titulo: 'Culto unido con los jóvenes', area: 'comunion', estado: 'no-realizado', nota: 'No se pudo porque los adolescentes tenían actividad en la mañana.' },
  { id: 'reto-oracion-2026', anio: 2026, fecha: '2026-06-28', titulo: 'Reto de oración y lectura bíblica', area: 'discipulado', estado: 'no-realizado' },

  // Julio
  { id: 'cine-teens-jul-2026', anio: 2026, fecha: '2026-07-19', titulo: 'Cine teens', area: 'comunion', estado: 'realizado' },
  { id: 'cumpleanos-2026', anio: 2026, fecha: '2026-07-26', titulo: 'Celebración de cumpleaños', area: 'comunion', estado: 'reprogramado' },

  // Agosto
  { id: 'visitas-ago-2026', anio: 2026, fecha: '2026-08-01', titulo: 'Visita trimestral a los adolescentes', area: 'discipulado', encargado: 'diego', estado: 'realizado' },
  { id: 'siembra-arbolitos-2026', anio: 2026, fecha: '2026-08-03', titulo: 'Campaña ecológica: siembra de arbolitos', area: 'accion-social', estado: 'reprogramado', nota: 'Se reprogramó para el próximo año.' },
]

export const actividades = lista.map((a) => ({
  ...a,
  imagen: a.imagen ?? placeholder(a.id, 800, 600),
}))

// ---------------- Consultas reutilizables ----------------

/** Años disponibles, ordenados (ej. [2026, 2027]) */
export const anios = [...new Set(actividades.map((a) => a.anio))].sort()

export const getActividades = ({ anio, area, estado } = {}) =>
  actividades.filter(
    (a) => (!anio || a.anio === anio) && (!area || a.area === area) && (!estado || a.estado === estado),
  )

/** Conteo por estado de un año: { realizado: 11, 'no-realizado': 8, ... , total } */
export function getResumen(anio) {
  const items = getActividades({ anio })
  return items.reduce(
    (acc, a) => ({ ...acc, [a.estado]: (acc[a.estado] ?? 0) + 1 }),
    { total: items.length },
  )
}
