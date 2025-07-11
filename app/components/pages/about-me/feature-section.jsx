import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import Typed from 'typed.js'
import stringUtility from '../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

const brandStatements = [
  'tech enthusiast, crafting user-friendly applications.',
  'passionate developer, turning ideas into reality.',
  'problem solver, committed to client satisfaction.',
  'data analyst, turning data into actionable insights.'
]

export default function FeatureSection() {
  const {
    backgroundTheme,
    textTheme
  } = useSelector(themeStates)
  const personalStatementRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(personalStatementRef.current, {
      strings: brandStatements,
      typeSpeed: 20,
      backSpeed: 10,
      backDelay: 1500,
      smartBackspace: true,
      startDelay: 150,
      cursorChar: '_',
      loop: true
    })

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy()
    }
  }, [])

  return <section>
    <div className={stringUtility.merge([
      'container-layout feature-py px-6',
      'flex flex-col-reverse lg:flex-row gap-x-8 justify-between',
      'items-center'
    ])}>
      <div className={'basis-2/5'}>
        <div className={stringUtility.merge([
          'w-96 h-96 mx-auto profile-image-border-radius',
          backgroundTheme.secondaryColor200,
          'relative overflow-hidden bg-profile bg-cover'
        ])}>
        </div>
      </div>
      <section className={'basis-3/5'}>
        <h2 className={'feature-section-header-text mb-8'}>
          Lê Tất Thịnh (Terry)
        </h2>
        <p className={`feature-section-description-text mb-6 ${textTheme.secondaryColor600}`}>
          I’m a <span
            ref={personalStatementRef}>
          </span>
        </p>
        <p
          className={`feature-section-description-text ${textTheme.secondaryColor600}`}>
          I have 2 years of experience in software development, with a strong focus on quality, meeting deadlines,
          and ensuring client satisfaction. With a major in Information Systems, I am currently pursuing a master’s
          program in Data Science and Analytics at Stockton University. In my free time, I enjoy coding or going
          around capturing moments through photography.
        </p>
      </section>
    </div>
  </section>
}
