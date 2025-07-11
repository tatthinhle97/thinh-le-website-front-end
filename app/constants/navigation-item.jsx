import {HugeiconsIcon} from '@hugeicons/react'
import iconConstant from './icon.jsx'
import pageMetadataConstant from './metadata/page.jsx'
import {Home01Icon, Mailbox01Icon, UserCircleIcon, WorkflowCircle06Icon} from '@hugeicons-pro/core-solid-rounded'

const home = {
  path: pageMetadataConstant.home.path,
  label: pageMetadataConstant.home.title,
  iconComponent: <HugeiconsIcon icon={Home01Icon} size={iconConstant.buttonIconSize} />
}

const aboutMe = {
  path: pageMetadataConstant.aboutMe.path,
  label: pageMetadataConstant.aboutMe.title,
  iconComponent: <HugeiconsIcon icon={UserCircleIcon} size={iconConstant.buttonIconSize} />
}

const projects = {
  path: pageMetadataConstant.projects.path,
  label: pageMetadataConstant.projects.title,
  iconComponent: <HugeiconsIcon icon={WorkflowCircle06Icon} size={iconConstant.buttonIconSize} />
}

const contactMe = {
  path: pageMetadataConstant.contactMe.path,
  label: pageMetadataConstant.contactMe.title,
  iconComponent: <HugeiconsIcon icon={Mailbox01Icon} size={iconConstant.buttonIconSize} />
}

const allNavigationItems = [home, aboutMe, projects, contactMe]

const navigationItemConstant = {
  home, aboutMe, projects, contactMe, allNavigationItems
}

export default navigationItemConstant
