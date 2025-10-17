import Image from 'next/image';
import React from 'react'
import { Lightening } from '../../../../assets/icons';
import "@/styles/client.css"


interface props {
  title: string;
  amount: string | number;
  isWallet?: boolean;
  info?: string;
  red?: boolean
}
const InfoCards = ({
  title,
  amount,
  isWallet, 
  info,
  red
}: props) => {
  return (
    <div className='info-card'>
      {!isWallet && <div className='flex items-center gap-4'>
        <div  className='bg-[#FFF9FA] flex items-center justify-center !h-6 !w-6'><Image src={Lightening} alt={title} /> </div>
        <p>{title}</p>
      </div>}
      {isWallet && <div className='flex items-center justify-between'>
        <p>{title}</p>
        <div  className='bg-[#FFF9FA] flex items-center justify-center !h-6 !w-6'><Image src={Lightening} alt={title} /> </div>
        
      </div>}
      <p className='text-[36px] font-semibold' style={{color: red? "#ff0004" : ""}}>{amount}</p>
      {info && <p className='text-[#646464] text-sm'>{info}</p>}
    </div>
  )
}

export default InfoCards