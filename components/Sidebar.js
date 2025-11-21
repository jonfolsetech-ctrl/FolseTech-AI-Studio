'use client'

import { Mic, MessageSquare, FolderOpen, Settings, BarChart3, Layers } from 'lucide-react'

export default function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: 'record', icon: Mic, label: 'Record', color: 'from-blue-500 to-cyan-500' },
    { id: 'beats', icon: Layers, label: 'Beats', color: 'from-cyan-500 to-purple-500' },
    { id: 'chat', icon: MessageSquare, label: 'AI Chat', color: 'from-purple-500 to-pink-500' },
    { id: 'files', icon: FolderOpen, label: 'Files', color: 'from-green-500 to-emerald-500' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'from-orange-500 to-red-500' },
  ]

  return (
    <aside className="w-20 lg:w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 min-h-[calc(100vh-73px)]">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="hidden lg:block font-medium">{item.label}</span>
              {isActive && (
                <div className="hidden lg:block ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          )
        })}
      </div>
      
      {/* Settings at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden lg:block font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
