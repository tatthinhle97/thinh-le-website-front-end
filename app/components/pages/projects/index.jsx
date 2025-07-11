import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import FeatureSection from './feature-section.jsx'
import Projects from './projects.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.projects.title},
    {name: 'description', content: pageMetadataConstant.projects.description}
  ]
}

export default function ProjectsPage() {
  return <>
    <FeatureSection />
    <Projects />
  </>
}
