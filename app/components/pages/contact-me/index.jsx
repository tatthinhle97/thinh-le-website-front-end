import {useState} from 'react'
import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import TextInput from '../../inputs/text.jsx'
import ContactInfoSection from './contact-info-section.jsx'
import FeatureSection from './feature-section.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.contactMe.title},
    {name: 'description', content: pageMetadataConstant.contactMe.description}
  ]
}

export default function ContactMePage() {
  return <>
    <FeatureSection />
    <ContactInfoSection />
  </>
}
