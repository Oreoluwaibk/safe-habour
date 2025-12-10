import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'

const EscrowFunds = () => {
  return (
    <div className='flex rounded-xl items-center justify-between text-[#1e1e1e] border border-[#e4e4e4] px-4'>
        <div className='flex items-center gap-4'>
            <CardTitle  
                title={<p>Sarah Johnson <ArrowRightOutlined /> Alex Turner</p>}
                description="Cooking"
            />
        </div>

        <div className='flex flex-col gap-3'>
            <span className='font-semibold text-lg text-[#1e1e1e]'>$127.50</span>

            <Status title='In Escrow' bg='#FFF4F6' color='#670316' />
        </div>
        
    </div>
  )
}

export default EscrowFunds