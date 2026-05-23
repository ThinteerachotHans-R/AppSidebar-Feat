// src/AppComponents/AppBreadcrumb.tsx
import React from 'react'
import { useLocation, Link } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const AppBreadcrumb = () => {
  // 1. ดึง Pathname ปัจจุบันจากเบราว์เซอร์ (เช่น "/equipment/1")
  const location = useLocation()
  
  // 2. หั่นสติง URL ออกเป็นชิ้นๆ และตัดช่องว่างออก
  const pathnames = location.pathname.split("/").filter((x) => x)

  // 3. ฟังก์ชันแปลงชื่อ Path บน URL ให้เป็นข้อความที่ต้องการแสดงผล
  const getBreadcrumbName = (path: string) => {
    const names: Record<string, string> = {
      dashboard: "แดชบอร์ด",
      equipment: "ตารางอุปกรณ์",
      detail: "รายละเอียด",
      new: "เพิ่มอุปกรณ์ใหม่",
    }
    // ถ้าตัวแปรเป็นตัวเลข ID อุปกรณ์ ให้แสดงคำว่า "รหัส #"
    if (!isNaN(Number(path))) return `รหัส #${path}`
    
    return names[path] || path
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* หน้าแรกสุด (Home) ยืนพื้นไว้เสมอ */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors">หน้าหลัก</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* วนลูปสร้างชิ้นส่วนที่เหลือโดยไม่ต้องใช้ React.Fragment */}
        {pathnames.map((value, index) => {
          // สร้างลิงก์ปลายทางแบบสะสมพาร์ท เช่น /equipment หรือ /equipment/1
          const to = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          const name = getBreadcrumbName(value)

          // ข้ามการเรนเดอร์ซ้ำถ้าเป็นหน้า dashboard หลัก
          if (value === "dashboard") return null

          return (
            // ยุบรวมและใช้คอมโพเนนต์เดี่ยวส่งค่ากลับออกไป พร้อมฝังคีย์ควบคุมไว้ที่นี่เลย
            <div key={to} className="flex items-center gap-1.5">
              {/* ใส่ตัวแบ่งหน้าจออัตโนมัติ โดยมันจะโผล่มากั้นหน้าไอเทมชิ้นนั้นๆ เสมอ */}
              <BreadcrumbSeparator />
              
              <BreadcrumbItem>
                {isLast ? (
                  // ชิ้นสุดท้าย ปิดท้ายด้วยข้อความธรรมดา (กดคลิกไม่ได้)
                  <BreadcrumbPage className="font-semibold text-zinc-950">
                    {name}
                  </BreadcrumbPage>
                ) : (
                  // ชิ้นระหว่างทาง ทำเป็น Link ให้กดคลิกย้อนกลับไปได้
                  <BreadcrumbLink asChild>
                    <Link to={to} className="hover:text-blue-600 transition-colors">
                      {name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default AppBreadcrumb