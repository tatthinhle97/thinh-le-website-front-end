import pageMetadataConstant from '@constants/metadata/page.js'
import HeroSection from './hero-section.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.aboutMe.title},
    {name: 'description', content: pageMetadataConstant.aboutMe.description}
  ]
}

export default function AboutPage() {
  return <>
    <HeroSection />
  </>
}
