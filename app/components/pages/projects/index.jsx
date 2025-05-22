import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import Footer from '../../footer.jsx'
import HeroSection from './hero-section.jsx'
import Projects from './projects.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.projects.title},
    {name: 'description', content: pageMetadataConstant.projects.description}
  ]
}

export default function ProjectsPage() {
  return <>
    <HeroSection />
    <Projects />
  </>
}
