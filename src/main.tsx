import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './theme/ThemeProvider';
import { assetUrl } from './lib/assetUrl';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles/fonts.css';
import './styles/site.css';

document.documentElement.style.setProperty(
  '--hero-showcase-bg',
  `url("${assetUrl('images/Email_showcase3.svg')}")`,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
