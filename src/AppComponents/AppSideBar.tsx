import React from 'react'
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  ChevronDown,
  User2,
  Plus,
  Table,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link,useLocation} from 'react-router'

import { TooltipProvider } from '@/components/ui/tooltip'


// Navigation items
const navItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Tables",
    url: "/equipment",
    icon: Table,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]




const AppSideBar = () => {
    const location = useLocation();
  return (
        <TooltipProvider>
          <Sidebar className=' mx-auto  text-md bg-indigo-600' collapsible = 'icon'>
            <SidebarHeader>
              <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-white">
                      A
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight text-white">
                      <span className="truncate font-semibold">Acme Inc</span>
                      <span className="truncate text-xs">Enterprise</span>
                    </div>
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-white"
                  align="start"
                  side="bottom"
                  sideOffset={4}

                >
                  <DropdownMenuItem>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      A
                    </div>
                    <div className="ml-2">Acme Inc</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                      P
                    </div>
                    <div className="ml-2">Personal</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
            </SidebarHeader>
            
            <SidebarContent>
              {/* Add sidebar content here */}
              <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  // [Engineering Logic]: ตรวจสอบสถานะ Active
                  // หน้า Home (Dashboard) ต้องตรงกันเป๊ะๆ แต่หน้าอื่น (เช่น /equipment) ให้เช็คแบบ .startsWith 
                  // เพื่อให้เวลาเข้าหน้าย่อยอย่าง /equipment/detail แล้วปุ่มเมนูหลักยังคงไฮไลต์สีขาวอยู่
                  const isActive = item.url === "/dashboard" 
                    ? location.pathname === "/dashboard" 
                    : location.pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title}
                        // ใส่ className แบบมีเงื่อนไข (Conditional Class)
                        className={`w-full transition-colors font-medium ${
                          isActive 
                            ? "bg-white text-blue-600 shadow-sm font-bold hover:bg-white hover:text-blue-600" 
                            : "text-white hover:bg-indigo-700/60 hover:text-white"
                        }`}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              
            </SidebarGroupContent>
          </SidebarGroup>



            </SidebarContent>
            
            <SidebarFooter>
              {/* Add sidebar footer here */}
                Footer
            </SidebarFooter>
          </Sidebar>
        </TooltipProvider>
    
  )
}

export default AppSideBar