"use client"
import { Button, Drawer } from 'antd';
import React from 'react'
import { NavItem } from './Container';
import Image from 'next/image';
import { Logo } from '../../../assets/logo';
import { useRouter } from 'next/navigation';

interface props {
    open: boolean;
    onCancel: () => void;
    active: string;
    // loading: boolean;
}
const Sidemenu = ({
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
            <div className='flex items-center justify-center'>
                <Image 
                    src={Logo}
                    alt='Safe Habour'
                    className="bg-white"
                />
            </div>
            
        }
        width={250}
        // loading={loading}
    >
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
            <div className="bg-white flex flex-col items-start gap-4">
                <NavItem href="/" label="Home" active={active === 'Home'} mobile /> 
                <NavItem href="/about" label="About Us" active={active === 'About Us'} mobile/> 
                <NavItem href="/services" label="Services" active={active === 'Services'} mobile/> 
                <NavItem href="/how-it-works" label="How it works" active={active === 'How it works'} mobile/> 
                <NavItem href="/trust-and-safety" label="Trust & Safety" active={active === 'Trust & Safety'} mobile/> 
                <NavItem href="/faqs" label="FAQs" active={active === 'FAQs'} mobile/> 
                <NavItem href="/blogs" label="Blogs" active={active === 'Blogs'} mobile/> 
            </div>
        
            

            <div className='flex flex-col items-center gap-4'>
                <Button  className='!text-[#667085] !text-base !h-[54px] !w-full' onClick={() => router.push("/auth/login")}>Login</Button>
                <Button type='primary' className='!h-[54px] !w-full !rounded-[8px]' onClick={() => router.push("/auth/choose-auth")}>Sign Up</Button>
            </div>

        </div>
    </Drawer>
  )
}

export default Sidemenu