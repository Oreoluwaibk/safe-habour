import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'
import { Lightening } from '../../../../assets/icons';
// import { Icon } from '@iconify/react';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface props {
    isTransaction?: boolean;
    payout?: boolean;
}
const TransactionCard = ({ isTransaction, payout }: props) => {
  return (
    <Card variant="borderless" styles={{body: {display: "flex", gap: 10, padding: "20px 10px"}}}>
        <div  className='bg-[#FFF9FA] flex items-center justify-center !h-6 !w-6'>
            <Image src={Lightening} alt="" /> 
        </div>

        <div className='flex items-center justify-between w-full'>
            <div>
                <div className='flex items-center gap-2 text-sm'>
                    <p className='text-[#1e1e1e] font-medium'>Elderly Care</p>
                    {" - "}
                    <p className='text-[#373737]'>James Thompson</p>
                </div>
                {!isTransaction && <p>4-hour elderly care session scheduled for tomorrow</p>}

                <div className='text-[#646464] text-xs flex items-center gap-6 mt-2'>
                    <div className='flex items-center gap-2 '>
                        <CalendarOutlined />
                        <p>Held: Aug 31, 2025 12:38</p>
                    </div>

                    {!isTransaction && <div className='flex items-center gap-2 '>
                        <ClockCircleOutlined />
                        <p>Expires: Sep 01, 2025</p>
                    </div>}

                    {isTransaction && (
                        <div className='bg-[#FFF5F7] text-[#670316] rounded-[12px] text-[8px] p-1'><p>Payment</p></div>
                    )}
                </div>
            </div>

            <div className={`flex items-center ${payout && "flex-col-reverse"} gap-2`}>
                <p className='text-base text-[#1e1e1e]'>$12.00 CAD</p>

                <div className='bg-[#FFF5F7] text-[#670316] rounded-[12px] text-[8px] p-1'><p>Released</p></div>
            </div>
        </div>
    </Card>
  )
}

export default TransactionCard