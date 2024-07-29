import React, { useState, useEffect } from 'react';

function App() {
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['transcription'], (result) => {
      if (result.transcription) {
        setTranscription(result.transcription);
      }
    });
  }, []);

  const startTranscription = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'start_transcription' });
        setIsTranscribing(true);
      } else {
        console.error('No active tabs found.');
      }
    });
  };

  const stopTranscription = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'stop_transcription' });
        setIsTranscribing(false);
      } else {
        console.error('No active tabs found.');
      }
    });
  };

  return (
    <div>
      <h1>Video Transcription</h1>
      <button onClick={startTranscription} disabled={isTranscribing}>Start Transcription</button>
      <button onClick={stopTranscription} disabled={!isTranscribing}>Stop Transcription</button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
}

export default App;
