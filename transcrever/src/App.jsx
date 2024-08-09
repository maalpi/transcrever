import React, { useState, useEffect } from 'react';
import { Container, Title, ContainerFromText, ContainerText, ButtonCircle } from './styled/styled';
import api from './api';
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
          const videoUrl = window.location.href;
          console.log('Video URL:', videoUrl);
          chrome.runtime.sendMessage({ action: 'transcribe', videoUrl: videoUrl });
        }
      });
    });
  };

  useEffect(() => {
    const messageListener = (message) => {
      console.log('Message received listenApp:', message.action);
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
        { loading ? <h2>Escrevendo...</h2> : <h2>transcreva</h2>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {transcription && (
          <ContainerText>
            <p>{transcription}</p>
          </ContainerText>
        )}
      </ContainerFromText>
    </Container>
  );
}

export default App;
