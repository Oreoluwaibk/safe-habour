import React from 'react'

interface props {
  title: string;
  bg?: string;
  color?: string;
  size?: number;
  onClick?: () => void;
  
}
const Status = ({ title, bg="#F4FFFA", color="#039855", size= 14, onClick}: props) => {
  return (
    <span 
      onClick={onClick}
      style={{
        color, 
        backgroundColor: bg, 
        fontSize: size,
        cursor: onClick ? "pointer" : undefined,
        borderColor: onClick ? color : undefined,
        borderWidth: onClick ? 1 : undefined
      }} className='rounded-[68px] px-2 py-1'>
        {title}
      </span>
  )
}

export default Status