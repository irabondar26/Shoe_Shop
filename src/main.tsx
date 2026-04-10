import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop.tsx'
import BackToTop from './Components/BackToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <BackToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
