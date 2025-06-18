import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import FeatureSection from './feature-section.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.aboutMe.title},
    {name: 'description', content: pageMetadataConstant.aboutMe.description}
  ]
}

export default function AboutPage() {
  return <>
    <FeatureSection />
  </>
}
