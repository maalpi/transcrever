import React, { useState, useEffect } from 'react';
import { Container, Title, ContainerFromText, ContainerText, ButtonCircle} from './styled/styled';

function App() {
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranscribeClick = () => {
    console.log('Transcribe button clicked');
    setLoading(true);
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
      console.log('Message received:', message);
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
    <Container>
      <Title>YouTube</Title>
      <Title className='sub'>Transcriber</Title>
      {/* <ButtonCircle onClick={handleTranscribeClick}>T</ButtonCircle> */}
      <ContainerFromText>
      <ButtonCircle onClick={handleTranscribeClick}><p>T</p></ButtonCircle>
      {loading && <p>Transcribing...</p>}
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
