import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"




const EquipmentTable = () => {
  return (
    <Table>
      <TableCaption>A list of your equipments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>Laptop</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell className="text-right">$999.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default EquipmentTable