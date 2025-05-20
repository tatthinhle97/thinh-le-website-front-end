import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import Footer from '../../footer.jsx'
import HeroSection from './hero-section.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.home.title},
    {name: 'description', content: pageMetadataConstant.home.description}
  ]
}

export default function HomePage() {
  return <>
    <main>
      <HeroSection />
    </main>
    <Footer />
  </>
}
