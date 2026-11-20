import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi'
import styles from './Carousel.module.css'

// Cuántos elementos se ven según el ancho de pantalla (min-width → cantidad)
const DEFAULT_BREAKPOINTS = { 0: 1, 480: 2, 768: 3, 992: 4 }

function usePerView(breakpoints) {
  const calc = useCallback(() => {
    const w = typeof window === 'undefined' ? 1200 : window.innerWidth
    return Object.entries(breakpoints)
      .map(([bp, n]) => [Number(bp), n])
      .sort((a, b) => a[0] - b[0])
      .reduce((acc, [bp, n]) => (w >= bp ? n : acc), 1)
  }, [breakpoints])

  const [perView, setPerView] = useState(calc)

  useEffect(() => {
    const onResize = () => setPerView(calc())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [calc])

  return perView
}

/**
 * Carrusel que muestra N elementos y avanza de uno en uno.
 * Flechas, puntos, arrastre táctil y avance automático (se pausa al pasar el mouse
 * o al enfocar, y se desactiva si el sistema pide reducir movimiento).
 *
 * @param {string} label             - nombre accesible (ej. "Equipo")
 * @param {object} breakpoints       - { anchoMin: cantidadVisible }
 * @param {number} autoplay          - ms entre avances (0 = sin avance automático)
 */
export default function Carousel({ label, breakpoints = DEFAULT_BREAKPOINTS, autoplay = 4000, className = '', children }) {
  const items = Children.toArray(children)
  const perView = usePerView(breakpoints)
  const maxIndex = Math.max(0, items.length - perView)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false) // pausa temporal (hover / foco)
  const [stopped, setStopped] = useState(false) // pausa elegida por el usuario (botón)
  const dragStart = useRef(null)

  const current = Math.min(index, maxIndex) // por si cambia perView al redimensionar
  const go = useCallback((i) => setIndex(i < 0 ? maxIndex : i > maxIndex ? 0 : i), [maxIndex])
  const prev = () => go(current - 1)
  const next = useCallback(() => go(current + 1), [go, current])

  // Avance automático
  useEffect(() => {
    if (!autoplay || paused || stopped || maxIndex === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(next, autoplay)
    return () => clearTimeout(t)
  }, [autoplay, paused, stopped, maxIndex, next])

  // Arrastre / swipe
  const onPointerDown = (e) => {
    dragStart.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (dragStart.current == null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <div
      className={`${styles.carousel} ${className}`}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      style={{ '--per-view': perView, '--index': current }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className={styles.viewport} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (dragStart.current = null)}>
        <ul className={styles.track}>
          {items.map((child, i) => {
            const visible = i >= current && i < current + perView
            return (
              <li
                key={child.key ?? i}
                className={styles.slide}
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${items.length}`}
                aria-hidden={!visible}
                inert={!visible ? true : undefined}
              >
                {child}
              </li>
            )
          })}
        </ul>
      </div>

      {maxIndex > 0 && (
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={prev} aria-label="Anterior">
            <FiChevronLeft />
          </button>

          <div className={styles.dots}>
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => go(i)}
                aria-label={`Ir a la posición ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
              />
            ))}
          </div>

          <button type="button" className={styles.arrow} onClick={next} aria-label="Siguiente">
            <FiChevronRight />
          </button>

          {autoplay > 0 && (
            <button
              type="button"
              className={`${styles.arrow} ${styles.toggle}`}
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? 'Reanudar avance automático' : 'Pausar avance automático'}
              aria-pressed={stopped}
            >
              {stopped ? <FiPlay /> : <FiPause />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
