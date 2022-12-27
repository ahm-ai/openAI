import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// "regenerator-runtime/runtime" 
import 'regenerator-runtime/runtime'
import App from './App'
// import './index.css'
import Speech from './Speech/Speech';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
    },
    {
        path: "speech",
        element: <Speech />,
    },
]);


ReactDOM.createRoot(document.getElementById('openAi666666')).render(
    <RouterProvider router={router} />
)