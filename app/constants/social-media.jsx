import {HugeiconsIcon} from '@hugeicons/react'
import {Facebook01Icon, Github01Icon, Home01Icon, LeetcodeIcon, Linkedin01Icon} from '@hugeicons-pro/core-solid-rounded'
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
  link: 'https://github.com/letatthinh',
  icon: <HugeiconsIcon icon={Github01Icon} size={iconSize} />
}

const leetCode = {
  label: 'Leetcode icon',
  link: 'https://leetcode.com/u/letatthinh',
  icon: <HugeiconsIcon icon={LeetcodeIcon} size={iconSize} />
}

const allSocialMedia = [facebook, linkedIn, gitHub, leetCode]

const socialMediaConstant = {
  facebook,
  linkedIn,
  gitHub,
  leetCode,
  allSocialMedia
}

export default socialMediaConstant
