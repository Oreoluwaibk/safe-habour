import { Modal } from 'antd'
import React from 'react'
import { IAdminUserList } from '../../../../utils/interface';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';

interface props {
    open: boolean;
    onCancel: () => void;
    user: IAdminUserList;
    refresh: () => void;
}
const DeleteUser = ({
    onCancel,
    open,
    user
}: props) => {
  return (
     <Modal 
        open={open}
        onCancel={onCancel}
        footer={<div className='flex items-center gap-6'>
            <RoundBtn onClick={onCancel} title='No' width="50%" />
            <RoundBtn primary  onClick={onCancel} title="Yes" width="50%" />
        </div>}
        width={400}
        classNames={{ body: "flex flex-col justify-center items-center gap-4 text-sm"}}
    >
        <span style={{backgroundColor: "#FEE4E2"}} className='flex items-center justify-center w-12 h-12 rounded-full'>
            <Icon fontSize={20} icon="iconoir:cancel" color="#D92D20"  />
        </span>

        <p className='text-[#101828] text-lg font-medium'>Delete {user.fullName}</p>
        <p className='text-[#667085] text-center'>Are you sure you want to delete {user.fullName}? This action cannot be undone.</p>
    </Modal>
  )
}

export default DeleteUser