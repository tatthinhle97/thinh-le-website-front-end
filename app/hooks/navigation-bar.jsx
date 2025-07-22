import {useContext} from 'react'
import {Link, useLocation} from 'react-router'
import NavigationBarContext from '../contexts/navigation-bar.jsx'
import renderUtility from '../utilities/render.jsx'
import stringUtility from '../utilities/string.jsx'

export default function useNavigationBar() {
  const location = useLocation()
  const onNavigationItemClick = useContext(NavigationBarContext)

  const isActiveNavigationItem = (_navigationItemPath) => {
    console.log('---')
    console.log('location.pathname', location.pathname)
    console.log('_navigationItemPath', _navigationItemPath)
    if (_navigationItemPath === location.pathname || _navigationItemPath.length > 1 &&
        location.pathname.includes(_navigationItemPath)) {
      console.log('case 1')
      return true
    }

    console.log('case 2')
    return false
  }

  const renderNavigationItems = (
    navigationItems,
    className,
    activeNavigationItemClassName,
    nonActiveNavigationItemClassName,
    shouldDisplayIcon = true
  ) => {
    return navigationItems
      .map((_navigationItem, _index) => {
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
            isActiveNavigationItem(_navigationItem.path)
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
