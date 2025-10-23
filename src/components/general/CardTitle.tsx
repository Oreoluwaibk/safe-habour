import React, { ReactNode } from 'react'

interface props {
    title: string;
    description?: string | ReactNode;
    icon?: ReactNode;
    status?: ReactNode
}
const CardTitle = ({ title, description, icon, status }: props) => {
  return (
    <div className={`flex flex-col ${description && "pt-5"} text-[#343434]`}>
      <h1 className='t-pri flex gap-2 items-center !font-semibold text-lg'> {icon && icon} {title} {status && status}</h1>
      {description && <span className='t-pri mb-6 font-normal text-sm !wrap-break-word'>{description}</span>}
    </div>
  )
}

export default CardTitle