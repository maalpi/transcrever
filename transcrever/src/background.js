chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'transcribe') {
    const videoUrl = message.videoUrl;

    fetch('http://localhost:5000/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: videoUrl })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        chrome.runtime.sendMessage({ action: 'transcriptionResult', transcription: data.transcription });
      })
      .catch(error => {
        console.error('Error transcribing video:', error);
        chrome.runtime.sendMessage({ action: 'transcriptionResult', transcription: 'Error transcribing video.' });
      });
  }
});
