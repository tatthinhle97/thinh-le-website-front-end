import {useEffect, useRef, useState} from 'react'
import {MessageMultiple02Icon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import stringUtility from '../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function ChatBotWidget() {
  const {backgroundTheme, textTheme} = useSelector(themeStates)

  const chatWindowRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const toggleChatWindow = () => {
    setIsOpen(!isOpen)
  }

  // Hide chat window when click outside
  useEffect(() => {
    const hidechatWindowWhenClickOutside = (event) => {
      let clickedOutside = true;

      [
        searchButtonRef,
        searchPanelRef,
        filterButtonRef,
        filterPanelRef
      ].forEach((_elementRef) => {
        if (_elementRef.current && _elementRef.current.contains(event.target)) {
          clickedOutside = false
        }
      })

      if (clickedOutside) {
        hidePanelByName(activePanelName)
      }
    }

    // Add listener when component mounts
    document.addEventListener('click', hidePanelWhenClickOutside)

    // Cleanup the listener when component unmounts
    return () => {
      document.removeEventListener('click', hidePanelWhenClickOutside)
    }
  }, [activePanelName, hidePanelByName])

  return <div>
    {/* Floating Button */}
    <button
      onClick={toggleChatWindow}
      className={stringUtility.merge([
        'fixed bottom-6 right-4 p-4 rounded-full cursor-pointer z-50',
        backgroundTheme.hover.accentColor700,
        backgroundTheme.secondaryColor,
        textTheme.primaryColor
      ])}
      aria-label='Chat bot icon'>
      <HugeiconsIcon icon={MessageMultiple02Icon} />
    </button>

    {/* Chat Window */}
    {isOpen && (
      <div ref={chatWindowRef} className='fixed bottom-20 right-6 w-96 h-96 bg-white border shadow-xl rounded-xl p-4 z-50'>
      </div>
    )}
  </div>
}
