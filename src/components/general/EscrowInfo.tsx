import { Card } from 'antd'
import React from 'react';
import { Icon } from '@iconify/react';

const EscrowInfo = () => {
  return (
    <Card variant="borderless" styles={{body: {display: "flex", gap: 10}}} className='border-l-4 border-l-[#670316]'>
        <div className='h-[24px] w-[24px] rounded-[100px] bg-[#fff4f6] flex items-center justify-center'>
            <Icon icon="line-md:security" color='#670316' />
        </div> 

        <div className='flex flex-col gap-1'>
            <p className='text-[#1e1e1e] font-semibold'>How Escrow Protection Works</p>  
            <p className='text-[#646464]'>Your payments are safely held in escrow until services are completed. This protects both you and the service provider. Funds are automatically released when you confirm service completion.</p>  
        </div>      
    </Card>
  )
}

export default EscrowInfo