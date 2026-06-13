import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { assetUrl } from './lib/assetUrl';
import './styles/site.css';

document.documentElement.style.setProperty(
  '--hero-showcase-bg',
  `url("${assetUrl('images/Email_showcase3.svg')}")`,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
