import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Link } from 'react-router'
import { Search } from 'lucide-react'
import equipmentData from '../data.json'

const SearchPage = () => {
  // State สำหรับเก็บคำค้นหาแบบ Real-time
  const [query, setQuery] = useState('')

  // Logic กรองข้อมูล: คำนวณใหม่ทุกครั้งที่ค่า query เปลี่ยน (ทุกตัวอักษรที่พิมพ์)
  const results = equipmentData.filter((item) => {
    const searchTarget = query.toLowerCase()
    
    // ค้นหาแบบกวาดทั้ง ชื่อ (Name) และหมวดหมู่ (Category)
    return (
      item.Equipmentname.toLowerCase().includes(searchTarget))
  })

    return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* ส่วนหัวของหน้าค้นหา */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">ค้นหาอุปกรณ์</h1>
        <p className="text-sm text-zinc-500">พิมพ์รหัส ชื่อ หรือหมวดหมู่เพื่อค้นหาข้อมูลแบบเรียลไทม์</p>
      </div>

      {/* แผงกล่องค้นหาขนาดใหญ่ (Search Bar Component) */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 size-5" />
        <Input
          type="text"
          placeholder="เริ่มพิมพ์คำค้นหาตรงนี้... (เช่น Equipment, Electronics)"
          value={query}
          // อัปเดตสเตททันทีทุกครั้งที่คีย์บอร์ดถูกกด (Dynamic per letter)
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-4 py-6 text-lg w-full bg-white border-zinc-200 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
          autoFocus
        />
      </div>

      {/* ส่วนแสดงผลตารางผลลัพธ์แบบ Dynamic */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {query === '' ? (
          // กรณีที่ยังไม่ได้พิมพ์อะไรเลย ให้แสดงคำแนะนำสวยๆ ไว้ก่อน
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 gap-2">
            <Search className="size-10 stroke-[1.5] text-zinc-300 animate-pulse" />
            <p className="text-sm font-medium">รอรับคำค้นหาจากคุณอยู่...</p>
          </div>
        ) : results.length > 0 ? (
          // กรณีพิมพ์แล้ว และมีข้อมูลตรงกับคำค้นหา
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow>
                <TableHead className="w-25 font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.ID} className="hover:bg-zinc-50/80 transition-colors">
                  <TableCell className="font-medium text-indigo-600">
                    {/* เมื่อคลิกที่ ID จะลิงก์ไปหน้ารายละเอียดแบบ Dynamic ทันที */}
                    <Link to={`/equipment/${item.ID}`} className="hover:underline">
                      #{item.ID}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900">{item.Equipmentname}</TableCell>
                  <TableCell className="text-zinc-600">{item.Date}</TableCell>
                  <TableCell>
                    <span className="font-medium text-zinc-900">${item.Price.toFixed(2)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // กรณีพิมพ์ค้นหาแล้ว แต่ไม่เจออะไรเลยในระบบ
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 gap-2">
            <Search className="size-10 stroke-[1.5] text-zinc-300" />
            <p className="text-sm font-medium">ไม่พบอุปกรณ์ที่ตรงกับคำว่า "{query}"</p>
          </div>
        )}
      </div>
    </div>
  )





}

export default SearchPage