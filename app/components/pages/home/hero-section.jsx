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
    <div className='container-layout hero-section-py px-6 max-w-3xl text-center'>
      <h1
        className={'hero-section-header-text mb-8'}>
        From curiosity<br />to reality
      </h1>
      <p className={stringUtility.merge([
        'hero-section-description-text mb-6',
        textTheme.secondaryColor600
      ])}>
        &ldquo;A creative mind builds not just for answers,<br />but to explore
        and to share what it discovers.&rdquo;
      </p>
      <div className={stringUtility.merge([
        'flex flex-col xs:flex-row gap-4',
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
