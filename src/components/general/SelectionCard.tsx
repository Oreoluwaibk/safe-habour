import React, { ReactNode } from 'react'

interface props {
    title: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    onClick?: () => void;
}
const SelectionCard = ({
    title,
    prefix,
    suffix,
    onClick
}: props) => {
  return (
    <div 
        className='rounded-full h-7 border border-[#707070] text-[#343434] px-1 py-2 flex items-center gap-2 justify-center' 
        style={{cursor: prefix ? "pointer": undefined}} 
        onClick={onClick}
    >
        {prefix}
       <p className='text-[10px]'>{title}</p> 
        {suffix}
    </div>
  )
}

export default SelectionCard