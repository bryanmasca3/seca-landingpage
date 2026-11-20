import { useEffect, useState } from 'react'

/**
 * Observa las secciones indicadas y devuelve el id de la que está visible.
 * Se usa para resaltar el enlace activo en el menú.
 * @param {string[]} ids - ids de sección sin '#'
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // la sección cuenta como activa cuando cruza la franja central de la pantalla
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
