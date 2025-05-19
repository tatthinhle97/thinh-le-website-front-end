
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from "../../../utilities/string.jsx";

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function PrimaryLinkButton({
  children, className, href, ariaLabel
}) {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  return <a
    aria-label={ariaLabel}
    className={stringUtility.merge([
      backgroundTheme.hover.accentColor700,
      backgroundTheme.secondaryColor,
      borderTheme.secondaryColor,
      borderTheme.hover.accentColor700,
      textTheme.primaryColor,
      className
    ])}
    href={href}>
    {children}
  </a>
}
