import { Button } from 'antd';
import React, { ReactNode } from 'react'

interface props {
    icon?: ReactNode;
    title: string;
    onClick: () => void;
    primary?: boolean;
    width?: number;
    height?: number;
}
const RoundBtn = ({ icon, title, onClick, primary, width = 144, height = 44 }: props) => {
  return (
    <Button onClick={onClick} type={primary ? "primary" : 'default'} className={`!h-[${height}px] min-w-[${width}px] !rounded-[200px]`} style={{width: width ? width : undefined, height: height?height:undefined}} icon={icon}>
        {title}
    </Button>
  )
}

export default RoundBtn