import stringUtility from '@utilities/string.jsx'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function IconLinkButton({
  ariaLabel, className, href, children
}) {
  const {
    textTheme
  } = useSelector(themeStates)

  return <a
    aria-label={ariaLabel}
    className={stringUtility.merge([
      textTheme.hover.accentColor700,
      className
    ])}
    href={href}
    target='_blank' rel='noreferrer'>
    {children}
  </a>
}
