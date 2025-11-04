"use client"
import "@/styles/client.css"
import { BellFilled, MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Logo } from '../../../assets/logo';
import Image from 'next/image';
import NotificationCard from "../general/NotificationCard";
import { CheckedCircle, MaskedLogo } from "../../../assets/icons";
import WorkerSideMenu from "./WorkerSideMenu";
import { useAppSelector } from "@/hook";
import { logoutUser } from "@/redux/action/auth";

const { Content, Header } = Layout;

type Props = {
    children: ReactNode;
    active: string;
}

export const NavItem = ({ href, label, active, mobile }: { href: string, label: string; active: boolean; mobile?: boolean}) => {
    return(

    <Link href={href}>
      <span className={`menu-link ${active ? 'active' : ''} ${mobile ? '!text-lg font-semibold text-[#1E1E1E]' : ''} text-text`}>{label}</span>
    </Link>
)};
const WorkerContainer = ({
    children,
    active
}:Props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [ showNotification, setShowNotification ] = useState(false);
    const { isAuthenticated } = useAppSelector(state => state.auth);

   const handleLogout = useCallback(() => {
    logoutUser()
      .then((res) => {
        if (res.status === 200) {
          router.push("/auth/login");
        }
      })
      .catch((err) => {
        console.log("error logging out", err);
        router.push("/auth/login");
      });
  }, [router]); 

  useEffect(() => {
    if (!isAuthenticated) handleLogout();
  }, [isAuthenticated, handleLogout]); 

  return (
     <Layout >
        <Layout>
            <Content className="bg-white">
                <Header className="client-nav prim-bg bg-white sticky top-5 z-[2]" >
                    <div className='flex items-center justify-between w-[60%]'>
                        <Link href="/" className=''>
                        <Image 
                            src={Logo}
                            alt='Safe Habour'
                            className="bg-white md:hidden mt-8"
                        />
                        <Image 
                            src={MaskedLogo}
                            alt='Safe Habour'
                            className="md:block"
                        />

                        </Link>
                       

                        <div className="md:flex items-center gap-8 hidden">
                            <NavItem href="/dashboard/worker" label="Dashboard" active={active === 'Dashboard'} /> 
                            <NavItem href="/dashboard/worker/jobs" label="Jobs" active={active === 'Jobs'} /> 
                            <NavItem href="/dashboard/worker/schedule" label="Schedule" active={active === 'Schedule'} /> 
                            <NavItem href="/dashboard/worker/wallet" label="Wallet" active={active === 'Wallet'} /> 
                            <NavItem href="/dashboard/worker/message" label="Message" active={active === 'Message'} /> 
                            <NavItem href="/dashboard/worker/settings" label="Settings" active={active === 'Settings'} /> 
                        </div>
                    </div>
                    

                    <div className='hidden md:flex items-center gap-4'>
                        <div className="icon-div icon-bg">
                            <SearchOutlined className="!text-white !text-lg" />
                        </div>
                        <div className="icon-div icon-bg">
                            <BellFilled className="!text-white !text-lg" onClick={() => setShowNotification(!showNotification)} />
                        </div>
                        <div className="relative">
                            <Avatar icon={<UserOutlined />} onClick={() => router.push("/dashboard/worker/profile")} size={48} className="cursor-pointer !border-[#039855] !border" />
                            <div className="bg-[#EAFFF5] h-[14px] w-[14px] rounded-[100px] flex items-center justify-center absolute z-[1] right-[-4px] top-2">
                                <Image src={CheckedCircle} alt="image" className="!text-[#039855] " />
                            </div>
                        </div>
                       
                        {/* <Button type='primary' className='!h-[50px] w-[160px] !rounded-[50px] !bg-white color-bg !font-medium hover:!text-[#670316]' onClick={() => setOpenJobModal(true)}><PlusOutlined className="" /> Post a Job</Button> */}
                    </div>

                    <div className='flex md:hidden items-center gap-2'>
                        <SearchOutlined className="!text-black !text-lg" />
                        <div className="icon-div icon-bg">
                            <BellFilled className="!text-white !text-lg" onClick={() => setShowNotification(!showNotification)} />
                        </div>
                        {<MenuOutlined className='md:!hidden text-2xl' onClick={() => setOpen(!open)} />}
                    </div>

                </Header>
                <Layout className='!bg-white '>
                    {showNotification && <div className="fixed md:top-[120px] md:right-[15px] right-[30px] h-[134px] w-[80%] md:w-[400px] z-[2] mt-[-20px] cursor-pointer" onClick={() => router.push("/dashboard/notification")}>
                        <NotificationCard isFixed onCancel={() => setShowNotification(false)} />
                    </div>}
                    <div className="md:px-[50px] px-4">
                    {children}
                    </div>   
                </Layout>
                {open && <WorkerSideMenu active={active} open={open} onCancel={() => setOpen(false)} />}
            </Content>
        </Layout>
    </Layout>
  )
}

export default WorkerContainer