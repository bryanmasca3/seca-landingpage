import { useMemo, useState } from 'react'
import { FiList } from 'react-icons/fi'
import { Section, SectionTitle, FilterChips, Stat, ProgressBar, Reveal } from '../../ui'
import styles from './Plan.module.css'

/**
 * Plan de trabajo en contadores: totales por estado y % de cumplimiento.
 * (La versión con detalle de cada actividad está en Timeline.jsx, sin uso)
 *
 * @param {object[]} actividades - lista completa (todos los años)
 * @param {object}   estados     - mapa { id: {label, plural, color, icon} }
 * @param {number[]} anios
 */
export default function Plan({
  id = 'plan',
  actividades = [],
  estados = {},
  anios = [],
  eyebrow = 'Cronograma',
  title = 'Plan de',
  highlight = 'trabajo',
  description,
}) {
  const [anio, setAnio] = useState(anios[anios.length - 1])

  const { total, porEstado } = useMemo(() => {
    const items = actividades.filter((a) => a.anio === anio)
    const porEstado = {}
    items.forEach((a) => {
      porEstado[a.estado] = (porEstado[a.estado] ?? 0) + 1
    })
    return { total: items.length, porEstado }
  }, [actividades, anio])

  const cumplimiento = total ? ((porEstado.realizado ?? 0) / total) * 100 : 0

  return (
    <Section id={id}>
      <SectionTitle eyebrow={eyebrow} title={title} highlight={highlight} description={description} />

      {anios.length > 1 && (
        <FilterChips
          label="Elegir año"
          className={styles.years}
          options={anios.map((y) => ({ value: y, label: String(y) }))}
          value={anio}
          onChange={setAnio}
        />
      )}

      <Reveal className={styles.summary}>
        <div className={styles.stats}>
          <Stat value={total} label="Planificadas" icon={FiList} color="var(--color-heading)" />
          {Object.entries(estados).map(([key, e]) => (
            <Stat key={`${anio}-${key}`} value={porEstado[key] ?? 0} label={e.plural} icon={e.icon} color={e.color} />
          ))}
        </div>
        <ProgressBar key={anio} value={cumplimiento} label={`Cumplimiento general ${anio}`} />
      </Reveal>
    </Section>
  )
}
