import { Button } from 'antd'
import React, { ReactNode } from 'react'

interface props {
  title: string;
  icon: ReactNode;
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