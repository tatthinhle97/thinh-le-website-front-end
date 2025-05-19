import {useCallback, useContext} from 'react'
import {useLocation} from 'react-router'
import NavigationBarContext from '../contexts/navigation-bar.jsx'
import renderUtility from '../utilities/render.jsx'
import stringUtility from '../utilities/string.jsx'

export default function useNavigationBar() {
  const location = useLocation()
  const onNavigationItemClick = useContext(NavigationBarContext)

  const renderNavigationItems = useCallback((
    navigationItems,
    className,
    activeNavigationItemClassName,
    nonActiveNavigationItemClassName,
    shouldDisplayIcon = true
  ) => {
    return navigationItems
      .map((_navigationItem, _index) => {
        return <a
          onClick={onNavigationItemClick}
          key={_index}
          className={stringUtility.merge([
            className,
            shouldDisplayIcon
              ? 'flex gap-2 items-center'
              : undefined,
            (location.pathname === _navigationItem.path ||
              _navigationItem.path.isSubStringOf(location.pathname))
              ? activeNavigationItemClassName
              : nonActiveNavigationItemClassName
          ])}
          href={_navigationItem.path}>
          {renderUtility.renderIfTrue(
            shouldDisplayIcon,
            _navigationItem.iconComponent
          )}
          {_navigationItem.label}
        </a>
      })
  }, [onNavigationItemClick, location.pathname])

  return {
    renderNavigationItems
  }
}
