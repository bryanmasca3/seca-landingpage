import { useEffect, useRef, useState } from 'react'

const sinAnimacion = () =>
  typeof window === 'undefined' ||
  typeof IntersectionObserver === 'undefined' ||
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Anima un número de 0 a `end` cuando el elemento entra en pantalla.
 * Con "reducir movimiento" (o sin IntersectionObserver) devuelve el valor final directo.
 * Devuelve [ref, valorActual].
 */
export default function useCountUp(end, duration = 1400) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const estatico = sinAnimacion()

  useEffect(() => {
    const el = ref.current
    if (!el || estatico) return
    let frame

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
          setValue(Math.round(eased * end))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [end, duration, estatico])

  return [ref, estatico ? end : value]
}
