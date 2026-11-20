import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Devuelve [ref, visto]: `visto` pasa a true la primera vez que el elemento entra en pantalla.
 * Con "reducir movimiento" o sin IntersectionObserver, es true desde el inicio
 * (el contenido nunca queda oculto esperando una animación).
 */
export default function useInView({ threshold = 0.3 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => prefersReducedMotion() || typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, inView])

  return [ref, inView]
}
