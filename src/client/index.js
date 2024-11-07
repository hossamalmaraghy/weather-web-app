import {handleSubmit} from "./scripts/handleForm";
import './public/style/styles.scss';

// Register the service worker for offline functionality
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
  
  

export {
    handleSubmit
}