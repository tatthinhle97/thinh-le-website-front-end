
import {useSelector} from 'react-redux'
import {Scripts, ScrollRestoration} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../utilities/string.jsx'
import Footer from './footer.jsx'
import Header from './header.jsx'
import ChatBotWidget from './widgets/chat-bot/index.jsx'

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
      // Define grid in body tag to prevent the layout shift issue
      'min-w-80 relative text-lg grid min-h-dvh grid-rows-[auto_auto_1fr_auto]',
      backgroundTheme.primaryColor,
      textTheme.secondaryColor
    ])}>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
    <ChatBotWidget />
    <ScrollRestoration />
    <Scripts />
  </body>
}
