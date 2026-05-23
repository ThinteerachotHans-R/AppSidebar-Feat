import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DashboardLayout from './Layouts/DashboardLayout.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import EquipmentTable from './Pages/EquipmentTable.tsx'
import EquipmentDetail from './Pages/EquipmentDetail.tsx'
import DashboardHome from './Pages/DashboardHome.tsx'
import SearchPage from './Pages/SearchPage.tsx'

const router = createBrowserRouter([

  {path: '/', element: <App />},
  {element: <DashboardLayout />, children: [
    {path: '/dashboard', element: <DashboardHome />},
    {path: '/equipment', element: <EquipmentTable />},
    {path: '/equipment/:id', element: <EquipmentDetail />},
    {path: '/search', element: <SearchPage />},
  ]},
  {path: '*', element: <NotFoundPage />}

])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} /> 
  </StrictMode>,
)
