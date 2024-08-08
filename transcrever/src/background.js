import api from './api'; // Importando a configuração do Axios

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'transcribe') {
    try {
      const response = await api.post('/transcribe', { url: message.videoUrl });

      if (response.status === 200) {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: 'transcriptionResult',
          transcription: response.data.transcription
        });
      } else {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: 'transcriptionResult',
          error: response.data.error || 'Unknown error'
        });
      }
    } catch (error) {
      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'transcriptionResult',
        error: error.message || 'Network error'
      });
    }
  }
});
