import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function FeatureSection() {
  const {
    textTheme
  } = useSelector(themeStates)

  return <section>
    <div className={stringUtility.merge([
      'container-layout p-y-feature-section px-6 text-center'
    ])}>
      <h2 className='feature-section-header-text mb-8'>
        Get in touch
      </h2>
      <p className={`feature-section-description-text ${textTheme.secondaryColor600}`}>
        Can’t wait to connect with you 🙌
      </p>
    </div>
  </section>
}
