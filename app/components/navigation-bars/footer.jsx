import navigationItemConstant from '@constants/navigation-item.jsx'
import useNavigationBar from '@hooks/navigation-bar.jsx'
import stringUtility from '@utilities/string.jsx'
import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'

const themeStates = createStructuredSelector({
  textTheme: (_state) => _state.textTheme
}, createSelector)

export default function FooterNavigationBar() {
  const {textTheme} = useSelector(themeStates)
  const {renderNavigationItems} = useNavigationBar()

  const activeNavigationItemClassName = useMemo(() => {
    return stringUtility.merge([
      `font-bold ${textTheme.accentColor700}`
    ])
  }, [textTheme.accentColor700])

  const nonActiveNavigationItemClassName = useMemo(() => {
    return stringUtility.merge([
      textTheme.hover.accentColor700
    ])
  }, [textTheme.hover.accentColor700])

  return <nav
    className={stringUtility.merge([
      'content-mt lg:mt-0 lg:basis-8/12',
      'grid grid-cols-2 lg:grid-cols-4 lg:justify-items-end',
      'content-gap-y lg:gap-y-0'
    ])}>
    {renderNavigationItems(
      navigationItemConstant.allNavigationItems,
      '',
      activeNavigationItemClassName,
      nonActiveNavigationItemClassName,
      false
    )}
  </nav>
}
