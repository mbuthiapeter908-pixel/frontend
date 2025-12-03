import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined, // Remove default theme
        variables: {
          colorPrimary: '#3b82f6', // Blue-500
          colorPrimaryHover: '#2563eb', // Blue-600
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          colorInputBackground: '#ffffff',
          colorInputText: '#1f2937',
          borderRadius: '0.75rem', // Rounded-xl
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '16px',
          fontWeight: {
            normal: '400',
            medium: '500',
            bold: '600',
            extraBold: '700'
          }
        },
        elements: {
          // Root container
          rootBox: 'w-full',
          card: 'bg-white rounded-3xl shadow-2xl border border-gray-200 p-8',
          
          // Header
          header: 'text-center mb-6',
          headerTitle: 'text-3xl font-black text-gray-900',
          headerSubtitle: 'text-gray-600 text-lg mt-2',
          
          // Form
          formFieldLabel: 'text-sm font-semibold text-gray-700 mb-2',
          formFieldInput: 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
          formFieldSuccessText: 'text-green-600 text-sm mt-1',
          formFieldErrorText: 'text-red-600 text-sm mt-1',
          
          // Buttons
          formButtonPrimary: 'w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl transition-all duration-300',
          formButtonReset: 'w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 rounded-xl transition-all duration-300',
          socialButtons: 'grid grid-cols-2 gap-3',
          socialButtonsBlockButton: 'border-2 border-gray-300 hover:border-gray-400 rounded-xl',
          
          // Footer
          footer: 'text-center mt-6 pt-6 border-t border-gray-200',
          footerActionText: 'text-gray-600',
          footerActionLink: 'text-blue-600 hover:text-blue-700 font-semibold',
          
          // User button
          userButtonPopoverCard: 'rounded-2xl border border-gray-200 shadow-2xl',
          userButtonPopoverActionButton: 'hover:bg-gray-50 rounded-lg',
          userButtonPopoverFooter: 'border-t border-gray-200'
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'blockButton',
          logoPlacement: 'inside',
          logoImageUrl: 'https://your-logo-url.com/logo.png',
          shimmer: true
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
)