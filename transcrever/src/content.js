let audioProcessor;
let mediaStreamSource;
let audioContext;
let stream;

const captureAudio = () => {
  const video = document.querySelector('video');
  if (video) {
    stream = video.captureStream();
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    audioProcessor = audioContext.createScriptProcessor(4096, 1, 1);

    audioProcessor.onaudioprocess = (event) => {
      const audioData = event.inputBuffer.getChannelData(0);
      const float32Array = new Float32Array(audioData.length);
      float32Array.set(audioData);

      chrome.runtime.sendMessage({ audioData: float32Array });
    };

    mediaStreamSource.connect(audioProcessor);
    audioProcessor.connect(audioContext.destination);
  }
};

const stopAudioCapture = () => {
  if (audioProcessor) {
    audioProcessor.disconnect();
    if (mediaStreamSource) mediaStreamSource.disconnect();
    if (audioContext) audioContext.close();
    if (stream) stream.getTracks().forEach(track => track.stop());
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start_transcription") {
    captureAudio();
  } else if (message.action === "stop_transcription") {
    stopAudioCapture();
  }
});
