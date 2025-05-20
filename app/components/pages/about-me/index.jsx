import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import Footer from '../../footer.jsx'
import HeroSection from './hero-section.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.aboutMe.title},
    {name: 'description', content: pageMetadataConstant.aboutMe.description}
  ]
}

export default function AboutPage() {
  return <>
    <main>
      <HeroSection />
    </main>
    <Footer />
  </>
}
