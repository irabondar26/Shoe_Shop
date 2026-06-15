import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store.ts"
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop.tsx'
import BackToTop from './Components/BackToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <BackToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
