import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import navigationItemConstant from '../../constants/navigation-item.jsx'
import useNavigationBar from '../../hooks/navigation-bar.jsx'

const themeStates = createStructuredSelector({
  borderTheme: (_state) => _state.borderTheme,
  textTheme: (_state) => _state.textTheme
}, createSelector)

export default function HeaderNavigationBar() {
  const {textTheme} = useSelector(themeStates)
  const {renderNavigationItems} = useNavigationBar()

  return <nav
    className={'hidden lg:inline-flex lg:space-x-8 lg:items-center'}>
    {renderNavigationItems(
      navigationItemConstant.allNavigationItems,
      'relative',
      `font-medium ${textTheme.accentColor700}`,
      textTheme.hover.accentColor700
    )}
  </nav>
}
