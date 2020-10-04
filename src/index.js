// Custom JS for the main app goes here - ES6 supported

import 'progressive-image.js/dist/progressive-image.js';
import './css/main.scss';

// Register and inspect the generated service worker.
// https://developers.google.com/web/tools/workbox/guides/codelabs/webpack
// https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
(function () {
  const swPath = '/sw.js';

  // Check that service workers are supported.
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant.
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swPath)
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
})();
