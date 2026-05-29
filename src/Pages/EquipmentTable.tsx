import React, { useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Link } from 'react-router'

import data from '../data.json'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// const items = [
//   {Equipment: 'Equipment 1', Status: 'Active', LastMaintenance: '2024-01-15'},
//   {Equipment: 'Equipment 2', Status: 'Inactive', LastMaintenance: '2024-02-20'},
//   {Equipment: 'Equipment 3', Status: 'Active', LastMaintenance: '2024-03-10'}
// ]

const EquipmentTable = () => {
  
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  
  const filteredResults = data.filter((item) => {
    // กรองด้วยข้อความค้นหา (ชื่ออุปกรณ์)
    const matchesSearch = item.Equipmentname.toLowerCase().includes(query.toLowerCase())
    
    // กรองด้วยหมวดหมู่ (ถ้าเลือก 'all' จะผ่านหมด ถ้าเลือกเจาะจงต้องตรงกัน)
    // หมายเหตุ: โค้ดนี้สมมติว่าใน data.json ของคุณมีฟิลด์ Category และ Status อยู่ด้วยครับ
    const matchesCategory = selectedCategory === 'all' || item.Category === selectedCategory
    
    // กรองด้วยสถานะ
    const matchesStatus = selectedStatus === 'all' || item.Status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleClearFilters = () => {
    setQuery('')
    setSelectedCategory('all')
    setSelectedStatus('all')
  }

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (selectedStatus !== 'all' ? 1 : 0)


  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/*Search Bar*/}
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
    <div>Filter</div>
    <div>Table</div>

    </div>
  )
}

export default EquipmentTable