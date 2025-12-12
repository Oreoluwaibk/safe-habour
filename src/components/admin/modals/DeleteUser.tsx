import { App, Modal } from 'antd'
import React, { useState } from 'react'
import { IAdminUserList } from '../../../../utils/interface';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { disableAnAdminUser, enableAnAdminUser } from '@/redux/action/admin';

interface props {
    open: boolean;
    onCancel: () => void;
    user: IAdminUserList;
    refresh: () => void;
    isEnable: boolean;
}
const DeleteUser = ({
    onCancel,
    open,
    user,
    refresh,
    isEnable
}: props) => {
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);

    const handleDisable = () => {
        setLoading(true);
        disableAnAdminUser(user.id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                modal.success({
                    title: res.data.message || "Admin disabled successfully",
                    onOk: () => {
                        onCancel();
                        refresh();
                    }
                })
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: `Unable to disable admin user`,
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
            });
        })
    }

    const handleEnable = () => {
        setLoading(true);
        enableAnAdminUser(user.id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                modal.success({
                    title: res.data.message || "Admin enabled successfully",
                    onOk: () => {
                        onCancel();
                        refresh();
                    }
                })
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: `Unable to enable admin user`,
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
            });
        })
    }

    const handleSubmit = () => {
        if(isEnable) handleEnable();
        else handleDisable();
    }
    
  return (
     <Modal 
        open={open}
        onCancel={onCancel}
        footer={<div className='flex items-center gap-6'>
            <RoundBtn onClick={onCancel} title='No' width="50%" />
            <RoundBtn primary loading={loading} onClick={handleSubmit} title="Yes" width="50%" />
        </div>}
        width={400}
        classNames={{ body: "flex flex-col justify-center items-center gap-4 text-sm"}}
    >
        <span style={{backgroundColor: isEnable ? "#D1FADF" : "#FEE4E2"}} className='flex items-center justify-center w-12 h-12 rounded-full'>
            <Icon fontSize={20} icon={isEnable ? "mdi:checkbox-marked-circle-outline" : "iconoir:cancel"} color={isEnable ? "#039855" :"#D92D20"}  />
        </span>

        <p className='text-[#101828] text-lg font-medium'>{isEnable ? "Enable" : "Disable"} {user.fullName}</p>
        <p className='text-[#667085] text-center'>Are you sure you want to {isEnable ? "Enable" : "Disable"} {user.fullName}? This action cannot be undone.</p>
    </Modal>
  )
}

export default DeleteUser