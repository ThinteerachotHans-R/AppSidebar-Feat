import React from 'react'
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
    status: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {

    switch(status){
        case 'อนุมัติ':
            return (<Badge className = "bg-green-100 text-green-800">อนุมัติ</Badge>)

        default:
            return (<Badge className = "bg-yellow-100 text-yellow-800">รอดำเนินการ</Badge>)
    }

}

interface CategoryBadgeProps {
    category: string
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
    
    switch(category){
        case 'อุปกรณ์IT': 
            return (<Badge className = "bg-blue-100 text-blue-800">อุปกรณ์IT</Badge>)
        
        default:
            return (<Badge className = "bg-gray-100 text-gray-800">เฟอร์นิเจอร์</Badge>)
    }

}
