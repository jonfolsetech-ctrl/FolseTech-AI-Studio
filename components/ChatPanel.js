'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function ChatPanel() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
    setMessages([
      { 
        role: 'assistant', 
        content: 'Hello! I\'m your AI assistant. How can I help you create amazing content today?',
        timestamp: new Date().toLocaleTimeString()
      }
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant',
        content: 'I understand your request. Let me help you with that. I can assist with audio processing, content generation, and creative workflows.',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50"></div>
          <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">AI Assistant</h3>
          <p className="text-xs text-slate-400">Always here to help</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {isClient && messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              message.role === 'user'
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 border border-slate-700/50 text-slate-100'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-slate-500 mt-1 px-2">{message.timestamp}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-700 disabled:to-slate-700 rounded-lg transition-all disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}
