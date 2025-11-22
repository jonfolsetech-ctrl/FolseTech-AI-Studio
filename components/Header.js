'use client'

import { Sparkles, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl blur-lg opacity-50"></div>
              <div className="relative w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Folsetech
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400">AI Studio</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-slate-300 hover:text-white transition-colors">
              Dashboard
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              Projects
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              Analytics
            </button>
          </nav>
          
          {/* CTA Button */}
          <button className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg sm:rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 text-xs sm:text-base">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Upgrade</span> Pro
          </button>
        </div>
      </div>
    </header>
  )
}
