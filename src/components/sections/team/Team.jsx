import { Section, SectionTitle, Carousel, Reveal } from '../../ui'
import TeamCard from './TeamCard'

/**
 * Sección del equipo / directiva en carrusel (4 visibles en escritorio, avanza de uno en uno).
 * @param {object[]} miembros - lista de equipo.js con `area` resuelta a objeto (o null)
 */
export default function Team({
  id = 'equipo',
  miembros = [],
  eyebrow = 'Directiva',
  title = 'Nuestro',
  highlight = 'equipo',
  description,
}) {
  return (
    <Section id={id} variant="deep">
      <SectionTitle eyebrow={eyebrow} title={title} highlight={highlight} description={description} />
      <Reveal>
        <Carousel label="Integrantes del equipo">
          {miembros.map((m) => (
            <TeamCard key={m.id} miembro={m} />
          ))}
        </Carousel>
      </Reveal>
    </Section>
  )
}
