'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Download, Zap, Wand2, Sparkles, Volume2, Music } from 'lucide-react'

export default function BeatGenerator() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(null)
  const [bpm, setBpm] = useState(120)
  const [genre, setGenre] = useState('electronic')
  const [intensity, setIntensity] = useState(50)
  const [musicStyle, setMusicStyle] = useState('melodic')
  const [customStyle, setCustomStyle] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [includeVocals, setIncludeVocals] = useState(false)
  const audioContextRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
  }, [])

  const genres = [
    { id: 'electronic', name: 'Electronic', color: 'from-cyan-500 to-blue-500' },
    { id: 'hiphop', name: 'Hip Hop', color: 'from-purple-500 to-pink-500' },
    { id: 'trap', name: 'Trap', color: 'from-red-500 to-orange-500' },
    { id: 'ambient', name: 'Ambient', color: 'from-green-500 to-teal-500' },
    { id: 'techno', name: 'Techno', color: 'from-indigo-500 to-purple-500' },
    { id: 'house', name: 'House', color: 'from-yellow-500 to-orange-500' },
    { id: 'pop', name: 'Pop', color: 'from-pink-500 to-rose-500' },
    { id: 'rock', name: 'Rock', color: 'from-red-500 to-red-600' },
    { id: 'jazz', name: 'Jazz', color: 'from-amber-500 to-yellow-500' },
    { id: 'rnb', name: 'R&B', color: 'from-violet-500 to-purple-500' },
    { id: 'reggae', name: 'Reggae', color: 'from-emerald-500 to-green-500' },
    { id: 'metal', name: 'Metal', color: 'from-slate-500 to-gray-600' },
    { id: 'dubstep', name: 'Dubstep', color: 'from-purple-600 to-indigo-600' },
    { id: 'lofi', name: 'Lo-Fi', color: 'from-rose-400 to-orange-400' },
    { id: 'funk', name: 'Funk', color: 'from-fuchsia-500 to-pink-500' },
  ]

  const musicStyles = [
    { id: 'melodic', name: 'Melodic', icon: '🎵' },
    { id: 'aggressive', name: 'Aggressive', icon: '⚡' },
    { id: 'chill', name: 'Chill', icon: '🌊' },
    { id: 'experimental', name: 'Experimental', icon: '🔬' },
    { id: 'classic', name: 'Classic', icon: '🎹' },
  ]

  const generateBeat = async () => {
    setIsGenerating(true)
    
    // Simulate AI beat generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setCurrentBeat({
      id: Date.now(),
      name: `${genre.charAt(0).toUpperCase() + genre.slice(1)} Beat ${Date.now()}`,
      bpm: bpm,
      genre: genre,
      duration: '2:30'
    })
    
    setIsGenerating(false)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  if (!isClient) return <div className="h-96"></div>

  return (
    <div className="space-y-6">
      {/* AI Generation Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="relative p-6 hologram rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold neon-text">AI Beat Generator</h3>
                <p className="text-xs text-cyan-400">Powered by Neural Networks</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 font-medium">AI Active</span>
            </div>
          </div>

          {/* Genre Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-3">Select Genre</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGenre(g.id)}
                  className={`px-3 py-2.5 rounded-xl font-medium transition-all text-sm ${
                    genre === g.id
                      ? `bg-gradient-to-r ${g.color} text-white shadow-lg scale-105`
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Style/Reference Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Custom Style Reference (Optional)
            </label>
            <textarea
              value={customStyle}
              onChange={(e) => setCustomStyle(e.target.value)}
              placeholder="Paste style description, artist references, or specific characteristics...&#10;Example: 'Dark aggressive bass like Skrillex, fast hi-hats, melodic drops'"
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              💡 Describe the sound you want or reference specific artists/tracks
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                BPM: <span className="text-cyan-400">{bpm}</span>
              </label>
              <input
                type="range"
                min="60"
                max="180"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Intensity: <span className="text-purple-400">{intensity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          {/* Music Style Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-3">Music Style</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {musicStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setMusicStyle(style.id)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    musicStyle === style.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  <span>{style.icon}</span>
                  <span className="text-xs">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vocals Toggle */}
          <div className="mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeVocals}
                onChange={(e) => setIncludeVocals(e.target.checked)}
                className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
              />
              <span className="text-sm font-medium text-slate-300">
                Include AI-Generated Vocals
              </span>
            </label>
          </div>

          {/* Lyrics Input */}
          {includeVocals && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lyrics (Optional) - AI will generate if left empty
              </label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="Enter your lyrics here, or let AI create them for you..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-500">
                  {lyrics.length > 0 ? `${lyrics.length} characters` : 'AI will generate creative lyrics'}
                </p>
                {lyrics.length > 0 && (
                  <button
                    onClick={() => setLyrics('')}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateBeat}
            disabled={isGenerating}
            className="w-full relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center gap-3 text-white font-bold transition-all shadow-xl disabled:opacity-50">
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Generating AI Beat...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate Beat with AI
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Visualizer */}
      {currentBeat && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
          <div className="relative p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{currentBeat.name}</h4>
                  <p className="text-xs text-slate-400">{currentBeat.bpm} BPM • {currentBeat.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="h-32 bg-slate-800/50 rounded-xl overflow-hidden mb-6 flex items-center justify-center gap-1 px-4">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-500 via-purple-500 to-pink-500 rounded-full"
                  style={{
                    height: isPlaying 
                      ? `${Math.random() * 80 + 20}px` 
                      : '20px',
                    transition: 'height 0.1s',
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </button>
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all"
                  style={{ width: isPlaying ? '100%' : '0%', transition: 'width 2.5s linear' }}
                ></div>
              </div>
              <button className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Beats */}
      {currentBeat && (
        <div className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Recent Generations</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg group hover:bg-slate-800/50 transition-all cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{currentBeat.name}</p>
                <p className="text-xs text-slate-400">{currentBeat.genre} • {currentBeat.bpm} BPM</p>
              </div>
              <Play className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
