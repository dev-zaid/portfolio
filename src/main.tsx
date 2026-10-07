import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Agents } from './pages/Agents.tsx'

const Page = window.location.pathname.replace(/\/+$/, '') === '/agents' ? Agents : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
