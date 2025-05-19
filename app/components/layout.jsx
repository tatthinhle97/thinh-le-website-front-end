import {Outlet} from 'react-router'
import Header from './header.jsx'
import stringUtility from '../utilities/string.jsx'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Layout() {
  const {backgroundTheme, textTheme} = useSelector(themeStates)

  return <div
    className={stringUtility.merge([
      'min-w-80 relative text-normal',
      backgroundTheme.primaryColor,
      textTheme.secondaryColor
    ])}>
    <Header />
    <main>
      {/* This is where child routes render */}
      <Outlet />
    </main>
  </div>
}
