import React from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Link } from 'react-router'

import data from '../data.json'

// const items = [
//   {Equipment: 'Equipment 1', Status: 'Active', LastMaintenance: '2024-01-15'},
//   {Equipment: 'Equipment 2', Status: 'Inactive', LastMaintenance: '2024-02-20'},
//   {Equipment: 'Equipment 3', Status: 'Active', LastMaintenance: '2024-03-10'}
// ]

const EquipmentTable = () => {
  return (
    <Table>
      <TableCaption>A list of your equipments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>EquipmentName</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>               
        {data.map((item) => (
          <TableRow key={item.ID}>
            <TableCell className="font-medium text-blue-600 hover:underline">
              {/* [แก้ไขตรงนี้]: ใช้ Link วิ่งไปยัง ID ของอุปกรณ์ตัวนั้นๆ */}
              <Link to={`/equipment/${item.ID}`}>
                #{item.ID}
              </Link>
            </TableCell>
            <TableCell>{item.Equipmentname}</TableCell>
            <TableCell>{item.Date}</TableCell>
            <TableCell className="text-right">${item.Price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EquipmentTable