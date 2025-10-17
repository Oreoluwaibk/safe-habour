"use client"
import { Button, Drawer } from 'antd';
import React from 'react'
import { NavItem } from './Container';
import Image from 'next/image';
import { Logo } from '../../../assets/logo';
import { useRouter } from 'next/navigation';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

interface props {
    open: boolean;
    onCancel: () => void;
    active: string;
    // loading: boolean;
}
const WorkerSideMenu = ({
    open,
    onCancel,
    active
    // loading
}: props) => {
    const router = useRouter();
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
            <div className='flex flex-col items-center gap-4'>
                <Button type='primary' className='!h-[50px] w-[180px] !rounded-[50px] primary-bg text-white !font-medium' onClick={() => router.push("/auth/choose-auth")}><PlusOutlined className="text-white" /> Post a Job</Button>
            </div>


            <div className="bg-white flex flex-col items-start gap-4">
                <NavItem href="/dashboard/worker" label="Dashboard" active={active === 'Dashboard'} /> 
                <NavItem href="/dashboard/worker/jobs" label="Jobs" active={active === 'Jobs'} /> 
                <NavItem href="/dashboard/worker/schedule" label="Schedule" active={active === 'Schedule'} /> 
                <NavItem href="/dashboard/worker/wallet" label="Wallet" active={active === 'Wallet'} /> 
                <NavItem href="/dashboard/worker/message" label="Message" active={active === 'Message'} /> 
                <NavItem href="/dashboard/worker/settings" label="Settings" active={active === 'Settings'} /> 
            </div>

        </div>
    </Drawer>
  )
}

export default WorkerSideMenu