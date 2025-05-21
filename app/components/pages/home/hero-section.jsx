import {DownloadCircle01Icon, Mailbox01Icon, SourceCodeCircleIcon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import pageMetadataConstant from '../../../constants/metadata/page.jsx'
import stringUtility from '../../../utilities/string.jsx'
import PrimaryLinkButton from '../../buttons/links/primary.jsx'
import SecondaryLinkButton from '../../buttons/links/secondary.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

export default function HeroSection() {
  const {
    backgroundTheme,
    textTheme,
    borderTheme
  } = useSelector(themeStates)

  return <section className={'bg-stockton-mobile lg:bg-stockton-desktop bg-cover bg-no-repeat bg-center'}>
    <div className={stringUtility.merge([
      'container-layout feature-py section-px'
    ])}>
      <article className={stringUtility.merge([
        backgroundTheme.opacity.ninety.primaryColor,
        'rounded-big-1',
        'max-w-2xl lg:max-w-(--breakpoint-md) p-12 transition-max-width'
      ])}>
        <p className={stringUtility.merge([
          'inline-block py-1 px-2 relative',
          'rounded-r-small-1 rounded-tl-small-1 text-small-1',
          `${backgroundTheme.secondaryColor} ${textTheme.primaryColor}`,
          'before:absolute before:top-full before:left-0',
          'before:border-t-8 before:border-r-8',
          'before:border-b-0 before:border-l-0',
          borderTheme.before.top.secondaryColor,
          'before:border-r-transparent',
          'before:border-b-transparent before:border-l-transparent'
        ])}>Hi there!</p>
        <h1
          className={'text-big-4 font-bold content-mt'}>
          Welcome to my page
        </h1>
        <p className={stringUtility.merge([
          'content-mt',
          textTheme.secondaryColor600
        ])}>
          Feel free to take a look around 🤪.
        </p>
        <div className={stringUtility.merge([
          'content-mt flex flex-col xs:flex-row gap-2',
          // [Tip]: Targeting a breakpoint range
          'xs:max-sm:justify-center'
        ])}>
          <PrimaryLinkButton
            ariaLabel={'Projects'}
            className={'button-link-icon-text min-w-fit justify-center'}
            href={pageMetadataConstant.projects.path}
            isExternalLink={false}>
            <HugeiconsIcon icon={SourceCodeCircleIcon} className={'wh-normal'} />
            Projects
          </PrimaryLinkButton>
          <SecondaryLinkButton
            ariaLabel={'Download resume'}
            className={'button-link-icon-text min-w-fit justify-center'}
            href={'https://drive.google.com/file/d/1xFrFyALouO559dB6mST_BbmfoqLRRy0-/view?usp=sharing'}>
            <HugeiconsIcon icon={DownloadCircle01Icon} className={'wh-normal'} />
            Resume
          </SecondaryLinkButton>
        </div>
      </article>
    </div>
  </section>
}
