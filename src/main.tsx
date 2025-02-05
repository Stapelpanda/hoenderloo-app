import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Er is een nieuwe versie beschikbaar. Nu updaten?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is klaar voor offline gebruik');
  },
  immediate: true
});

// Handle PWA installation
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Optionally show your own install button
  const installButton = document.createElement('button');
  installButton.textContent = 'Installeer App';
  installButton.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50';
  installButton.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('App installed');
      }
      deferredPrompt = null;
      installButton.remove();
    }
  };
  document.body.appendChild(installButton);
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  console.log('PWA installed successfully');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
