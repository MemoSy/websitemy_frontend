import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Initialize i18n

// Handle SPA routing for direct URL access
const handleSPARouting = () => {
  const redirect = sessionStorage.getItem('redirect');
  sessionStorage.removeItem('redirect');
  if (redirect && redirect !== location.pathname) {
    history.replaceState(null, '', redirect);
  }
};

// Run SPA routing handler
handleSPARouting();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
