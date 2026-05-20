import React from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Link } from 'react-router'
const items = [
  {Equipment: 'Equipment 1', Status: 'Active', LastMaintenance: '2024-01-15'},
  {Equipment: 'Equipment 2', Status: 'Inactive', LastMaintenance: '2024-02-20'},
  {Equipment: 'Equipment 3', Status: 'Active', LastMaintenance: '2024-03-10'}
]

const EquipmentTable = () => {
  return (
    <Table>
      <TableCaption>A list of your equipments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Last Maintenance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>               
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Link to ="/equipment/detail">
                {index + 1}
              </Link>
            </TableCell>
            <TableCell>{item.Equipment}</TableCell>
            <TableCell>{item.Status}</TableCell>
            <TableCell className="text-right">{item.LastMaintenance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EquipmentTable