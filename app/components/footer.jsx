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
        'container-layout section-pt pb-6 section-px'
      ])}>
      <div className={'flex flex-col lg:flex-row lg:gap-10'}>
        <p className={'basis-full lg:basis-2/6 text-big-2'}>
          Tat Thinh Le
        </p>
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
