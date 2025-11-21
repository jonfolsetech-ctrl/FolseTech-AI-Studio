'use client'

import { useState, useRef } from 'react'
import { Upload, File, X, CheckCircle2, FileAudio, FileVideo, FileImage } from 'lucide-react'

export default function FileUpload() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    addFiles(selectedFiles)
  }

  const addFiles = (newFiles) => {
    const filesWithId = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 100,
      uploaded: true
    }))
    setFiles(prev => [...prev, ...filesWithId])
  }

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) return FileAudio
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) return FileVideo
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return FileImage
    return File
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-700/50 hover:border-slate-600 bg-slate-800/30'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full blur-xl transition-opacity ${
              isDragging ? 'opacity-75' : 'opacity-50'
            } bg-gradient-to-r from-blue-500 to-cyan-500`}></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Upload className={`w-8 h-8 text-white transition-transform ${isDragging ? 'scale-110' : ''}`} />
            </div>
          </div>
          
          <div>
            <p className="text-lg font-semibold text-white mb-1">
              {isDragging ? 'Drop files here' : 'Drop files or click to upload'}
            </p>
            <p className="text-sm text-slate-400">
              Support for audio, video, and image files
            </p>
          </div>
          
          <div className="flex gap-2 text-xs text-slate-500">
            <span className="px-3 py-1 bg-slate-800 rounded-full">MP3</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full">WAV</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full">MP4</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full">PNG</span>
          </div>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300">
              Uploaded Files ({files.length})
            </h3>
            <button
              onClick={() => setFiles([])}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>
          
          <div className="space-y-2">
            {files.map((fileItem) => {
              const Icon = getFileIcon(fileItem.file.name)
              return (
                <div
                  key={fileItem.id}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl group hover:bg-slate-800/50 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {fileItem.file.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatFileSize(fileItem.file.size)}
                    </p>
                  </div>
                  
                  {fileItem.uploaded && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  )}
                  
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="p-2 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
