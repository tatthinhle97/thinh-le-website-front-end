
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function IconButton({
  children, ariaLabel, ref, type = 'button', onClick, className
}) {
  const {
    textTheme
  } = useSelector(themeStates)

  return <button
    aria-label={ariaLabel}
    ref={ref}
    type={type}
    onClick={onClick}
    className={stringUtility.merge([
      textTheme.hover.accentColor700,
      'cursor-pointer',
      className
    ])}>
    {children}
  </button>
}
