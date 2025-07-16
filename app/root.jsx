import store from './redux/store.jsx'
import {Provider} from 'react-redux'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet
} from 'react-router'

import './app.css'
import Body from './components/body.jsx'

export function Layout({children}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        <Meta />
        <Links />
      </head>
      <Provider store={store}>
        <Body>
          {children}
        </Body>
      </Provider>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({error}) {
  console.error(error)
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return <>
    <h1>{message}</h1>
    <p>{details}</p>
    {stack && (
      <pre className='w-full p-4 overflow-x-auto'>
        <code>{stack}</code>
      </pre>
    )}
  </>
}
