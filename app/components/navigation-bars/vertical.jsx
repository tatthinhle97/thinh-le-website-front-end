import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import navigationItemConstant from '../../constants/navigation-item.jsx'
import useNavigationBar from '../../hooks/navigation-bar.jsx'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector({
  backgroundTheme: (_state) => _state.backgroundTheme,
  textTheme: (_state) => _state.textTheme
}, createSelector)

export default function VerticalNavigationBar() {
  const {backgroundTheme, textTheme} = useSelector(themeStates)
  const {renderNavigationItems} = useNavigationBar()

  const activeNavigationItemClassName = useMemo(() => {
    return stringUtility.merge([
      backgroundTheme.accentColor700,
      textTheme.primaryColor
    ])
  }, [
    backgroundTheme.accentColor700,
    textTheme.primaryColor
  ])

  const nonActiveNavigationItemClassName = useMemo(() => {
    return stringUtility.merge([
      backgroundTheme.hover.accentColor700,
      textTheme.hover.primaryColor
    ])
  }, [
    backgroundTheme.hover.accentColor700,
    textTheme.hover.primaryColor
  ])

  const onVerticalNavigationBarClick = (_event) => {
    _event.stopPropagation()
  }

  return <nav
    onClick={onVerticalNavigationBarClick}
    className={stringUtility.merge([
      'flex flex-col space-y-1'
    ])}>
    {renderNavigationItems(
      navigationItemConstant.allNavigationItems,
      'section-px py-2 font-medium',
      activeNavigationItemClassName,
      nonActiveNavigationItemClassName
    )}
  </nav>
}
