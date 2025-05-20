
import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function PrimaryLinkButton({
  children, className, href, ariaLabel, isExternalLink = true
}) {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  return isExternalLink
    ?
    <a
      aria-label={ariaLabel}
      className={stringUtility.merge([
        backgroundTheme.hover.accentColor700,
        backgroundTheme.secondaryColor,
        borderTheme.secondaryColor,
        borderTheme.hover.accentColor700,
        textTheme.primaryColor,
        className
      ])}
      href={href}
      target='_blank' rel='noreferrer'>
      {children}
    </a>
    :
    <Link
      aria-label={ariaLabel}
      className={stringUtility.merge([
        backgroundTheme.hover.accentColor700,
        backgroundTheme.secondaryColor,
        borderTheme.secondaryColor,
        borderTheme.hover.accentColor700,
        textTheme.primaryColor,
        className
      ])}
      to={{
        pathname: href
      }}>
      {children}
    </Link>
}
