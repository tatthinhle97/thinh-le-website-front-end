import React, {useEffect, useRef, useState} from 'react'
import {
  Cancel01Icon,
  ChatBotIcon,
  PauseIcon,
  SentIcon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router'
import {createSelector, createStructuredSelector} from 'reselect'
import chatApi from '../../../../apis/chat.js'
import iconConstant from '../../../../constants/icon.jsx'
import chatbotAnswerTemplateConstant from '../../../../constants/templates/chatbot-answer.jsx'
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
  ref,
  onCloseButtonClick
}) {
  const {
    backgroundTheme,
    borderTheme,
    shadowTheme,
    textTheme
  } = useSelector(themeStates)

  const messagesContainerRef = useRef(null)
  const messagesContainerEndRef = useRef(null)

  const [userMessage, setUserMessage] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      content: process.env.NODE_ENV === 'production'
        ? 'Sorry, this function is not available at the moment.'
        : 'Hi there! I can help you navigate this website quickly. Please start by asking me something.',
      payload: {}
    }
  ])

  useEffect(() => {
    // Scroll to the end when has new message
    messagesContainerEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, isBotTyping])

  const onUserMessageValueChange = (_event) => {
    setUserMessage(_event.target.value)
  }

  const addBotMessageToChatWindow = () => {
    setIsBotTyping(true)

    chatApi.sendMessage(userMessage)
      .then(pointDto => {
        const newBotMessage = {
          sender: 'bot',
          content: '',
          payload: undefined
        }

        if (pointDto?.payload) {
          newBotMessage.payload = pointDto.payload

          // Page navigation: add a template answer
          if (pointDto.payload.type === 1) {
            const pageNavigationAnswerTemplate = chatbotAnswerTemplateConstant
              .pickRandomTemplate(chatbotAnswerTemplateConstant.pageNavigationTemplates)

            pointDto.payload.templateAnswer = pageNavigationAnswerTemplate
          }
        }

        setMessages((previousMessages) =>
          [...previousMessages, newBotMessage])
      })

    setIsBotTyping(false)
  }

  const addUserMessageToChatWindow = () => {
    if (!userMessage.trim() || isBotTyping) {
      return
    }

    const newUserMessage = {
      sender: 'user',
      content: userMessage,
      payload: {}
    }

    setMessages((previousMessages) =>
      [...previousMessages, newUserMessage]
    )
  }

  const onEnterKeyDown = (_event) => {
    if (_event.key === 'Enter') {
      if (!isBotTyping) {
        if (!_event.shiftKey) {
          _event.preventDefault()
          addUserMessageToChatWindow()
          setUserMessage('')
          addBotMessageToChatWindow()
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
      className='size-11 rounded-full object-cover' />
  }

  function renderBotMessageByPayload(_message) {
    // Search for page
    if (_message.payload.type === 1) {

      return <>
        {_message.payload.description}
        <br />
        {_message.payload.templateAnswer}
        <span>
          <Link
            aria-label={'navigation-link'}
            className={stringUtility.merge([
              'font-medium underline',
              textTheme.hover.accentColor700
            ])}
            to={{
              pathname: _message.payload.path
            }}>
            {_message.payload.title}
          </Link>
          {' '}page.
        </span>
      </>
    }
    // FAQ
    else {
      return <>
        {_message.payload.answer}
      </>
    }
  }

  function getNotFoundMessage() {
    return 'I can only answer queries related to this website, please try again with another query 😁.'
  }

  function renderMessageContent(_message) {
    const commonClassName = 'px-3 py-2 w-fit max-w-[70%] rounded-md whitespace-pre-wrap wrap-break-word'

    if (_message.sender === 'user') {
      return <p
        className={stringUtility.merge([
          commonClassName,
          'rounded-br-none',
          backgroundTheme.accentColor700,
          textTheme.primaryColor
        ])}>
        {_message.content}
      </p>
    }

    return <p
      className={stringUtility.merge([
        `${commonClassName} ${backgroundTheme.secondaryColor100} rounded-bl-none`
      ])}>
      {_message.content
        ? _message.content
        : _message.payload
          ? renderBotMessageByPayload(_message)
          : getNotFoundMessage()}
    </p>
  }

  return <div
    ref={ref}
    className={stringUtility.merge([
      'fixed bottom-18 lg:bottom-22 left-4 lg:left-auto right-4 lg:right-6 z-40',
      'flex-col hidden',
      'w-auto lg:w-144 h-144 rounded-lg shadow-lg',
      shadowTheme.opacity.fourty.accentColor700
    ])}>
    {/* Header */}
    <div className={stringUtility.merge([
      'px-4 py-2 font-semibold rounded-t-lg',
      backgroundTheme.secondaryColor,
      textTheme.primaryColor
    ])}>
      <div className={'flex justify-between'}>
        <p className={'flex gap-2'}>
          <HugeiconsIcon icon={ChatBotIcon} size={iconConstant.defaultSize} />
          Chatbot
        </p>
        <IconButton
          ariaLabel={'Close chat window icon button'}
          onClick={onCloseButtonClick}>
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={iconConstant.defaultSize}
            className={'cursor-pointer'} />
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
        {messages.map((_message, _index) => (
          <div
            key={_index}
            className={`flex gap-2 items-end ${_message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {renderUtility.renderIfTrue(
              _message.sender === 'bot',
              renderChatProfileImage('/bot-avatar.png', 'Bot'))}
            {renderMessageContent(_message)}
            {renderUtility.renderIfTrue(
              _message.sender === 'user',
              renderChatProfileImage('/user-avatar.jpg', 'User'))}
          </div>
        ))}
      </div>

      {isBotTyping && (
        <div className={`pl-12 mt-2 small-text italic ${textTheme.secondaryColor600}`}>
          Chatbot is typing...
        </div>
      )}

      <div ref={messagesContainerEndRef} />
    </div>

    {/* Input Area */}
    <div className={stringUtility.merge([
      'px-4 py-2 flex gap-4 items-center p-2 rounded-b-lg border-t-1',
      borderTheme.secondaryColor300,
      backgroundTheme.primaryColor
    ])}>
      <TextAreaInput
        isDisabled={process.env.NODE_ENV === 'production'}
        containerClassName={'grow'}
        id={'input-message'}
        rows={1}
        label={'Chatbot message input'}
        shouldDisplayLabel={false}
        name={'input-message'}
        placeholder={process.env.NODE_ENV === 'production' ? 'Disabled' : 'Ask me something'}
        value={userMessage}
        onValueChange={onUserMessageValueChange}
        onKeyDown={onEnterKeyDown} />
      <IconButton
        isDisabled={process.env.NODE_ENV === 'production'}
        ariaLabel={'Send message button'}
        onClick={addUserMessageToChatWindow}
        className={stringUtility.merge([
          textTheme.hover.accentColor700,
          isBotTyping ? 'cursor-default' : 'cursor-pointer'
        ])}>
        {isBotTyping
          ? <HugeiconsIcon icon={PauseIcon} size={24} />
          : <HugeiconsIcon icon={SentIcon} size={24} />}
      </IconButton>
    </div>
  </div>
}
