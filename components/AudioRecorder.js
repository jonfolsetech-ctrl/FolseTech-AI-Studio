'use client'

import { useState, useRef } from 'react'
import { Mic, Square, Play, Pause, Download, Loader2 } from 'lucide-react'

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setIsProcessing(false)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsProcessing(true)
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      setIsPaused(false)
      clearInterval(timerRef.current)
      setRecordingTime(0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Recording Visualizer */}
      <div className="relative h-48 bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50">
        <div className="absolute inset-0 flex items-center justify-center">
          {isRecording ? (
            <div className="flex items-center gap-2">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 100 + 20}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <Mic className="w-10 h-10 text-blue-400" />
              </div>
              <p className="text-slate-400">Ready to record</p>
            </div>
          )}
        </div>
        
        {isRecording && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-mono font-bold">{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full flex items-center gap-3 text-white font-semibold transition-all shadow-xl">
              <Mic className="w-5 h-5" />
              Start Recording
            </div>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            disabled={isProcessing}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full flex items-center gap-3 text-white font-semibold transition-all shadow-xl disabled:opacity-50">
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Square className="w-5 h-5" />
                  Stop Recording
                </>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Playback */}
      {audioUrl && (
        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg">
              <Play className="w-5 h-5 ml-0.5" />
            </button>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
          <audio src={audioUrl} className="w-full mt-4" controls />
        </div>
      )}
    </div>
  )
}
