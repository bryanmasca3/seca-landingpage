import { useState } from 'react'
import { Section, SectionTitle, Modal, Reveal } from '../../ui'
import AreaCard from './AreaCard'
import AreaDetail, { AreaDetailHeader } from './AreaDetail'
import styles from './Areas.module.css'

/**
 * Sección de áreas: grilla de tarjetas + modal con el detalle.
 * @param {object[]} areas - lista de areas.js
 */
export default function Areas({
  id = 'areas',
  areas = [],
  eyebrow = 'Lo que hacemos',
  title = 'Nuestras',
  highlight = 'áreas',
  description,
  planHref = '#plan',
  onViewPlan, // (areaId) => void — opcional: para resaltar esta área en el plan
}) {
  const [selectedId, setSelectedId] = useState(null)
  const selected = areas.find((a) => a.id === selectedId)
  const close = () => setSelectedId(null)

  // Cierra el modal y luego desplaza a la sección destino
  // (con el modal abierto el scroll del body está bloqueado).
  const goTo = (e) => {
    e.preventDefault()
    onViewPlan?.(selectedId)
    close()
    setTimeout(() => document.querySelector(planHref)?.scrollIntoView(), 50)
  }

  return (
    <Section id={id} variant="deep">
      <SectionTitle eyebrow={eyebrow} title={title} highlight={highlight} description={description} />

      <ul className={styles.grid}>
        {areas.map((area, i) => (
          <Reveal as="li" key={area.id} className={styles.item} delay={(i % 3) * 120}>
            <AreaCard area={area} index={i} onOpen={() => setSelectedId(area.id)} />
          </Reveal>
        ))}
      </ul>

      <Modal
        open={Boolean(selected)}
        onClose={close}
        title={selected?.nombre}
        accent={selected?.color}
        header={selected && <AreaDetailHeader area={selected} />}
      >
        {selected && <AreaDetail area={selected} planHref={planHref} onNavigate={goTo} />}
      </Modal>
    </Section>
  )
}
