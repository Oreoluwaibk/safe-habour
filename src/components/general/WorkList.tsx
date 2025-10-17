import React, { ReactNode } from 'react'
import "@/styles/howworks.css"

interface props {
  icon: ReactNode;
  title: string;
  p1: string;
  p2: string;
}
const WorkList = ({
  icon,
  title,
  p1,
  p2
}: props) => {
  return (
    <div className='list'>
      <div className='icon'>{icon}</div>
      <p className='title'>{title}</p>
      <p className='paragraph mb-4'>{p1}</p>
      <p className='paragraph'>{p2}</p>
    </div>
  )
}

export default WorkList