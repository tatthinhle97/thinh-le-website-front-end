import pageMetadataConstant from '../../../constants/metadata/page.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.aboutMe.title},
    {name: 'description', content: pageMetadataConstant.aboutMe.description}
  ]
}

export default function ContactMePage() {
  return <>
    <p className={'container-layout section-px'}>Not implemented yet 😩</p>
  </>
}
