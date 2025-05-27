import React, {useEffect, useRef, useState} from 'react'

export default function MessengerChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! How can I help you today?',
      delivered: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  const simulateBotReply = () => {
    setIsTyping(true)

    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'I\'m just a bot, but I\'m learning!',
        delivered: true,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      delivered: true,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    simulateBotReply()
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, isTyping])

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  return (
    <div className='fixed bottom-4 right-4 w-[90%] max-w-sm h-[80vh] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-gray-200 z-2'>
      {/* Header */}
      <div className='bg-blue-600 text-white px-4 py-2 font-semibold'>
        Chat with ThinhBot
      </div>

      {/* Message Area */}
      <div className='flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                  {formatTime(msg.timestamp)}
                </div>
              </div>
              {msg.sender === 'user' && (
                <img
                  src='/user-avatar.png'
                  alt='You'
                  className='w-8 h-8 rounded-full object-cover' />
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className='flex justify-start items-center gap-2 pl-10 text-sm text-gray-500 italic'>
            <div className='dot-flashing'></div>
            ThinhBot is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className='flex items-center border-t p-2 bg-white'>
        <input
          type='text'
          className='flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring'
          placeholder='Type a message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
        <button
          onClick={handleSend}
          className='ml-2 text-blue-600 font-semibold'>
          Send
        </button>
      </div>

      {/* Typing animation styles */}
      <style>{`
        .dot-flashing {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #aaa;
          color: #aaa;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }

        @keyframes dotFlashing {
          0% { background-color: #aaa; }
          50%, 100% { background-color: #ccc; }
        }
      `}</style>
    </div>
  )
}
