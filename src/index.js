import React, { lazy, Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import store from './store/index'
import { Toaster } from 'react-hot-toast'
import { nProgressConfig } from './utils/nProgressConfig'
import { HashLoader } from 'react-spinners'

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))

// Component displays ProgressBar when App is loading
const SuspenseFallback = () => {
  useEffect(() => {
    nProgressConfig.start() // Start loading bar when component is mounted
    return () => {
      nProgressConfig.done() // End loading bar when component is mounted
    }
  }, [])
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <HashLoader size={40} color="#f77001" className=" items-center justify-center" />
    </div>
  )
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<SuspenseFallback />}>
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#283046',
              color: 'white'
            }
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
)

// Performance measurement
reportWebVitals()
