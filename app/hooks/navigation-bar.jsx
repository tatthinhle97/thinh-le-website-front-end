import {useContext} from 'react'
import {Link, useLocation} from 'react-router'
import NavigationBarContext from '../contexts/navigation-bar.jsx'
import renderUtility from '../utilities/render.jsx'
import stringUtility from '../utilities/string.jsx'

export default function useNavigationBar() {
  const location = useLocation()
  const onNavigationItemClick = useContext(NavigationBarContext)

  const isActiveNavigationItem = (_navigationItemPath) => {
    if (_navigationItemPath === location.pathname) {
      return true
    } else if (_navigationItemPath.length > 1 &&
        location.pathname.includes(_navigationItemPath)) {
      return true
    }

    return false
  }
  console.log('location.pathname', location.pathname)
  const renderNavigationItems = (
    navigationItems,
    className,
    activeNavigationItemClassName,
    nonActiveNavigationItemClassName,
    shouldDisplayIcon = true
  ) => {
    return navigationItems
      .map((_navigationItem, _index) => {
        console.log('_navigationItem.path', _navigationItem.path)
        return <Link
          onClick={onNavigationItemClick}
          key={_index}
          to={{
            pathname: _navigationItem.path
          }}
          className={stringUtility.merge([
            className,
            shouldDisplayIcon
              ? 'flex gap-2 items-center'
              : undefined,
            (isActiveNavigationItem(_navigationItem.path))
              ? activeNavigationItemClassName
              : nonActiveNavigationItemClassName
          ])}>
          {renderUtility.renderIfTrue(
            shouldDisplayIcon,
            _navigationItem.iconComponent
          )}
          {_navigationItem.label}
        </Link>
      })
  }

  return {
    renderNavigationItems
  }
}
