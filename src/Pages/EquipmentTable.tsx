import React, { useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Link } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import data from '../data.json'
import { Input } from '@/components/ui/input'
import { Filter, Search, SlidersHorizontal, X, SquarePen, Eye,Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryBadge, StatusBadge } from '../AppComponents/EquipmentBadges'
import { Dialog,DialogContent,DialogHeader,DialogDescription,DialogTitle,DialogFooter } from '@/components/ui/dialog'

// const items = [
//   {Equipment: 'Equipment 1', Status: 'Active', LastMaintenance: '2024-01-15'},
//   {Equipment: 'Equipment 2', Status: 'Inactive', LastMaintenance: '2024-02-20'},
//   {Equipment: 'Equipment 3', Status: 'Active', LastMaintenance: '2024-03-10'}
// ]

const EquipmentTable = () => {
  
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [selectedStatus, setSelectedStatus] = useState('ทั้งหมด')
  const [showWatch, setShowWatch] = useState(false) // open eye
  const [showEdit, setShowEdit] = useState(false)  // edit
  
  // แหล่งข้อมูลหลักของตารางและตัวเก็บข้อมูลแถวที่เลือกใช้งาน
  const [EquipmentList, setEquipmentList] = useState(data) 
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  // State สำหรับเก็บข้อมูลในฟอร์มแก้ไข
  const [editForm, setEditForm] = useState({
    ID: 0,
    Equipmentname: '',
    Category: '',
    Status: '',
    Document: 0
  })

  
 // [FIXED BUG]: เปลี่ยนมาใช้ EquipmentList ในการกรอง เพื่อรองรับปุ่มลบ/แก้ไขให้ทำงานเรียลไทม์
  const filteredResults = EquipmentList.filter((item) => {
    const matchesSearch = item.Equipmentname.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.Category === selectedCategory
    const matchesStatus = selectedStatus === 'ทั้งหมด' || item.Status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleClearFilters = () => {
    setQuery('')
    setSelectedCategory('ทั้งหมด')
    setSelectedStatus('ทั้งหมด')
  }

  // 🔘 ปุ่มกดดูข้อมูล (Eye Icon)
  const handleWatchClick = (item: any) => {
    setSelectedItem(item)
    setShowWatch(true)
  }

  // 🔘 ปุ่มกดแก้ไขข้อมูล (SquarePen Icon)
  const handleEditClick = (item: any) => {
    setSelectedItem(item)
    setEditForm({
      ID: item.ID,
      Equipmentname: item.Equipmentname,
      Category: item.Category,
      Status: item.Status,
      Document: item.Document
    })
    setShowEdit(true)
  }

  // 🔘 ฟังก์ชันอัปเดตข้อมูลหลังกดยืนยันการแก้ไข
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedList = EquipmentList.map((item) => {
      if (item.ID === editForm.ID) {
        return {
          ...item,
          Equipmentname: editForm.Equipmentname,
          Category: editForm.Category,
          Status: editForm.Status,
          Document: editForm.Document
          // ไม่ได้ใส่ฟิลด์ Date ตรงนี้ เพื่อล็อกไม่ให้เปลี่ยนแปลงค่าเวลาเดิม
        }
      }
      return item
    })
    setEquipmentList(updatedList)
    setShowEdit(false)
  }

  // 🔘 ปุ่มกดลบข้อมูลครุภัณฑ์ (Trash Icon)
  const handleDelete = (idToDelete: string) => {
    if (window.confirm(`คุณต้องการลบครุภัณฑ์รหัส ${idToDelete} ใช่หรือไม่?`)) {
      const remainedItems = EquipmentList.filter((item) => item.ID !== idToDelete)
      setEquipmentList(remainedItems)
    }
  }





  // const activeFilterCount = 
  //   (selectedCategory !== 'all' ? 1 : 0) + 
  //   (selectedStatus !== 'all' ? 1 : 0)

  



  function getStatusBadge(Status: string): React.ReactNode {
    return <StatusBadge status={Status} />;
  }

  function getCategoryBadge(Category: string): React.ReactNode {
    return <CategoryBadge category={Category} />;
  }

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
      {/*Filter*/}
    <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mr-2">
            <SlidersHorizontal className="size-4 text-zinc-500" />
            <span>ตัวกรอง:</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white border-zinc-200 shadow-sm text-zinc-700">
                หมวดหมู่: <span className="text-indigo-600 font-bold ml-1">{selectedCategory === 'ทั้งหมด' ? 'ทั้งหมด' : selectedCategory}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white">
              <DropdownMenuLabel>เลือกหมวดหมู่</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                <DropdownMenuRadioItem value="ทั้งหมด">ทั้งหมด</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="อุปกรณ์IT">อุปกรณ์IT</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</DropdownMenuRadioItem>
                
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white border-zinc-200 shadow-sm text-zinc-700">
                สถานะ: <span className="text-indigo-600 font-bold ml-1">{selectedStatus === 'ทั้งหมด' ? 'ทั้งหมด' : selectedStatus}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white">
              <DropdownMenuLabel>เลือกสถานะการใช้งาน</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
                <DropdownMenuRadioItem value="ทั้งหมด">ทั้งหมด</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="อนุมัติ">อนุมัติ</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="รอดำเนินการ">รอดำเนินการ</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {(selectedCategory !== 'all' || selectedStatus !== 'all' || query !== '') && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-zinc-500 flex items-center gap-1.5 text-xs">
            <X className="size-3.5" /> ล้างตัวกรองทั้งหมด
          </Button>
        )}
      </div>
    {/*Table*/}
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100 font-medium">
            <TableRow>
              <TableHead >รหัสครุภัรฑ์</TableHead>
              <TableHead >ชื่อครุภัณฑ์</TableHead>
              <TableHead >หมวดหมู่</TableHead>
              <TableHead>วันที่ลงทะเบียน</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>เอกสาร</TableHead>
              <TableHead className = "text-center">การจัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <TableRow key={item.ID} className="hover:bg-zinc-50/80 transition-colors">
                  <TableCell className="font-medium text-blue-600 text-center">
                    {item.ID}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900">{item.Equipmentname}</TableCell>
                  
                  {/* [POINT 1]: เรียกใช้งานฟังก์ชัน Badge ของหมวดหมู่ */}
                  <TableCell>{getCategoryBadge(item.Category)}</TableCell>
                  
                  <TableCell className="text-zinc-600">{item.Date}</TableCell>

                  {/* [POINT 2]: เรียกใช้งานฟังก์ชัน Badge ของสถานะ */}
                  <TableCell>{getStatusBadge(item.Status)}</TableCell>
                  
                  <TableCell>{item.Document} ไฟล์</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button onClick={() => handleWatchClick(item)}>
                        <Eye className="size-4" />
                      </Button>

                      <Button onClick={() => handleEditClick(item)}>
                        <SquarePen className="size-4" />
                      </Button>

                      <Button variant="destructive" onClick={() => handleDelete(item.ID)}>
                        <Trash2 className="size-4" />
                      </Button>


                    </div>
                    
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16 text-zinc-400">
                  <Filter className="size-10 stroke-[1.5] text-zinc-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">ไม่พบอุปกรณ์ที่ตรงตามเงื่อนไข</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showWatch} onOpenChange={setShowWatch}>
        <DialogContent className="bg-white max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-zinc-900">รายละเอียดข้อมูลครุภัณฑ์</DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">ข้อมูลทางสถิติที่จัดเก็บไว้ในฐานข้อมูล</DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-3.5 py-4 my-2 border-y border-zinc-100 text-sm text-zinc-700">
              <p className="flex justify-between"><strong>รหัสครุภัณฑ์:</strong> <span className="font-semibold text-zinc-900">{selectedItem.ID}</span></p>
              <p className="flex justify-between"><strong>ชื่อครุภัณฑ์:</strong> <span className="text-zinc-900">{selectedItem.Equipmentname}</span></p>
              <div className="flex justify-between items-center"><strong>หมวดหมู่:</strong> <span>{getCategoryBadge(selectedItem.Category)}</span></div>
              <p className="flex justify-between"><strong>วันที่ลงทะเบียน:</strong> <span className="text-zinc-600">{selectedItem.Date}</span></p>
              <div className="flex justify-between items-center"><strong>สถานะปัจจุบัน:</strong> <span>{getStatusBadge(selectedItem.Status)}</span></div>
              <p className="flex justify-between"><strong>จำนวนเอกสารแนบ:</strong> <span className="text-zinc-900">{selectedItem.Document} ไฟล์</span></p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowWatch(false)} className="w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg">
              ปิดหน้าต่าง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="bg-white max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-zinc-900">แก้ไขข้อมูลครุภัณฑ์</DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">คุณสามารถแก้ไขรายละเอียดครุภัณฑ์ได้ ยกเว้นเวลาและรหัสระบบ</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveEdit} className="space-y-4 py-3">
            {/* รหัสครุภัณฑ์ (ล็อกห้ามแก้) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500">รหัสครุภัณฑ์</label>
              <Input value={editForm.ID} disabled className="bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed" />
            </div>

            {/* ชื่อครุภัณฑ์ */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">ชื่อครุภัณฑ์</label>
              <Input 
                type="text" 
                value={editForm.Equipmentname} 
                onChange={(e) => setEditForm({...editForm, Equipmentname: e.target.value})}
                className="border-zinc-200 bg-white"
                required
              />
            </div>

            {/* หมวดหมู่ */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">หมวดหมู่ครุภัณฑ์</label>
              <select 
                value={editForm.Category} 
                onChange={(e) => setEditForm({...editForm, Category: e.target.value})}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="อุปกรณ์IT">อุปกรณ์IT</option>
                <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
              </select>
            </div>

            {/* วันที่ลงทะเบียน (ห้ามแก้ไขเด็ดขาดตามโจทย์กำหนด) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500">วันที่ลงทะเบียน (ไม่สามารถแก้ไขได้)</label>
              <Input 
                value={selectedItem ? selectedItem.Date : ''} 
                readOnly 
                disabled
                className="bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed" 
              />
            </div>

            {/* สถานะ */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">สถานะคำขอ</label>
              <select 
                value={editForm.Status} 
                onChange={(e) => setEditForm({...editForm, Status: e.target.value})}
                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="อนุมัติ">อนุมัติ</option>
                <option value="รอดำเนินการ">รอดำเนินการ</option>
              </select>
            </div>

            {/* จำนวนเอกสารแนบ */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700">จำนวนเอกสารแนบ (ไฟล์)</label>
              <Input 
                type="number" 
                value={editForm.Document} 
                onChange={(e) => setEditForm({...editForm, Document: Number(e.target.value)})}
                className="border-zinc-200 bg-white"
                min="0"
              />
            </div>

            <DialogFooter className="pt-4 gap-2 flex sm:flex-row flex-col">
              <Button type="button" variant="outline" onClick={() => setShowEdit(false)} className="w-full sm:w-auto border-zinc-200">
                ยกเลิก
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium">
                บันทึกการเปลี่ยนแปลง
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>



    </div>
  )
}

export default EquipmentTable