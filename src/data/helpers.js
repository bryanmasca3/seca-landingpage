// Utilidades compartidas por los archivos de datos.

/**
 * Imagen referencial de picsum.photos. El `seed` hace que siempre salga la misma foto.
 * Cuando tengas la foto real, reemplaza la llamada por la ruta: '/img/mi-foto.webp'
 */
export const placeholder = (seed, width = 800, height = 600) =>
  `https://picsum.photos/seed/seca-${seed}/${width}/${height}`

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic']
const MESES_LARGOS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

/** '2026-02-09' -> { dia: '09', mes: 'feb', mesLargo: 'Febrero', anio: '2026' } */
export function parseFecha(iso) {
  if (!iso) return null
  const [anio, mes, dia] = iso.split('-')
  const m = Number(mes) - 1
  return { dia, mes: MESES[m], mesLargo: MESES_LARGOS[m], anio }
}

/** Texto legible: '09 feb 2026' o '09–13 feb 2026' si hay fecha fin. */
export function formatFecha(inicio, fin) {
  const a = parseFecha(inicio)
  if (!a) return ''
  if (!fin) return `${a.dia} ${a.mes} ${a.anio}`
  const b = parseFecha(fin)
  return a.mes === b.mes ? `${a.dia}–${b.dia} ${a.mes} ${a.anio}` : `${a.dia} ${a.mes} – ${b.dia} ${b.mes} ${b.anio}`
}
