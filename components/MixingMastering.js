'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Play, Download, Sparkles, Wand2, Sliders, Volume2 } from 'lucide-react'

export default function MixingMastering() {
  const [isClient, setIsClient] = useState(false)
  const [audioFile, setAudioFile] = useState(null)
  const [instrumentTracks, setInstrumentTracks] = useState([
    { id: 1, name: null, file: null },
    { id: 2, name: null, file: null },
    { id: 3, name: null, file: null },
    { id: 4, name: null, file: null },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [settings, setSettings] = useState({
    volume: 0,
    compression: 50,
    eq: 50,
    stereoWidth: 50,
    reverb: 20,
    limiting: 70
  })
  const fileInputRef = useRef(null)
  const trackInputRefs = useRef([
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAudioFile({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      })
    }
  }

  const handleTrackUpload = (trackId, e) => {
    const file = e.target.files[0]
    if (file) {
      setInstrumentTracks(prev => prev.map(track => 
        track.id === trackId 
          ? { ...track, name: file.name, file: file, size: file.size }
          : track
      ))
    }
  }

  const removeTrack = (trackId) => {
    setInstrumentTracks(prev => prev.map(track => 
      track.id === trackId 
        ? { ...track, name: null, file: null, size: null }
        : track
    ))
  }

  const startProcessing = async () => {
    if (!audioFile) return
    
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    setProcessedAudio({
      id: Date.now(),
      name: `Mastered_${audioFile.name}`,
      duration: '3:24'
    })
    setIsProcessing(false)
  }

  const presets = [
    { id: 'radio', name: 'Radio Ready', icon: '📻' },
    { id: 'streaming', name: 'Streaming', icon: '🎵' },
    { id: 'club', name: 'Club Mix', icon: '🎧' },
    { id: 'vinyl', name: 'Vinyl Warm', icon: '💿' },
  ]

  if (!isClient) return <div className="h-96"></div>

  return (
    <div className="space-y-6">
      {/* Mixing & Mastering Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 animate-pulse"></div>
        <div className="relative p-6 hologram rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sliders className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold neon-text">AI Mixing & Mastering</h3>
                <p className="text-xs text-cyan-400">Professional Audio Processing</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 font-medium">AI Active</span>
            </div>
          </div>

          {/* Upload Audio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Upload Audio Track
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
              className="relative border-2 border-dashed border-slate-700/50 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-all cursor-pointer bg-slate-800/30 hover:bg-slate-800/50"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {audioFile ? audioFile.name : 'Upload your track'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {audioFile ? `${(audioFile.size / 1024 / 1024).toFixed(2)} MB` : 'WAV, MP3, FLAC supported'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Instrument Tracks */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Individual Instrument Tracks (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {instrumentTracks.map((track, index) => (
                <div key={track.id} className="relative">
                  <input
                    ref={trackInputRefs.current[index]}
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleTrackUpload(track.id, e)}
                    className="hidden"
                  />
                  <div
                    onClick={() => !track.file && trackInputRefs.current[index].current?.click()}
                    className={`relative border border-slate-700/50 rounded-lg p-3 transition-all cursor-pointer ${
                      track.file 
                        ? 'bg-slate-800/50 border-cyan-500/30' 
                        : 'bg-slate-800/30 hover:bg-slate-800/50 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        track.file 
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                          : 'bg-slate-700/50'
                      }`}>
                        {track.file ? (
                          <Volume2 className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <span className="text-xs text-slate-500 font-bold">{track.id}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">
                          {track.name || `Track ${track.id}`}
                        </p>
                        <p className="text-xs text-slate-500">
                          {track.size ? `${(track.size / 1024 / 1024).toFixed(2)} MB` : 'Click to upload'}
                        </p>
                      </div>
                      {track.file && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeTrack(track.id)
                          }}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              💡 Upload individual stems (vocals, drums, bass, melody) for advanced mixing
            </p>
          </div>

          {/* Presets */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-3">Quick Presets</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  className="px-3 py-2.5 bg-slate-800/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 text-slate-400 hover:text-white border border-slate-700/50 hover:border-transparent rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <span>{preset.icon}</span>
                  <span className="text-xs">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Volume</span>
                <span className="text-cyan-400">{settings.volume > 0 ? '+' : ''}{settings.volume} dB</span>
              </label>
              <input
                type="range"
                min="-12"
                max="12"
                value={settings.volume}
                onChange={(e) => setSettings({...settings, volume: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Compression</span>
                <span className="text-blue-400">{settings.compression}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.compression}
                onChange={(e) => setSettings({...settings, compression: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>EQ Enhancement</span>
                <span className="text-purple-400">{settings.eq}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.eq}
                onChange={(e) => setSettings({...settings, eq: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Stereo Width</span>
                <span className="text-pink-400">{settings.stereoWidth}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.stereoWidth}
                onChange={(e) => setSettings({...settings, stereoWidth: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Reverb</span>
                <span className="text-green-400">{settings.reverb}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.reverb}
                onChange={(e) => setSettings({...settings, reverb: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Limiting</span>
                <span className="text-orange-400">{settings.limiting}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.limiting}
                onChange={(e) => setSettings({...settings, limiting: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>

          {/* Process Button */}
          <button
            onClick={startProcessing}
            disabled={!audioFile || isProcessing}
            className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 rounded-xl flex items-center justify-center gap-3 text-white font-bold transition-all shadow-xl">
              {isProcessing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Processing Audio...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Master Track with AI
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Processed Audio Result */}
      {processedAudio && (
        <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{processedAudio.name}</h4>
                <p className="text-xs text-slate-400">{processedAudio.duration} • Mastered</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
              <span className="text-xs text-green-400 font-medium">✓ Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg">
              <Play className="w-5 h-5 ml-0.5" />
            </button>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
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
