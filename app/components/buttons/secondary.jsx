
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function SecondaryButton({
  children, className, type, ariaLabel, onClick
}) {
  const {
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  return <button
    aria-label={ariaLabel}
    type={type}
    className={stringUtility.merge([
      borderTheme.secondaryColor,
      borderTheme.hover.accentColor700,
      textTheme.hover.accentColor700,
      'leading-6',
      className
    ])}
    onClick={onClick}>
    {children}
  </button>
}
