import React, {useEffect, useRef, useState} from 'react'
import {
  Cancel01Icon,
  ChatBotIcon, Hamburger01Icon,
  MessageMultiple02Icon,
  SentIcon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import renderUtility from '../../../utilities/render.jsx'
import stringUtility from '../../../utilities/string.jsx'
import IconButton from '../../buttons/icon.jsx'
import TextAreaInput from '../../inputs/textarea.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function ChatBotWidget() {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  const messagesEndRef = useRef(null)
  const chatWindowRef = useRef(null)

  const [userMessage, setUserMessage] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! How can I help you today?',
      delivered: true,
      timestamp: new Date()
    }
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, isBotTyping])

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
      delivered: true,
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
      delivered: true,
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
      className='w-8 h-8 rounded-full object-cover' />
  }

  return <div className={'relative w-full'}>
    {/* Floating Button */}
    <button
      onClick={toggleChatWindow}
      className={stringUtility.merge([
        'fixed bottom-6 right-4 p-2 lg:p-4 rounded-full cursor-pointer z-40',
        backgroundTheme.hover.accentColor700,
        backgroundTheme.secondaryColor,
        textTheme.primaryColor
      ])}
      aria-label='Chat bot icon'>
      <HugeiconsIcon icon={MessageMultiple02Icon} className={'wh-normal'} />
    </button>

    {/* Chat Window */}
    <div
      ref={chatWindowRef}
      className={stringUtility.merge([
        'fixed bottom-18 lg:bottom-22 left-4 right-4 lg:left-auto lg:right-4 z-40',
        'flex flex-col hidden',
        'lg:max-w-lg h-96 h-[70vh] shadow-xl/40 rounded-big-1' //
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
        className={stringUtility.merge([
          'flex-1 overflow-auto',
          'px-4 py-2 flex flex-col-reverse',
          backgroundTheme.primaryColor
        ])}>
        <div className={'flex flex-col gap-y-2 mt-auto'}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {renderUtility.renderIfTrue(
                message.sender === 'bot',
                renderChatProfileImage('/bot-avatar.png', 'Bot'))}

              <p
                className={stringUtility.merge([
                  'px-4 py-2 w-fit max-w-[70%] rounded-normal mb-4',
                  'whitespace-pre-wrap wrap-break-word',
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 rounded-bl-none'
                ])}>
                {message.text}
              </p>

              {renderUtility.renderIfTrue(
                message.sender === 'user',
                renderChatProfileImage('/user-avatar.png', 'User'))}
            </div>
          ))}

          {isBotTyping && (
            <div className='flex justify-start items-center gap-2 pl-10 text-small-1 text-gray-500 italic'>
              <div className='dot-flashing'></div>
              ThinhBot is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
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
  </div>
}
