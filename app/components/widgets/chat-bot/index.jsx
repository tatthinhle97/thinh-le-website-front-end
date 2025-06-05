import {useState} from 'react'
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

  const [isOpen, setIsOpen] = useState(false)

  const toggleChatWindow = () => {
    setIsOpen(!isOpen)
  }

  return <div>
    {/* Floating Button */}
    <button
      onClick={toggleChatWindow}
      className={stringUtility.merge([
        'fixed bottom-6 right-4 p-2 rounded-full cursor-pointer z-50',
        backgroundTheme.hover.accentColor700,
        backgroundTheme.secondaryColor,
        textTheme.primaryColor
      ])}
      aria-label='Chat bot icon'>
      <HugeiconsIcon icon={MessageMultiple02Icon} />
    </button>

    {/* Chat Window */}
    {isOpen && (
      <div className='fixed bottom-18 right-4 w-[90%] max-w-sm h-96 bg-white border shadow-xl rounded-xl p-4 z-50'>
      </div>
    )}
  </div>
}
