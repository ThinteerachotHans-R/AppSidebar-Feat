import React from 'react'
import { SidebarProvider,SidebarTrigger,SidebarInset } from '@/components/ui/sidebar'
import AppSideBar from '@/AppComponents/AppSideBar'
import { Outlet } from 'react-router'




const DashboardLayout = () => {
  return (
    <SidebarProvider className="w-full min-h-screen flex">
        <AppSideBar/>
        <SidebarInset className= 'flex-1 flex flex-col w-full overflow-x-hidden'>
          <div className="p-4 border-b flex items-center gap-2">
            <SidebarTrigger />
          </div>
          <div className='w-full flex-1 p-6 bg-zinc-50/50'>
            <Outlet />
          </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout