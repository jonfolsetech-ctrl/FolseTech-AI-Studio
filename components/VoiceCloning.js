'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Play, Download, Sparkles, Wand2 } from 'lucide-react'

export default function VoiceCloning() {
  const [isClient, setIsClient] = useState(false)
  const [voiceSample, setVoiceSample] = useState(null)
  const [targetText, setTargetText] = useState('')
  const [isCloning, setIsCloning] = useState(false)
  const [clonedVoice, setClonedVoice] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVoiceSample({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      })
    }
  }

  const startCloning = async () => {
    if (!voiceSample || !targetText.trim()) return
    
    setIsCloning(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setClonedVoice({
      id: Date.now(),
      text: targetText,
      duration: '0:15'
    })
    setIsCloning(false)
  }

  if (!isClient) return <div className="h-96"></div>

  return (
    <div className="space-y-6">
      {/* Voice Cloning Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 animate-pulse"></div>
        <div className="relative p-6 hologram rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold neon-text">AI Voice Cloning</h3>
                <p className="text-xs text-purple-400">Neural Voice Synthesis</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-xs text-purple-400 font-medium">AI Powered</span>
            </div>
          </div>

          {/* Upload Voice Sample */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Upload Voice Sample (15-30 seconds recommended)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-slate-700/50 hover:border-purple-500/50 rounded-xl p-6 text-center transition-all cursor-pointer bg-slate-800/30 hover:bg-slate-800/50"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {voiceSample ? voiceSample.name : 'Upload audio file'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {voiceSample ? `${(voiceSample.size / 1024 / 1024).toFixed(2)} MB` : 'MP3, WAV, or M4A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Text to Generate ({targetText.length} characters)
            </label>
            <textarea
              value={targetText}
              onChange={(e) => setTargetText(e.target.value)}
              placeholder="Enter the text you want the cloned voice to speak..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            />
          </div>

          {/* Clone Button */}
          <button
            onClick={startCloning}
            disabled={!voiceSample || !targetText.trim() || isCloning}
            className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 rounded-xl flex items-center justify-center gap-3 text-white font-bold transition-all shadow-xl">
              {isCloning ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Cloning Voice...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Clone Voice with AI
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Cloned Voice Result */}
      {clonedVoice && (
        <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Cloned Voice Output</h4>
                <p className="text-xs text-slate-400">{clonedVoice.duration} • Ready to play</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg">
              <Play className="w-5 h-5 ml-0.5" />
            </button>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <button className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
