import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import dateTimeUtility from '../../utilities/datetime.jsx'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Card({
  title,
  containerClassName,
  contentClassName,
  children
}) {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  return <section className={containerClassName}>
    <div className={stringUtility.merge([
      'border px-4 py-2 rounded-t-lg font-semibold',
      containerClassName,
      backgroundTheme.secondaryColor,
      textTheme.primaryColor,
      borderTheme.secondaryColor
    ])}>
      {title}
    </div>
    <div className={stringUtility.merge([
      'border border-t-0 rounded-b-lg overflow-hidden',
      borderTheme.secondaryColor300,
      contentClassName
    ])}>
      {children}
    </div>
  </section>
}
