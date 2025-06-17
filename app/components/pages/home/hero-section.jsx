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
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function HeroSection() {
  const {
    textTheme
  } = useSelector(themeStates)

  return <section>
    <div className='hero-section-py section-px mx-auto max-w-3xl text-center'>
      <h1
        className={'hero-section-heading-text'}>
        From curiosity<br />to contribution
      </h1>
      <p className={stringUtility.merge([
        'hero-section-description-text mt-8',
        textTheme.secondaryColor600
      ])}>
        &ldquo;A creative mind builds not just for answers,<br />but to explore
        and to share what it discovers.&rdquo;
      </p>
      <div className={stringUtility.merge([
        'mt-10 flex flex-col xs:flex-row gap-2',
        // [Tip]: Targeting a breakpoint range
        'justify-center'
      ])}>
        <PrimaryLinkButton
          ariaLabel={'Projects'}
          className={'button-link-leading-icon min-w-fit justify-center'}
          href={pageMetadataConstant.projects.path}
          isExternalLink={false}>
          <HugeiconsIcon icon={SourceCodeCircleIcon} size={21} />
          Projects
        </PrimaryLinkButton>
        <SecondaryLinkButton
          ariaLabel={'Download resume'}
          className={'button-link-leading-icon min-w-fit justify-center'}
          href={'https://drive.google.com/file/d/1xFrFyALouO559dB6mST_BbmfoqLRRy0-/view?usp=sharing'}>
          <HugeiconsIcon icon={DownloadCircle01Icon} size={21} />
          Resume
        </SecondaryLinkButton>
      </div>
    </div>
  </section>
}
