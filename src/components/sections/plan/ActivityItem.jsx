import { Badge } from '../../ui'
import { parseFecha, formatFecha } from '../../../data/helpers'
import styles from './ActivityItem.module.css'

/**
 * Una actividad del cronograma.
 * @param {object} actividad
 * @param {object} area    - área de la actividad (nombre, color, icon)
 * @param {object} estado  - { label, color } de estados.js
 */
export default function ActivityItem({ actividad, area, estado }) {
  const { titulo, fecha, fechaFin, nota } = actividad
  const f = parseFecha(fecha)
  const fechaFinCorta = fechaFin ? parseFecha(fechaFin).dia : null

  return (
    <article className={styles.item} style={{ '--item-color': area?.color, '--estado-color': estado?.color }}>
      {f && (
        <time className={styles.date} dateTime={fecha}>
          <span className={styles.day}>
            {f.dia}
            {fechaFinCorta && <small>–{fechaFinCorta}</small>}
          </span>
          <span className={styles.month}>{f.mes}</span>
        </time>
      )}

      <div className={styles.body}>
        <h4 className={styles.title}>{titulo}</h4>
        {nota && <p className={styles.note}>{nota}</p>}
        <div className={styles.meta}>
          {area && (
            <Badge color={area.color} icon={area.icon}>
              {area.nombre}
            </Badge>
          )}
          <span className="sr-only">Fecha: {formatFecha(fecha, fechaFin)}.</span>
        </div>
      </div>

      {estado && (
        <span className={styles.estado}>
          <span className={styles.estadoDot} aria-hidden="true" />
          {estado.label}
        </span>
      )}
    </article>
  )
}
