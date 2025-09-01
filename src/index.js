import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage';
import AboutPage from './Pages/AboutPage';
import RegisterPage from './Pages/RegisterPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
const myRouter = createBrowserRouter([{
  element:<App/>,
  errorElement:<ErrorPage/>,
  children:[
    {
      element:<AboutPage />,
      path:"/"
    },
    {
      element:<RegisterPage />,
      path:"/register"
    }
  ]
}])
root.render(
  <React.StrictMode>
<RouterProvider router={myRouter}/>
  </React.StrictMode>
);
