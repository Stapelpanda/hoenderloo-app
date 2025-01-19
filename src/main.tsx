import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register service worker
registerSW({
  onNeedRefresh() {
    // You can show a prompt to the user here if you want to
    console.log('New content available, please refresh')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
