import React from 'react'

interface props {
    title: string;
    bg?: string;
    color?: string;
    size?: number
}
const Status = ({ title, bg="#F4FFFA", color="#039855", size= 14}: props) => {
  return (
    <span style={{color, backgroundColor: bg, fontSize: size}} className='rounded-[68px] px-2 py-1'>{title}</span>
  )
}

export default Status