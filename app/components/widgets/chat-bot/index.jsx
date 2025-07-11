import React, {useRef} from 'react'
import {
  MessageMultiple02Icon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'
import ChatWindow from './chat-window/index.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function ChatBotWidget() {
  const {
    backgroundTheme,
    textTheme
  } = useSelector(themeStates)

  const chatWindowRef = useRef(null)

  const toggleChatWindow = () => {
    ['flex', 'hidden'].forEach(className =>
      chatWindowRef.current.classList.toggle(className)
    )
  }

  return <div className={'relative w-full'}>
    {/* Floating Button */}
    <button
      onClick={toggleChatWindow}
      className={stringUtility.merge([
        'fixed bottom-6 right-4 lg:right-6 p-2 lg:p-4 rounded-full cursor-pointer z-40',
        backgroundTheme.hover.accentColor700,
        backgroundTheme.secondaryColor,
        textTheme.primaryColor
      ])}
      aria-label='Chat bot icon'>
      <HugeiconsIcon icon={MessageMultiple02Icon} className={'wh-normal'} />
    </button>
    <ChatWindow
      ref={chatWindowRef}
      onCloseButtonClick={toggleChatWindow} />
  </div>
}
