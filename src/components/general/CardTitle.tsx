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
    <div className='flex items-center gap-2 min-w-0'>
      {sideIcon && sideIcon}
      <div className='flex flex-col gap-1 min-w-0 text-[#343434]'>
        <h1 className={`${isColorWhite ? "text-white" : "t-pri"} flex flex-wrap gap-2 items-center m-0 !font-semibold text-lg capitalize`} > {icon && icon} {title} {status && status}</h1>
        {description && <span className='t-pri font-normal text-sm wrap-break-word'>{description}</span>}
      </div>
    </div>
  )
}

export default CardTitle