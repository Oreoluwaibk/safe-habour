import React, { ReactNode } from 'react';
import "@/styles/auth.css";
import { Radio } from 'antd';


interface props {
    icon: ReactNode;
    title: string;
    isSelected?: boolean;
    onCheck?: () => void;
}
const AuthChooser = ({ icon, title, isSelected, onCheck }: props) => {
  return (
    <div className={`auth-chooser ${isSelected ? "auth-chooser-selected" : ""}`} onClick={onCheck}>
        <Radio checked={isSelected} className='auth-radio' onClick={onCheck} />
        <div className='icon-div'>{icon}</div>
        <p className='auth-choose-p'>{title}</p>
    </div>
  )
}

export default AuthChooser