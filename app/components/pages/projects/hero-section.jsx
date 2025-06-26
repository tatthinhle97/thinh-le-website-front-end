import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'

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
    <div className={stringUtility.merge([
      'container-layout section-py section-px text-center'
    ])}>
      <p className={`content-mt ${textTheme.secondaryColor600}`}>
        A collection of personal and academic projects showcasing my skills in software development, data analysis, and
        problem-solving. Each project reflects my dedication to learning, creativity, and applying technical knowledge
        to real-world scenarios.
      </p>
    </div>
  </section>
}
