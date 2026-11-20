import { FiCalendar, FiTarget, FiArrowRight } from 'react-icons/fi'
import { Button, CheckList } from '../../ui'
import styles from './AreaDetail.module.css'

/** Contenido del modal de un área: cabecera + objetivos + actividades planificadas. */
export function AreaDetailHeader({ area }) {
  const { nombre, icon: Icon, color } = area
  return (
    <header className={styles.header} style={{ '--accent': color }}>
      <span className={styles.icon} aria-hidden="true">
        <Icon />
      </span>
      <div>
        <span className={styles.eyebrow}>Área</span>
        <h2 className={styles.title}>{nombre}</h2>
      </div>
    </header>
  )
}

export default function AreaDetail({ area, planHref = '#plan', onNavigate }) {
  const { objetivo, objetivos, actividades, color } = area

  return (
    <div className={styles.detail} style={{ '--accent': color }}>
      <div className={styles.intro}>
        <p className={styles.objetivo}>{objetivo}</p>
      </div>

      <div className={styles.columns}>
        <section>
          <h3 className={styles.subtitle}>
            <FiTarget aria-hidden="true" /> Objetivos
          </h3>
          <CheckList items={objetivos} color={color} />
        </section>

        <section>
          <h3 className={styles.subtitle}>
            <FiCalendar aria-hidden="true" /> Actividades planificadas
          </h3>
          <CheckList items={actividades} color={color} icon={FiArrowRight} />
        </section>
      </div>

      <div className={styles.actions}>
        <Button href={planHref} onClick={onNavigate} icon={FiArrowRight}>
          Ver en el plan de trabajo
        </Button>
      </div>
    </div>
  )
}
