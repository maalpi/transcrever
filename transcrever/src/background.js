// Escutando as mensagens recebida
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("Mensagem recebida no background:", message.videoUrl);
  // Verifica se a ação recebida é 'transcribe'
  if (message.action === 'transcribe') {
    try {
      const response = await fetch('http://localhost:5000/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: message.videoUrl })
      });

      console.log('Resposta da API:', response);
      const result = await response.json();
      console.log('result:', result);

      // Envia uma mensagem de volta para a aba do remetente com o resultado da transcrição
      if (response.ok) {
        console.log('response ok')
        console.log(sender.tab.id)
        chrome.runtime.sendMessage({
          action: 'transcriptionResult',
          transcription: result.transcription
        });

      // Envia uma mensagem de erro para a aba do remetente se a resposta não foi bem-sucedida
      } else {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: 'transcriptionResult',
          error: result.error || 'Unknown error'
        });
      }
    } catch (error) {
      // Envia uma mensagem de erro para a aba do remetente se ocorrer um erro na requisição
      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'transcriptionResult',
        error: error.message || 'Network error'
      });
    }
  }
});
