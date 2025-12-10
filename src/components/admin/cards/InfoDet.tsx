import React from 'react'

interface props {
    title: string;
    percent: string;
    bg: string;
    color: string;
    border: string;
}
const InfoDet = ({
    title,
    percent,
    bg,
    color,
    border
}: props) => {
  return (
    <div 
        className='flex rounded-[5px] items-center justify-between border py-2  px-3'
        style={{ color, borderColor: border, backgroundColor: bg}}
    >
      <span>{title}</span>
      <span>{percent}</span>  
    </div>
  )
}

export default InfoDet