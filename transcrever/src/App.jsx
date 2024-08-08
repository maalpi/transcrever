import React, { useState, useEffect } from 'react';
import { Container, Title, ContainerFromText, ContainerText, ButtonCircle } from './styled/styled';

function App() {
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranscribeClick = () => {
    console.log('Transcribe button clicked');
    setLoading(true);
    setError('');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => {
          chrome.runtime.sendMessage({ action: 'getVideoUrl' });
        }
      });
    });
  };

  useEffect(() => {
    const messageListener = (message) => {
      console.log('Message received:', message);
      if (message.action === 'transcriptionResult') {
        if (message.error) {
          setError(message.error);
        } else {
          setTranscription(message.transcription);
        }
        setLoading(false);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <Container>
      <Title>YouTube</Title>
      <Title className='sub'>Transcriber</Title>
      <ContainerFromText>
        <ButtonCircle onClick={handleTranscribeClick}><p>T</p></ButtonCircle>
        {loading && <p>Transcribing...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {transcription && (
          <ContainerText>
            <h2>Transcription:</h2>
            <p>{transcription}</p>
          </ContainerText>
        )}
      </ContainerFromText>
    </Container>
  );
}

export default App;
