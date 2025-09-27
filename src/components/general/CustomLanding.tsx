import React, { ReactNode } from 'react'


interface props {
    title: string;
    description: string;
    colorText: string;
    input?: ReactNode
    button?: ReactNode;
}
const CustomLanding = ({ title, description, colorText, input, button}: props) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center md:text-left md:!py-[80px] !py-[42px] bg-[#FFF8F9] md:!px-30 px-[20px]">
        <p className="text-[#670316] text-lg font-semibold">{colorText}</p>
        <p className="text-2xl md:text-[48px] text-[#1E1E1E] font-bold" style={{fontFamily: "Open Sans"}}>
        {title}
        </p>
        <p className="text-[#424242] text-xl mt-3 mb-8 text-center">
        {description}
        </p>
        {/* <Inpu 
        placeholder="Search"
        prefix={<SearchOutlined />}
        className="input"
        /> */}
        {input}
        {button}
    </div>
  )
}

export default CustomLanding