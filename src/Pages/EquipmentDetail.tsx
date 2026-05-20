import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const EquipmentDetail = () => {
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
        <div className='Name'>Equipment 1</div>
        <div className='Category'>Electronics</div>
        <div className='Price'>5555 Baht</div>
        <div className = 'Status'>Active</div>
        <div className='description'>This is a sample equipment description.</div>
        <div className='maintenance-history'>Maintenance history will be displayed here.</div>
      </div>

    </div>    
  )
}

export default EquipmentDetail