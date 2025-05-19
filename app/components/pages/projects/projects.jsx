import Card from '@components/card.jsx'
import projectConstant from '@constants/project.js'
import stringUtility from '@utilities/string.jsx'

export default function Projects() {
  return <section>
    <div className={stringUtility.merge([
      'container-layout section-pt section-px section-gap grid-3-columns'
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
