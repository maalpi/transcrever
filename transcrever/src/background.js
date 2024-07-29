chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.audioData) {
    if (!isTranscribing) return;

    const apiKey = import.meta.env.APIKEY;

    const uploadAudio = async (audioBuffer) => {
      const formData = new FormData();
      formData.append('audio', new Blob([audioBuffer], { type: 'application/octet-stream' }));

      try {
        const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
          method: 'POST',
          headers: {
            'authorization': apiKey
          },
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed: ${uploadResponse.statusText}`);
        }

        const uploadResult = await uploadResponse.json();
        return uploadResult.upload_url;
      } catch (error) {
        console.error('Error uploading audio:', error.message);
      }
    };

    const transcribeAudio = async (audioUrl) => {
      try {
        const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
          method: 'POST',
          headers: {
            'authorization': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ audio_url: audioUrl })
        });

        if (!transcriptionResponse.ok) {
          throw new Error(`Transcription failed: ${transcriptionResponse.statusText}`);
        }

        const transcriptionResult = await transcriptionResponse.json();
        return transcriptionResult.id;
      } catch (error) {
        console.error('Error transcribing audio:', error.message);
      }
    };

    const checkTranscriptionStatus = async (transcriptId) => {
      try {
        const result = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: {
            'authorization': apiKey
          }
        });

        if (!result.ok) {
          throw new Error(`Checking status failed: ${result.statusText}`);
        }

        return result.json();
      } catch (error) {
        console.error('Error checking transcription status:', error.message);
      }
    };

    (async () => {
      isTranscribing = true;
      const audioUrl = await uploadAudio(message.audioData.buffer);
      if (!audioUrl) {
        isTranscribing = false;
        return;
      }

      const transcriptId = await transcribeAudio(audioUrl);
      if (!transcriptId) {
        isTranscribing = false;
        return;
      }

      const interval = setInterval(async () => {
        const statusResult = await checkTranscriptionStatus(transcriptId);
        if (statusResult) {
          if (statusResult.status === 'completed') {
            clearInterval(interval);
            chrome.storage.local.set({ transcription: statusResult.text });
            isTranscribing = false;
          } else if (statusResult.status === 'failed') {
            clearInterval(interval);
            console.error('Transcription failed');
            isTranscribing = false;
          }
        }
      }, 5000);
    })();
  } else if (message.action === 'stop_transcription') {
    isTranscribing = false;
  }
});