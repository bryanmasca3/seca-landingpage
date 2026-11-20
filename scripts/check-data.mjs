// Valida la integridad de src/data/ (referencias, ids, conteos).
// Uso: npm run check:data
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })

try {
  const d = await server.ssrLoadModule('/src/data/index.js')
  const errores = []

  // Áreas -> responsable existe
  d.areas.forEach((a) => {
    if (!d.getMiembro(a.responsable)) errores.push(`Área "${a.id}": responsable "${a.responsable}" no existe en equipo.js`)
  })

  // Equipo -> área existe
  d.equipo.forEach((m) => {
    if (m.area && !d.getArea(m.area)) errores.push(`Miembro "${m.id}": área "${m.area}" no existe`)
  })

  // Actividades -> área, encargado, estado y fecha válidos
  d.actividades.forEach((a) => {
    if (!d.getArea(a.area)) errores.push(`Actividad "${a.id}": área "${a.area}" no existe`)
    if (a.encargado && !d.getMiembro(a.encargado)) errores.push(`Actividad "${a.id}": encargado "${a.encargado}" no existe`)
    if (!d.ESTADOS[a.estado]) errores.push(`Actividad "${a.id}": estado "${a.estado}" no definido en estados.js`)
    if (a.fecha && !/^\d{4}-\d{2}-\d{2}$/.test(a.fecha)) errores.push(`Actividad "${a.id}": fecha "${a.fecha}" no es AAAA-MM-DD`)
  })

  // Galería -> la imagen existe en public/
  const { existsSync } = await import('node:fs')
  d.galeria.forEach((g) => {
    if (g.src.startsWith('/') && !existsSync(`public${g.src}`)) errores.push(`Galería "${g.id}": no existe public${g.src}`)
  })

  // Ids duplicados
  for (const [nombre, lista] of [['actividades', d.actividades], ['areas', d.areas], ['equipo', d.equipo], ['galeria', d.galeria]]) {
    const ids = lista.map((x) => x.id)
    const dup = ids.filter((x, i) => ids.indexOf(x) !== i)
    if (dup.length) errores.push(`Ids duplicados en ${nombre}: ${dup.join(', ')}`)
  }

  console.log(`Áreas: ${d.areas.length} | Equipo: ${d.equipo.length} | Años: ${d.anios.join(', ')}`)
  d.anios.forEach((anio) => console.log(`Resumen ${anio}:`, d.getResumen(anio)))
  console.log(`Galería: ${d.galeria.length}`)

  if (errores.length) {
    console.error(`\n✗ ${errores.length} problema(s):\n- ${errores.join('\n- ')}`)
    process.exitCode = 1
  } else {
    console.log('\n✓ Datos consistentes')
  }
} finally {
  await server.close()
}
