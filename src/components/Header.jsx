import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🎙️ Folsetech AI Studio</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Studio</a>
          <a href="/projects" className="nav-link">Projects</a>
          <a href="/settings" className="nav-link">Settings</a>
        </nav>
      </div>
    </header>
  );
}
