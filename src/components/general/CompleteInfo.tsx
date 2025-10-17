import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React, { ReactNode } from 'react'

interface props {
    title: string;
    description: string;
    nav: string | ReactNode;
    onCancel: () => void;
}
const CompleteInfo = ({ title, description, nav, onCancel}: props) => {
  return (
    <div className='incomplete relative'>
        <InfoCircleOutlined className='mt-1' />
        <div className='flex flex-col gap-1'>
            <p className='font-semibold'>{title}</p>
            <p className='incomplete-des'>{description}</p>
            {nav}
        </div>
        <CloseOutlined onClick={onCancel} className='color-bg absolute right-4 top-4 z-[1] cursor-pointer' />
    </div>
  )
}

export default CompleteInfo