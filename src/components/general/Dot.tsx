import React from 'react'

const Dot = ({ color, title }: { color: string; title?: string }) => {
  return (
    <div className='flex items-center gap-2'>
        <span className='rounded-full h-2 w-2' style={{ backgroundColor: color }}>

        </span>
        {title && <span className="text-[#1E1E1E] text-sm">{title}</span>}
    </div>
  )
}

export default Dot