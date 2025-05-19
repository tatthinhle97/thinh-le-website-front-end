
import {useSelector} from 'react-redux'
import {Scripts, ScrollRestoration} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function Body({children}) {
  const {backgroundTheme, textTheme} = useSelector(themeStates)

  return <body
    className={stringUtility.merge([
      'min-w-80 relative text-normal',
      backgroundTheme.primaryColor,
      textTheme.secondaryColor
    ])}>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
    <ScrollRestoration />
    <Scripts />
  </body>
}
