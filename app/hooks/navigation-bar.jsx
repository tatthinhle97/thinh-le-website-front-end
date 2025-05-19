import {useCallback, useContext} from 'react'
import {NavLink, useLocation} from 'react-router'
import NavigationBarContext from '../contexts/navigation-bar.jsx'
import renderUtility from '../utilities/render.jsx'
import stringUtility from '../utilities/string.jsx'

export default function useNavigationBar() {
  const location = useLocation()
  console.log('pathname', location.pathname)
  const onNavigationItemClick = useContext(NavigationBarContext)

  const isChildPath = useCallback((_navigationItemPathName) => {
    // Not homepage & child path
    return _navigationItemPathName.length > 1 &&
        location.pathname.includes(_navigationItemPathName)
  }, [location.pathname])

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
        console.log('is item child of location path?', isChildPath(_navigationItem.path))
        return <NavLink
          onClick={onNavigationItemClick}
          key={_index}
          to={_navigationItem.path}
          className={({isActive}) =>
            stringUtility.merge([
              className,
              shouldDisplayIcon
                ? 'flex gap-2 items-center'
                : undefined,
              (isActive || isChildPath(_navigationItem.path))
                ? activeNavigationItemClassName
                : nonActiveNavigationItemClassName
            ])}>
          {renderUtility.renderIfTrue(
            shouldDisplayIcon,
            _navigationItem.iconComponent
          )}
          {_navigationItem.label}
        </NavLink>
      })
  }

  return {
    renderNavigationItems
  }
}
