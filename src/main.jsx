import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Routes/router.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Providers/AuthProvider.jsx'
import ThemeProvider from './Providers/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider>
     <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
  </ThemeProvider>
  </StrictMode>,
)
