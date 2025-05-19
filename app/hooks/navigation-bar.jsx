import {useContext} from 'react'
import {useLocation} from 'react-router'
import NavigationBarContext from '../contexts/navigation-bar.jsx'
import renderUtility from '../utilities/render.jsx'
import stringUtility from '../utilities/string.jsx'

export default function useNavigationBar() {
  const location = useLocation()
  console.log('pathname', location.pathname)
  const onNavigationItemClick = useContext(NavigationBarContext)

  const isChildPathOf = (_navigationItemPathName) => {
    // Not homepage & child path
    return _navigationItemPathName.length > 1 &&
        location.pathname.includes(_navigationItemPathName)
  }

  const renderNavigationItems = (
      navigationItems,
      className,
      activeNavigationItemClassName,
      nonActiveNavigationItemClassName,
      shouldDisplayIcon = true
  ) => {
    console.log('navigationItems', navigationItems)
    return navigationItems
        .map((_navigationItem, _index) => {
          if (!stringUtility.isSubStringOf(_navigationItem.path, location.pathname))
          {
            console.log('here')
          }
          return <a
              onClick={onNavigationItemClick}
              key={_index}
              className={stringUtility.merge([
                className,
                shouldDisplayIcon
                    ? 'flex gap-2 items-center'
                    : undefined,
                (location.pathname === _navigationItem.path ||
                    isChildPathOf(_navigationItem.path))
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
  }

  return {
    renderNavigationItems
  }
}
