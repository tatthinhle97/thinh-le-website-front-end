import React, {useEffect, useRef, useState} from 'react'
import {
  Cancel01Icon,
  ChatBotIcon,
  MessageMultiple02Icon,
  SentIcon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
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

    setTimeout(() => {
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
    }, 250)
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
  }

  const onEnterKeyDown = (_event) => {
    if (_event.key === 'Enter') {
      if (!isBotTyping) {
        if (!_event.shiftKey) {
          sendUserMessage()
          // Clear input value
          _event.preventDefault()
          setUserMessage('')
        }
      } else {
        // Prevent user from sending message
        _event.preventDefault()
      }
    }
  }

  return <div>
    {/* Floating Button */}
    <button
      onClick={toggleChatWindow}
      className={stringUtility.merge([
        'fixed bottom-6 right-4 p-2 lg:p-4 rounded-full cursor-pointer z-50',
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
        'fixed bottom-18 lg:bottom-22 right-4 z-50 flex flex-col hidden',
        'w-[90%] max-w-md h-96 h-[60vh] shadow-xl/50 rounded-big-1'
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
          'flex-1 gap-y-2 overflow-y-auto',
          'flex flex-col justify-end',
          'px-4 py-2',
          backgroundTheme.primaryColor
        ])}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className='flex items-end gap-2 max-w-[80%]'>
              {msg.sender === 'bot' && (
                <img
                  src='/bot-avatar.png'
                  alt='Bot'
                  className='w-8 h-8 rounded-full object-cover' />
              )}
              <div className='relative'>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-black rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
                <div className='text-[11px] text-gray-400 mt-1 text-right'>
                  {'time'}
                </div>
              </div>
              {msg.sender === 'user' && (
                <img
                  src='/user-avatar.jpg'
                  alt='You'
                  className='w-8 h-8 rounded-full object-cover' />
              )}
            </div>
          </div>
        ))}

        {isBotTyping && (
          <div className='flex justify-start items-center gap-2 pl-10 text-sm text-gray-500 italic'>
            <div className='dot-flashing'></div>
            ThinhBot is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
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
        <HugeiconsIcon icon={SentIcon} className={'wh-normal'} />
      </div>
    </div>
  </div>
}
