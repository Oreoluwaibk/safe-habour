import { Card, Switch } from 'antd'
import React from 'react'

interface props {
    title: string;
    description: string;
}
const CheckCard = ({ title, description }: props) => {
  return (
    <Card 
        style={{backgroundColor: "#FBFBFB", width: "100%"}} 
        styles={{body: {display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}}
    >
        <div className='w-full'>
            <p className='text-[#505050] font-medium text-lg'>{title}</p>
            <p className='text-[#808080]'>{description}</p>
        </div>

        <Switch />
    </Card>
  )
}

export default CheckCard