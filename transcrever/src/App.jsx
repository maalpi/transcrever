import React, { useState, useEffect } from 'react';

function App() {
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranscribeClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => {
          const videoUrl = window.location.href;
          chrome.runtime.sendMessage({ action: 'transcribe', videoUrl: videoUrl });
        }
      });
    });
  };

  useEffect(() => {
    const messageListener = (message) => {
      if (message.action === 'transcriptionResult') {
        setTranscription(message.transcription);
        setLoading(false);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>
      <h1>YouTube Transcriber</h1>
      <button onClick={handleTranscribeClick}>Transcribe Video</button>
      {loading && <p>Transcribing...</p>}
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default App;
