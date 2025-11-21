import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AudioRecorder from './components/AudioRecorder';
import ChatPanel from './components/ChatPanel';
import FileUpload from './components/FileUpload';

export default function App() {
  const [activeView, setActiveView] = useState('record');

  return (
    <>
      {/* Floating Terminal Symbols */}
      <div className="floating-notes">
        <div className="music-note">$</div>
        <div className="music-note">&gt;</div>
        <div className="music-note">#</div>
        <div className="music-note">~</div>
        <div className="music-note">|</div>
        <div className="music-note">$</div>
        <div className="music-note">&gt;</div>
        <div className="music-note">#</div>
      </div>

      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="main-content">
            <div className="content-grid">
              <section className="recorder-section">
                <h2>🎙️ Audio Studio</h2>
                <AudioRecorder />
              </section>
              
              <section className="chat-section">
                <ChatPanel />
              </section>
            </div>
            
            <section className="upload-section">
              <h2>📁 File Manager</h2>
              <FileUpload />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}