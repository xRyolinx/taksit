import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store.js'
import { ProSidebarProvider } from 'react-pro-sidebar'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Provider>


)
