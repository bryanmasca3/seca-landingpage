import styles from './FilterChips.module.css'

/**
 * Grupo de botones-filtro (selección única).
 *
 * @param {string} label  - nombre accesible del grupo (ej. "Filtrar por área")
 * @param {{value: string|null, label: string, color?: string, count?: number}[]} options
 * @param {string|null} value
 * @param {(value) => void} onChange
 */
export default function FilterChips({ label, options = [], value, onChange, className = '' }) {
  return (
    <div role="group" aria-label={label} className={`${styles.group} ${className}`}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value ?? 'all'}
            type="button"
            className={`${styles.chip} ${active ? styles.active : ''}`}
            style={opt.color ? { '--chip-color': opt.color } : undefined}
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
          >
            {opt.color && <span className={styles.dot} aria-hidden="true" />}
            {opt.label}
            {opt.count != null && <span className={styles.count}>{opt.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
