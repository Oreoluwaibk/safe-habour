import { Button } from 'antd'
import React from 'react'

interface props {
    title: string;
    icon: any;
    onClick?: () => void;
}
const Socialbtn = ({ title, icon, onClick}: props) => {
  return (
    <Button className="icon-btn" type="primary" onClick={onClick}>
        {icon}
        {title}
    </Button>
  )
}

export default Socialbtn