import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { logout } from "./lib/auth";

//  Store original fetch
const originalFetch = window.fetch;

//  Override fetch
window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  if (response.status === 401) {
    console.warn("Token expired or unauthorized → logging out");
    logout();
  }

  return response;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
