import React from 'react'

const Steps = ({ value }: { value: number }) => {
  return (
    <div className='flex items-center gap-2'>
        <div className={`step ${value === 1 && "step-active"}`}></div>
        <div className={`step ${value === 2 && "step-active"}`}></div>
        <div className={`step ${value === 3 && "step-active"}`}></div>
        <div className={`step ${value === 4 && "step-active"}`}></div>
        <div className={`step ${value === 5 && "step-active"}`}></div>
    </div>
  )
}

export default Steps