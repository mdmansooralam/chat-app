import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<HomePage />,
      },
      {
        path:'login',
        element: <LoginPage />
      },
      {
        path:'signup',
        element:<SignupPage/>
      },

    ]
  }
])


createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />

        </RouterProvider>
      </Provider>
    </StrictMode>
)
