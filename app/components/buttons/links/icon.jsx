import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function IconLinkButton({
  ariaLabel,
  className,
  href,
  children,
  isExternalLink = true
}) {
  const {
    textTheme
  } = useSelector(themeStates)

  return isExternalLink
    ?
    <a
      aria-label={ariaLabel}
      className={stringUtility.merge([
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
        textTheme.hover.accentColor700,
        className
      ])}
      to={{
        pathname: href
      }}>
      {children}
    </Link>
}
