import React, {useEffect, useRef, useState} from 'react'
import {
  Cancel01Icon,
  ChatBotIcon,
  SentIcon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import shadowThemeSlice from '../../../../redux/slices/theme/shadow.jsx'
import renderUtility from '../../../../utilities/render.jsx'
import stringUtility from '../../../../utilities/string.jsx'
import IconButton from '../../../buttons/icon.jsx'
import TextAreaInput from '../../../inputs/textarea.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    shadowTheme: (_state) => _state.shadowTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function ChatWindow({
  ref
}) {
  const {
    backgroundTheme,
    borderTheme,
    shadowTheme,
    textTheme
  } = useSelector(themeStates)

  const messagesContainerRef = useRef(null)
  const messagesContainerEndRef = useRef(null)
  const chatWindowRef = useRef(null)

  const [messagesContainerHeight, setMessagesContainerHeight] = useState(0)
  console.log(messagesContainerHeight)
  const [userMessage, setUserMessage] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! How can I help you today?',
      timestamp: new Date()
    }
  ])

  useEffect(() => {
    // Scroll to the end when has new message
    messagesContainerEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, isBotTyping])

  useEffect(() => {
    const updateHeight = () => {
      if (messagesContainerRef.current) {
        setMessagesContainerHeight(messagesContainerRef.current.offsetHeight)
      }
    }

    updateHeight()
  }, [])

  const toggleChatWindow = () => {
    chatWindowRef.current.classList.toggle('hidden')
  }

  const onUserMessageValueChange = (_event) => {
    setUserMessage(_event.target.value)
  }

  const simulateBotReply = () => {
    setIsBotTyping(true)

    const newBotMessage = {
      id: messages.length + 2,
      sender: 'bot',
      text: 'I\'m just a bot, but I\'m learning!',
      timestamp: new Date()
    }

    setMessages((previousMessages) =>
      [...previousMessages, newBotMessage]
    )
    setIsBotTyping(false)
  }

  const sendUserMessage = () => {
    if (!userMessage.trim() || isBotTyping) {
      return
    }

    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: userMessage,
      timestamp: new Date()
    }

    setMessages((previousMessages) =>
      [...previousMessages, newUserMessage]
    )
    simulateBotReply()
    setUserMessage('')
  }

  const onEnterKeyDown = (_event) => {
    if (_event.key === 'Enter') {
      if (!isBotTyping) {
        if (!_event.shiftKey) {
          _event.preventDefault()
          sendUserMessage()
        }
      } else {
        // Prevent user from sending message
        _event.preventDefault()
      }
    }
  }

  const renderChatProfileImage = (_imageSource, _imageAlt) => {
    return <img
      src={_imageSource}
      alt={_imageAlt}
      className='w-10 h-10 rounded-full object-cover' />
  }

  return <div
    ref={ref}
    className={stringUtility.merge([
      'fixed bottom-18 lg:bottom-22 left-4 lg:left-auto right-4 z-40',
      'flex-col hidden',
      'w-auto lg:w-144 h-144 rounded-big-1 shadow-lg',
      shadowTheme.opacity.fourty.accentColor700
    ])}>
    {/* Header */}
    <div className={stringUtility.merge([
      'px-4 py-2 font-semibold rounded-t-big-1',
      backgroundTheme.secondaryColor,
      textTheme.primaryColor
    ])}>
      <div className={'flex justify-between'}>
        <p className={'flex gap-2'}>
          <HugeiconsIcon icon={ChatBotIcon} className={'wh-normal'} />
          Chatbot
        </p>
        <IconButton
          ariaLabel={'Close chat window icon button'}
          onClick={toggleChatWindow}>
          <HugeiconsIcon icon={Cancel01Icon} className={'wh-normal'} />
        </IconButton>
      </div>
    </div>

    {/* Message Area */}
    <div
      ref={messagesContainerRef}
      className={stringUtility.merge([
        'flex-1 overflow-auto px-4 py-4 flex flex-col',
        backgroundTheme.primaryColor
      ])}>
      <div className={'flex-1 flex flex-col gap-y-2 justify-end\n'}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {renderUtility.renderIfTrue(
              message.sender === 'bot',
              renderChatProfileImage('/bot-avatar.png', 'Bot'))}

            <p
              className={stringUtility.merge([
                'px-4 py-2 w-fit max-w-[70%] rounded-normal',
                'whitespace-pre-wrap wrap-break-word',
                message.sender === 'user'
                  ? stringUtility.merge([
                    'rounded-br-none',
                    backgroundTheme.accentColor700,
                    textTheme.primaryColor
                  ])
                  : `${backgroundTheme.secondaryColor100} rounded-bl-none`
              ])}>
              {message.text}
            </p>

            {renderUtility.renderIfTrue(
              message.sender === 'user',
              renderChatProfileImage('/user-avatar.jpg', 'User'))}
          </div>
        ))}
      </div>

      {isBotTyping && (
        <div className={`pl-12 mt-2 text-small-1 italic ${textTheme.secondaryColor600}`}>
          Chatbot is typing...
        </div>
      )}

      <div ref={messagesContainerEndRef} />
    </div>

    {/* Input Area */}
    <div className={stringUtility.merge([
      'px-4 py-2 flex gap-4 items-center p-2 rounded-b-big-1 border-t-1',
      borderTheme.secondaryColor300,
      backgroundTheme.primaryColor
    ])}>
      <TextAreaInput
        containerClassName={'grow'}
        id={'input-message'}
        rows={1}
        label={'Chatbot message input'}
        shouldDisplayLabel={false}
        name={'input-message'}
        placeholder={'Ask me something'}
        value={userMessage}
        onValueChange={onUserMessageValueChange}
        onKeyDown={onEnterKeyDown} />
      <IconButton
        ariaLabel={'Send message button'}
        onClick={sendUserMessage}
        className={textTheme.hover.accentColor700}>
        <HugeiconsIcon icon={SentIcon} className={'wh-normal'} />
      </IconButton>
    </div>
  </div>
}
