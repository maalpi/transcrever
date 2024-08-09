console.log("Content script carregado.");

// function getCurrentVideoUrl() {
//   const videoElement = document.querySelector('video');
//   const url = window.location.href;
//   console.log("URL detectada:", url);
//   if (videoElement) {
//     return url;
//   }
//   return null;
// }

// const videoUrl = getCurrentVideoUrl();
// if (videoUrl) {
//   chrome.runtime.sendMessage({ action: 'transcribe', videoUrl: videoUrl });
// }