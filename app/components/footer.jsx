import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import socialMediaConstant from '../constants/social-media.jsx'
import stringUtility from '../utilities/string.jsx'
import IconLinkButton from './buttons/links/icon.jsx'
import FooterNavigationBar from './navigation-bars/footer.jsx'

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
        'container-layout pb-6 pt-20 sm:pt-24 lg:pt-32 section-px'
      ])}>
      <div className={stringUtility.merge([
        'lg:grid lg:grid-cols-3 lg:gap-8'
      ])}>
        <img
          alt='https://www.flaticon.com/free-icons/basketball'
          src='/logo.png'
          className='h-9' />
        <FooterNavigationBar />
      </div>

      <hr className={`content-mt ${borderTheme.secondaryColor300}`} />
      <div className={stringUtility.merge([
        'flex flex-col content-gap md:flex-row md:gap-0',
        'md:justify-between content-mt'
      ])}>
        <p>
          © 2024 Tat Thinh Le&apos;s website, Inc. All rights reserved.
        </p>
        <div className={'flex content-gap justify-center xs:justify-start items-center'}>
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
