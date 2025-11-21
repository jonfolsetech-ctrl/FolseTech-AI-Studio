import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Tools</h3>
        <button className="sidebar-btn active">🎙️ Record</button>
        <button className="sidebar-btn">💬 AI Chat</button>
        <button className="sidebar-btn">📁 Files</button>
        <button className="sidebar-btn">🎵 Library</button>
      </div>
      <div className="sidebar-section">
        <h3>Recent</h3>
        <div className="recent-item">Project 1</div>
        <div className="recent-item">Project 2</div>
        <div className="recent-item">Project 3</div>
      </div>
    </aside>
  );
}
