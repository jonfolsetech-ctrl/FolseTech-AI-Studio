import React, { useState, useRef } from 'react';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-recorder">
      <div className="recorder-display">
        <div className={`waveform ${isRecording ? 'active' : ''}`}>
          {isRecording ? (
            <div className="recording-indicator">
              <span className="pulse"></span>
              Recording...
            </div>
          ) : (
            <div className="ready-state">Ready to record</div>
          )}
        </div>
      </div>
      
      <div className="recorder-controls">
        {!isRecording ? (
          <button className="record-btn" onClick={startRecording}>
            ⏺️ Start Recording
          </button>
        ) : (
          <button className="stop-btn" onClick={stopRecording}>
            ⏹️ Stop Recording
          </button>
        )}
      </div>

      {audioURL && (
        <div className="playback-section">
          <h3>Your Recording</h3>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
}
