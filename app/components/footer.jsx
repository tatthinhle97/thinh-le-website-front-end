import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import socialMediaConstant from '../constants/social-media.jsx'
import stringUtility from '../utilities/string.jsx'
import IconLinkButton from './buttons/links/icon.jsx'

const themeStates = createStructuredSelector(
  {
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

export default function Footer({className}) {
  const {
    borderTheme
  } = useSelector(themeStates)

  return <footer
    className={stringUtility.merge([
      className
    ])}>
    <div
      className={stringUtility.merge([
        'container-layout pb-6 px-6'
      ])}>
      <hr className={`mb-6 ${borderTheme.secondaryColor300}`} />
      <div className={stringUtility.merge([
        'flex flex-col gap-y-6 lg:gap-y-0 md:flex-row md:gap-0',
        'md:justify-between'
      ])}>
        <p>© 2024 Lê Tất Thịnh&apos;s website, Inc. All rights reserved.</p>
        <div className={'flex space-x-4 justify-center xs:justify-start items-center'}>
          {socialMediaConstant.allSocialMedia.map(
            (_socialMedia, _index) => {
              return <IconLinkButton
                key={_index}
                ariaLabel={_socialMedia.label}
                href={_socialMedia.link}>
                {_socialMedia.icon}
              </IconLinkButton>
            })}
        </div>
      </div>
    </div>
  </footer>
}
