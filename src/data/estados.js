// Estados posibles de una actividad (colores del cronograma original).
// `plural` se usa en los contadores del plan de trabajo.
import { FiCheck, FiX, FiRefreshCw } from 'react-icons/fi'

export const ESTADOS = {
  realizado: { label: 'Realizado', plural: 'Realizadas', color: 'var(--color-primary)', icon: FiCheck },
  'no-realizado': { label: 'No realizado', plural: 'No realizadas', color: '#ff5d5d', icon: FiX },
  reprogramado: { label: 'Reprogramado', plural: 'Reprogramadas', color: '#4fc3f7', icon: FiRefreshCw },
}
