import { useMemo, useState } from 'react'
import { FiFilter, FiInbox } from 'react-icons/fi'
import { Section, SectionTitle, FilterChips, Button } from '../../ui'
import { parseFecha } from '../../../data/helpers'
import ActivityItem from './ActivityItem'
import styles from './Timeline.module.css'

/**
 * [SIN USO ACTUALMENTE] Versión detallada del plan: línea de tiempo por mes con filtros.
 * Se reemplazó por Plan.jsx (contadores). Se conserva por si se quiere volver a mostrar el detalle.
 *
 * @param {object[]} actividades - lista completa (todas los años)
 * @param {object[]} areas
 * @param {object}   estados     - mapa { id: {label, color} }
 * @param {number[]} anios
 * @param {string|null} area     - filtro de área controlado desde fuera (opcional)
 * @param {(id) => void} onAreaChange
 */
export default function Timeline({
  id = 'plan',
  actividades = [],
  areas = [],
  estados = {},
  anios = [],
  area: areaProp,
  onAreaChange,
  eyebrow = 'Cronograma',
  title = 'Plan de',
  highlight = 'trabajo',
  description,
}) {
  const [anio, setAnio] = useState(anios[anios.length - 1])
  const [estado, setEstado] = useState(null)
  // El filtro de área puede venir controlado (desde la sección Áreas) o ser interno
  const [areaLocal, setAreaLocal] = useState(null)
  const area = areaProp !== undefined ? areaProp : areaLocal
  const setArea = onAreaChange ?? setAreaLocal

  const areaMap = useMemo(() => Object.fromEntries(areas.map((a) => [a.id, a])), [areas])

  const delAnio = useMemo(() => actividades.filter((a) => a.anio === anio), [actividades, anio])

  // Conteos para los chips (cada filtro cuenta según el otro filtro activo)
  const countBy = (list, key) => list.reduce((acc, a) => ({ ...acc, [a[key]]: (acc[a[key]] ?? 0) + 1 }), {})
  const porArea = countBy(estado ? delAnio.filter((a) => a.estado === estado) : delAnio, 'area')
  const porEstado = countBy(area ? delAnio.filter((a) => a.area === area) : delAnio, 'estado')

  const filtradas = delAnio
    .filter((a) => (!area || a.area === area) && (!estado || a.estado === estado))
    .sort((a, b) => (a.fecha ?? '').localeCompare(b.fecha ?? ''))

  // Agrupar por mes
  const meses = filtradas.reduce((acc, a) => {
    const key = a.fecha ? a.fecha.slice(0, 7) : 'sin-fecha'
    const last = acc[acc.length - 1]
    if (last?.key === key) last.items.push(a)
    else acc.push({ key, label: a.fecha ? parseFecha(a.fecha).mesLargo : 'Sin fecha', items: [a] })
    return acc
  }, [])

  const areaOptions = [
    { value: null, label: 'Todas', count: Object.values(porArea).reduce((s, n) => s + n, 0) },
    ...areas.map((a) => ({ value: a.id, label: a.nombre, color: a.color, count: porArea[a.id] ?? 0 })),
  ]

  const estadoOptions = [
    { value: null, label: 'Todos', count: Object.values(porEstado).reduce((s, n) => s + n, 0) },
    ...Object.entries(estados)
      .filter(([key]) => porEstado[key] || key === estado)
      .map(([key, e]) => ({ value: key, label: e.label, color: e.color, count: porEstado[key] ?? 0 })),
  ]

  const hayFiltros = area || estado
  const limpiar = () => {
    setArea(null)
    setEstado(null)
  }

  return (
    <Section id={id}>
      <SectionTitle eyebrow={eyebrow} title={title} highlight={highlight} description={description} />

      {/* ---- Filtros ---- */}
      <div className={styles.filters}>
        {anios.length > 1 && (
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Año</span>
            <FilterChips
              label="Filtrar por año"
              options={anios.map((y) => ({ value: y, label: String(y) }))}
              value={anio}
              onChange={setAnio}
            />
          </div>
        )}
        <div className={styles.filterRow}>
          <span className={styles.filterLabel}>
            <FiFilter aria-hidden="true" /> Área
          </span>
          <FilterChips label="Filtrar por área" options={areaOptions} value={area} onChange={setArea} />
        </div>
        <div className={styles.filterRow}>
          <span className={styles.filterLabel}>
            <FiFilter aria-hidden="true" /> Estado
          </span>
          <FilterChips label="Filtrar por estado" options={estadoOptions} value={estado} onChange={setEstado} />
        </div>
      </div>

      <p className={styles.result} aria-live="polite">
        {filtradas.length} {filtradas.length === 1 ? 'actividad' : 'actividades'}
        {anios.length > 0 && ` en ${anio}`}
      </p>

      {/* ---- Línea de tiempo ---- */}
      {meses.length > 0 ? (
        <div className={styles.timeline}>
          {meses.map((mes) => (
            <section key={mes.key} className={styles.month} aria-labelledby={`mes-${mes.key}`}>
              <h3 id={`mes-${mes.key}`} className={styles.monthTitle}>
                <span className={styles.marker} aria-hidden="true" />
                {mes.label}
                <span className={styles.monthCount}>{mes.items.length}</span>
              </h3>
              <ol className={styles.list}>
                {mes.items.map((a) => (
                  // key incluye filtros para re-disparar la animación de entrada al filtrar
                  <li key={`${a.id}-${area}-${estado}`}>
                    <ActivityItem actividad={a} area={areaMap[a.area]} estado={estados[a.estado]} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <FiInbox aria-hidden="true" />
          <p>No hay actividades con estos filtros.</p>
          {hayFiltros && (
            <Button variant="outline" size="sm" onClick={limpiar}>
              Quitar filtros
            </Button>
          )}
        </div>
      )}
    </Section>
  )
}
