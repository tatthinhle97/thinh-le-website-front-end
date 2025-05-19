import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import navigationItemConstant from '../../constants/navigation-item.jsx'
import useNavigationBar from '../../hooks/navigation-bar.jsx'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector({
  borderTheme: (_state) => _state.borderTheme,
  textTheme: (_state) => _state.textTheme
}, createSelector)

export default function HeaderNavigationBar() {
  const {borderTheme, textTheme} = useSelector(themeStates)
  const {renderNavigationItems} = useNavigationBar()

  const activeNavigationItemClassName = useMemo(() => {
    return stringUtility.merge([
      `font-bold ${textTheme.accentColor700}`,
      'before:w-4 before:h-4 before:border-b-2 before:border-l-2',
      'before:absolute before:-bottom-2 before:-left-2',
      borderTheme.before.accentColor700,
      'after:w-4 after:h-4 after:border-t-2 after:border-r-2',
      'after:absolute after:-top-2 after:-right-2',
      borderTheme.after.accentColor700
    ])
  }, [
    borderTheme.after.accentColor700,
    borderTheme.before.accentColor700,
    textTheme.accentColor700
  ])

  const nonActiveNavigationItemClassName = useMemo(() => {
    return stringUtility.merge([
      textTheme.hover.accentColor700,
      'before:w-4 before:h-4 before:border-b-2 before:border-l-2',
      borderTheme.before.accentColor700,
      'before:absolute before:bottom-0 before:left-0',
      'before:transition-transform',
      'hover:before:-translate-x-2 hover:before:translate-y-2',
      'before:opacity-0 before:transition-opacity',
      'hover:before:opacity-100',
      'after:w-4 after:h-4 after:border-t-2 after:border-r-2',
      borderTheme.after.accentColor700,
      'after:absolute after:top-0 after:right-0',
      'after:transition-transform',
      'hover:after:translate-x-2 hover:after:-translate-y-2',
      'after:opacity-0 after:transition-opacity',
      'hover:after:opacity-100'
    ])
  }, [
    borderTheme.after.accentColor700,
    borderTheme.before.accentColor700,
    textTheme.hover.accentColor700
  ])

  return <nav
    className={'hidden lg:flex lg:gap-10 lg:items-center'}>
    {renderNavigationItems(
      navigationItemConstant.allNavigationItems,
      'relative uppercase',
      activeNavigationItemClassName,
      nonActiveNavigationItemClassName
    )}
  </nav>
}
