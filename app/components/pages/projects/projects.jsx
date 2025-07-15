import projectConstant from '../../../constants/project.jsx'
import stringUtility from '../../../utilities/string.jsx'
import Card from '../../card.jsx'

export default function Projects() {
  return <section>
    <div className={stringUtility.merge([
      'container-layout px-6 gap-x-6 gap-y-20 grid-3-columns'
    ])}>
      {projectConstant.allProjects.map((_projectCard, _index) => {
        return (
          <Card
            key={_index}
            link={_projectCard.path}
            backgroundImageClass={_projectCard.backgroundImageClass}
            date={_projectCard.dateCreated}
            tags={_projectCard.tags}
            title={_projectCard.title}
            description={_projectCard.description} />
        )
      })}
    </div>
  </section>
}
