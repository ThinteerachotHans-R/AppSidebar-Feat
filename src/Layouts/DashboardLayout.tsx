import React from 'react'
import { SidebarProvider,SidebarTrigger,SidebarInset } from '@/components/ui/sidebar'
import AppSideBar from '@/AppComponents/AppSideBar'
import { Outlet } from 'react-router'
import AppBreadCrumb from '@/AppComponents/AppBreadcrumb'
import NavBar from '@/AppComponents/Navbar'


const DashboardLayout = () => {
  return (
    <SidebarProvider className="w-full min-h-screen flex mx-auto">
        <AppSideBar/>
        <SidebarInset className= 'flex-1 flex flex-col w-full overflow-x-hidden bg-zinc-100'>
          <NavBar/>
          <div className="p-4 border-b flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-zinc-300">|</span>
            <AppBreadCrumb/>
          </div>
          <div className='w-full flex-1 p-6 bg-zinc-50/50'>
            <Outlet />
          </div>
          <div className = "w-full text-center text-zinc-400 bg-white text-md p-4">© 2025 ระบบจัดซื้อจัดจ้างครุภัณฑ์ -All rights reserved.</div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout