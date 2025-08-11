import {HugeiconsIcon} from '@hugeicons/react'
import {Facebook01Icon, Github01Icon, Linkedin01Icon} from '@hugeicons-pro/core-solid-rounded'
import iconConstant from './icon.jsx'

const iconSize = iconConstant.defaultSize

const facebook = {
  label: 'Facebook icon',
  link: 'https://www.facebook.com/tatthinhle97',
  icon: <HugeiconsIcon icon={Facebook01Icon} size={iconSize} />
}

const linkedIn = {
  label: 'LinkedIn icon',
  link: 'https://www.linkedin.com/in/letatthinh',
  icon: <HugeiconsIcon icon={Linkedin01Icon} size={iconSize} />
}

const gitHub = {
  label: 'GitHub icon',
  link: 'https://github.com/tatthinhle97',
  icon: <HugeiconsIcon icon={Github01Icon} size={iconSize} />
}

const allSocialMedia = [facebook, linkedIn, gitHub]

const socialMediaConstant = {
  facebook,
  linkedIn,
  gitHub,
  allSocialMedia
}

export default socialMediaConstant
