import { Card, Upload } from 'antd'
import React, { ReactNode } from 'react'

interface props {
    title: string;
    description: string;
    icon: ReactNode;
    isUploaded?: boolean
}
const UploadCard = ({ title, description, icon, isUploaded }: props) => {
  return (
    <Card  
      variant="borderless"
       style={{backgroundColor: isUploaded ? "#FFF9FA" : "#FBFBFB", width: "100%"}} 
      styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}
    >
    <Upload 
        className='flex items-center justify-between w-full'
        // beforeUpload={handleBeforeUpload}
        // onRemove={handleRemovePicture}
        accept=".jpg,.png,.jpeg,.pdf" 
        style={{width: "100%"}}
    >
        <div className='w-full'>
            <div className='flex items-center gap-1'>
                {icon} 
                <p className='text-[#505050] font-medium text-lg '>{title}</p>
            </div>
           
            <p className='text-[#808080]'>{description}</p>
        </div>
        {isUploaded && <div className='text-[#670316] bg-[#FFE4E9] rounded-[16px] px-2 h-[30px] flex items-center '>
            <span className='text-[#670316] text-[12px]'>uploaded</span>
        </div>}
       
    </Upload> 
    </Card>
   
  )
}

export default UploadCard