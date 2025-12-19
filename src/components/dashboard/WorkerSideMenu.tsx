"use client"
import { Button, Drawer } from 'antd';
import React from 'react'
import { NavItem } from './Container';
import Image from 'next/image';
import { Logo } from '../../../assets/logo';
import { CloseOutlined } from '@ant-design/icons';

interface props {
    open: boolean;
    onCancel: () => void;
    active: string;
    handleLogout: () => void;
    loading: boolean;
    // loading: boolean;
}
const WorkerSideMenu = ({
    open,
    onCancel,
    active,
    handleLogout, loading
    // loading
}: props) => {
  return (
    <Drawer
        open={open}
        onClose={onCancel}
        placement="left"
        title={
            <div className='flex items-center justify-between'>
                <Image 
                    src={Logo}
                    alt='Safe Habour'
                    className="bg-white"
                />

                <CloseOutlined className='color-bg ml-3 cursor-pointer' onClick={onCancel} />
            </div>
            
        }
        width={250}
        closeIcon={null}
        // loading={loading}
    >
        <div style={{display: "flex", flexDirection: "column", gap: 20, height: "100%", alignItems:"flex-start"}}>
           
            <div className="bg-white flex flex-col items-start gap-4">
                <NavItem href="/dashboard/worker" label="Dashboard" active={active === 'Dashboard'} /> 
                <NavItem href="/dashboard/worker/jobs" label="Jobs" active={active === 'Jobs'} /> 
                <NavItem href="/dashboard/worker/schedule" label="Schedule" active={active === 'Schedule'} /> 
                <NavItem href="/dashboard/worker/wallet" label="Wallet" active={active === 'Wallet'} /> 
                <NavItem href="/dashboard/worker/message" label="Message" active={active === 'Message'} /> 
                <NavItem href="/dashboard/worker/settings" label="Settings" active={active === 'Settings'} /> 
            </div>

            <div className="mt-6 w-full">
                <Button
                    type="primary"
                    className="!h-[50px] w-full !rounded-[50px] primary-bg !font-medium"
                    onClick={handleLogout}
                    loading={loading}
                >
                    Logout
                </Button>
            </div>

        </div>
    </Drawer>
  )
}

export default WorkerSideMenu