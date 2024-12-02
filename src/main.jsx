import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import Users from './components/Users.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: () => fetch("https://coffee-store-server-alpha-gules.vercel.app/coffee"),
  },
  {
    path: "/addCoffee",
    element: <AddCoffee></AddCoffee>,
  },
  {
    path: "/updateCoffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({params}) => fetch(`https://coffee-store-server-alpha-gules.vercel.app/coffee/${params.id}`)
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch("https://coffee-store-server-alpha-gules.vercel.app/users"),
  },
],
{
  future: {
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionStatusRevalidation: true
  },
}
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={router}
        future={{v7_startTransition: true, }} />
    </AuthProvider>
  </StrictMode>,
)
