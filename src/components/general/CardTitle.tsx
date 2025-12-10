import React, { ReactNode } from 'react'

interface props {
    title: string | ReactNode;
    description?: string | ReactNode;
    icon?: ReactNode;
    status?: ReactNode;
    isColorWhite?: boolean;
    sideIcon?: ReactNode
}
const CardTitle = ({ title, description, icon, status, isColorWhite, sideIcon }: props) => {
  return (
    <div className='flex items-center gap-2'>
      {sideIcon && sideIcon}
      <div className={`flex flex-col ${description && "pt-5"} text-[#343434]`}>
        <h1 className={`${isColorWhite ? "text-white" : "t-pri"} flex gap-2 items-center !font-semibold text-lg capitalize`} > {icon && icon} {title} {status && status}</h1>
        {description && <span className='t-pri mb-6 font-normal text-sm !wrap-break-word'>{description}</span>}
      </div>
    </div>
  )
}

export default CardTitle