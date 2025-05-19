import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from "../../../utilities/string.jsx";

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

export default function SecondaryLinkButton({
  children, className, href, ariaLabel
}) {
  const {
    textTheme,
    borderTheme
  } = useSelector(themeStates)

  return <a
    aria-label={ariaLabel}
    className={stringUtility.merge([
      borderTheme.secondaryColor,
      borderTheme.hover.accentColor700,
      textTheme.hover.accentColor700,
      className
    ])}
    href={href}>
    {children}
  </a>
}
