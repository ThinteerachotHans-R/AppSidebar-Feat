import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import data from '../data.json'
import { useParams } from 'react-router'

const EquipmentDetail = () => {
  
  const { id } = useParams()  
  const equipment = data.find(item => item.ID === parseInt(id!))

  if (!equipment) {
    return <div>Equipment not found</div>
  }
  
  return (
    <div className='w-full mx-auto gap-2 flex'>
      <Card className='w-2/5'>
          <CardHeader>
            <CardTitle >Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent className='font-bold text-6xl'>
            <p>Card Content Such as pictures</p>
          </CardContent>
          <CardFooter className='font-medium text-2xl'>
            <p>Brief Description such as Lorem ipsum dolor sit amet.</p>
          </CardFooter>
      </Card>
      <div className='flex flex-col gap-4 px-4'>
        <div className='Name flex  gap-2'>
          <div className='font-bold'>Equipment Name: </div>
          <div>{equipment.Equipmentname}</div>
        </div>
        <div className='Date flex  items-center gap-2'>
          <div className='font-bold'>Added Date: </div>
          <div>{equipment.Date}</div>
        </div>
        <div className='Price flex items-center gap-2'>
          <div className='font-bold'>Price: </div>
          <div>{equipment.Price}</div>
        </div>
        <div className='description flex items-center gap-2'>
          <div className='font-bold'>Description: </div>
          <div>{equipment.Description}</div>
        </div>
      </div>

    </div>    
  )
}

export default EquipmentDetail