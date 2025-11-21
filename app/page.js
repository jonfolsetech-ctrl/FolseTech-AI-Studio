'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import AudioRecorder from '@/components/AudioRecorder'
import ChatPanel from '@/components/ChatPanel'
import FileUpload from '@/components/FileUpload'
import BeatGenerator from '@/components/BeatGenerator'
import VoiceCloning from '@/components/VoiceCloning'
import MixingMastering from '@/components/MixingMastering'

export default function Home() {
  const [activeView, setActiveView] = useState('record')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Floating Musical Notes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {['♪', '♫', '♬', '♩', '♪', '♫', '♬', '♩', '♪', '♫', '♬', '♩'].map((note, i) => (
          <div
            key={i}
            className="absolute text-4xl font-bold animate-float opacity-20"
            style={{
              left: `${(i * 8.33)}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#a855f7' : '#ec4899'
            }}
          >
            {note}
          </div>
        ))}
      </div>

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Additional moving orbs */}
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s', animationDuration: '8s'}}></div>
      </div>

      {/* Grid Pattern Overlay with scan effect */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-30"></div>
      
      {/* Scanning line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-scan"></div>
      </div>

      {/* Digital rain effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-400 text-xs font-mono animate-digital-rain"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Array.from({length: 20}, () => Math.random().toString(36)[2]).join('')}
          </div>
        ))}
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <div className="flex">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Audio Studio Section */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50"></div>
                      <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white neon-text">Audio Studio</h2>
                  </div>
                  <AudioRecorder />
                </section>
                
                {/* AI Chat Section */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl hover:border-purple-500/30 transition-all">
                  <ChatPanel />
                </section>
              </div>
              
              {/* Beat Generator Section */}
              <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl hover:border-pink-500/30 transition-all">
                <BeatGenerator />
              </section>
              
              {/* File Manager Section */}
              <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl hover:border-green-500/30 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white neon-text">File Manager</h2>
                </div>
                <FileUpload />
              </section>
              
              {/* Voice Cloning & Mixing/Mastering Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Voice Cloning Section */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl hover:border-purple-500/30 transition-all">
                  <VoiceCloning />
                </section>
                
                {/* Mixing & Mastering Section */}
                <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl hover:border-cyan-500/30 transition-all">
                  <MixingMastering />
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
