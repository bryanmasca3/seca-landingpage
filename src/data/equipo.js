// ==========================================================================
// EQUIPO / DIRECTIVA
// `area` enlaza con el id de areas.js (null si no tiene área a cargo).
// `foto`: ruta a la foto, ej. '/img/equipo/nayda.webp'.
//         Si es null se muestran las iniciales.
// ==========================================================================

export const equipo = [
  { id: 'nayda', nombre: 'Nayda Taco', cargo: 'Presidente', area: 'discipulado', foto: null },
  { id: 'bryan', nombre: 'Bryan Masca', cargo: 'Secretario', area: 'administracion', foto: null },
  { id: 'yaneth', nombre: 'Yaneth Quispe', cargo: 'Tesorero', area: 'evangelismo', foto: null },
  { id: 'eber', nombre: 'Eber Churata', cargo: 'Apoyo', area: null, foto: null },
  { id: 'silvia', nombre: 'Silvia Vilca', cargo: 'Apoyo', area: 'comunion', foto: null },
  { id: 'diego', nombre: 'Diego Churata', cargo: 'Apoyo', area: 'accion-social', foto: null },
]

export const getMiembro = (id) => equipo.find((m) => m.id === id)
