import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Components/Routes/Routes.jsx'
import { Provider } from "react-redux";
import { store } from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}><RouterProvider router={router}/></Provider> 
)
