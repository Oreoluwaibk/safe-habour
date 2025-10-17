import Image from 'next/image';
import React, { ReactNode } from 'react'
import { Lightening } from '../../../../assets/icons';
import "@/styles/workers.css"


interface props {
  title: string;
  amount: string | number;
  isWallet?: boolean;
  info?: string | ReactNode;
  red?: boolean;
  icon?: ReactNode
}
const InfoWalletCards = ({
  title,
  amount,
  isWallet, 
  info,
  red,
  icon
}: props) => {
  return (
    <div className='info-worker-card'>
      {!isWallet && <div className='flex items-center gap-4'>
        <div  className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>{icon ? icon :<Image src={Lightening} alt={title} />} </div>
        <p>{title}</p>
      </div>}
      {isWallet && <div className='flex items-center justify-between'>
        <p>{title}</p>
        <div  className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>{icon ? icon :<Image src={Lightening} alt={title} />} </div>
        
      </div>}
      <p className='text-[36px] font-semibold' style={{color: red? "#ff0004" : ""}}>{amount}</p>
      {info && <span className='text-[#646464] text-sm'>{info}</span>}
    </div>
  )
}

export default InfoWalletCards