import React from 'react'
import {
  List,
  LayoutDashboard,
  Package,
  User,          
  MoreVertical
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"

import {Link,useLocation} from 'react-router'

import { TooltipProvider } from '@/components/ui/tooltip'

import{RoleBadge} from './EquipmentBadges'
import { Button } from '@/components/ui/button'

// Navigation items
const navItems = [
  {
    title: "หน้าหลัก",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "รายการครุภัณฑ์",
    url: "/equipment",
    icon: List,
  }
]




const AppSideBar = () => {
    const location = useLocation();
    const {state} = useSidebar();
  return (
        <TooltipProvider>
          <Sidebar className=' mx-auto  text-md bg-white ' collapsible = 'icon'>
            <SidebarHeader className="border-b border-gray-200">
              <div className = "flex gap-3 items-center">
                <div className ="p-2">
                  <Package className='text-blue-600 size-6'/>
                </div>
                {state !== 'collapsed' && (
                  <div className = "flex flex-col py-3">
                    <p className = "text-md font-normal text-black">ระบบการจัดการเอกสารการจัดซื้อ/จัดจ้าง</p>
                    <p className = "text-sm text-gray-500">Procurement Document</p>
                  </div>
                  )}
              </div>
            
            </SidebarHeader>
            
            <SidebarContent>
              {/* Add sidebar content here */}
              <SidebarGroup className = "p-4">
              <SidebarGroupContent>
                <SidebarMenu className = "gap-1 ">
                  {navItems.map((item) => {
                    // [Engineering Logic]: ตรวจสอบสถานะ Active
                    // หน้า Home (Dashboard) ต้องตรงกันเป๊ะๆ แต่หน้าอื่น (เช่น /equipment) ให้เช็คแบบ .startsWith 
                    // เพื่อให้เวลาเข้าหน้าย่อยอย่าง /equipment/detail แล้วปุ่มเมนูหลักยังคงไฮไลต์สีขาวอยู่
                    const isActive = item.url === "/dashboard" 
                      ? location.pathname === "/dashboard" 
                      : location.pathname.startsWith(item.url);

                    return (
                      <SidebarMenuItem key={item.title} className = "">
                        <SidebarMenuButton 
                          asChild 
                          tooltip={item.title}
                          // ใส่ className แบบมีเงื่อนไข (Conditional Class)
                          className={`w-full transition-colors font-medium ${
                            isActive 
                              ? "bg-blue-50 text-blue-600 shadow-sm font-bold hover:bg-blue-600 hover:text-white" 
                              : "text-gray-700 hover:bg-blue-600 hover:text-white"
                          }`}
                        >
                          <Link to={item.url}>
                            <item.icon />
                            <span className="truncate p-0.5">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-gray-200">
              {/* Add sidebar footer here */}
                <div className='flex items-center gap-3 text-sm text-gray-500'>
                  
                  <div className = "ml-8 flex flex-col text-right">
                    <p>ผู้ดูแลระบบ</p>
                    <p className="text-xs text-gray-500">แผนกจัดซื้อ</p>
                  </div>
                 
                  {state !== 'collapsed' && (
                  <div className = "flex gap-2 items-center">
                    <RoleBadge role = "ผู้ดูแลระบบ"/>
                    <Button  className="text-gray-500 hover:text-gray-700 p-2">
                      <MoreVertical className="size-5" />
                    </Button>
                  </div>
                   )}
                </div>
            </SidebarFooter>
          </Sidebar>
        </TooltipProvider>
    
  )
}

export default AppSideBar