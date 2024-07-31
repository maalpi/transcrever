// content.js
function getCurrentVideoUrl() {
  const videoElement = document.querySelector('video');
  if (videoElement) {
    return window.location.href;
  }
  return null;
}

// Enviar a URL para o background script
const videoUrl = getCurrentVideoUrl();
if (videoUrl) {
  chrome.runtime.sendMessage({ action: 'transcribe', videoUrl: videoUrl });
}
