import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

export default function SecondaryLinkButton({
  children, className, href, ariaLabel, isExternalLink = true
}) {
  const {
    textTheme,
    borderTheme
  } = useSelector(themeStates)

  return isExternalLink
    ?
    <a
      aria-label={ariaLabel}
      className={stringUtility.merge([
        borderTheme.secondaryColor,
        borderTheme.hover.accentColor700,
        textTheme.hover.accentColor700,
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
        borderTheme.secondaryColor,
        borderTheme.hover.accentColor700,
        textTheme.hover.accentColor700,
        className
      ])}
      to={{
        pathname: href
      }}>
      {children}
    </Link>
}
