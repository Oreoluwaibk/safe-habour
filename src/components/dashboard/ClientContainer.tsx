"use client"
import "@/styles/client.css"
import { BellFilled, MenuOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { App, Button, Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import ClientSidemenu from './ClientSideMenu';
import { Logo } from '../../../assets/logo';
import Image from 'next/image';
import PostJob from "../client/modal/PostJob";
import NotificationCard from "../general/NotificationCard";
import { MaskedLogo } from "../../../assets/icons";
import { useAppSelector } from "@/hook";
import { logoutUser } from "@/redux/action/auth";
import { INotification } from "../../../utils/interface";
import NotificationToast from "../notification/NotificationToast";
import { NotificationBell } from "../notification/NotificationBell";
import { useAuthentication } from "@/hooks/useAuthentication";

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
const ClientContainer = ({
    children,
    active
}:Props) => {
    const router = useRouter();
    const { message } = App.useApp();
    const [open, setOpen] = useState(false);
    const [ openJobModal, setOpenJobModal ] = useState(false);
    const [ showNotification, setShowNotification ] = useState(false);
    const { isAuthenticated, loginType } = useAppSelector(state => state.auth);
    const { authentication } = useAuthentication();
    const [ notification ] = useState<INotification>({
    "id": "string",
    "title": "string",
    "message": "string",
    "type": 0,
    "typeName": "string",
    "priority": 0,
    "priorityName": "string",
    "data": {
        // key-value dynamic object
    },
    "actionUrl": "string",
    "iconUrl": "string",
    "requiresAction": true,
    "isRead": false,
    "isDelivered": false,
    "expiresAt": "2025-01-01T00:00:00Z",
    "createdAt": "2025-01-01T00:00:00Z",
    "readAt": "2025-01-01T00:00:00Z",
    "deliveredAt": "2025-01-01T00:00:00Z"
    });

    const handleLogout = useCallback(() => {
    logoutUser()
      .then((res) => {
        if (res.status === 200) {
          router.push("/auth/login");
        }
      })
      .catch((err) => {
        router.push("/auth/login");
        console.log("err:", err)
      });
    }, [router]); // ✅ stable dependency

    useEffect(() => {
        if (!isAuthenticated) handleLogout();
    }, [isAuthenticated, handleLogout]); 

    useEffect(() => {
        if(isAuthenticated && loginType !== "ClientUser") {
            router.replace("/dashboard/worker")
        }
    }, [loginType, isAuthenticated, router]);

    const handlePostJob = () => {
        if(!authentication?.isVerified) 
            return message.info("You have not been verified, this feature is only available to verified users!");
        setOpenJobModal(true);
    }
    
  return (
     <Layout >
        <Layout>
            <Content className="bg-white">
                <Header className="client-nav prim-bg bg-white" >
                    <div className='flex items-center justify-between w-[50%]'>
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
                            <NavItem href="/dashboard/client" label="Dashboard" active={active === 'Dashboard'} /> 
                            <NavItem href="/dashboard/client/worker" label="Worker" active={active === 'Worker'} /> 
                            <NavItem href="/dashboard/client/wallet" label="Wallet" active={active === 'Wallet'} /> 
                            <NavItem href="/dashboard/client/message" label="Messages" active={active === 'Messages'} /> 
                            <NavItem href="/dashboard/client/profile" label="Profile" active={active === 'Profile'} /> 
                        </div>
                    </div>
                    

                    <div className='hidden md:flex items-center gap-4'>
                        <div className="icon-div icon-bg">
                            <SearchOutlined className="!text-white !text-lg" />
                        </div>
                        <NotificationToast />
                        <div className="mt-2">
                            <NotificationBell />
                        </div>
                        <Button 
                            type='primary' 
                            className='!h-[50px] w-[160px] !rounded-[50px] !bg-white color-bg !font-medium hover:!text-[#670316]' 
                            onClick={handlePostJob}>
                                <PlusOutlined className="" /> 
                                Post a Job
                            </Button>
                    </div>

                    <div className='flex md:hidden items-center gap-2'>
                        <SearchOutlined className="!text-black !text-lg" />
                        <div className="icon-div icon-bg" style={{backgroundColor: "#BF021F"}}>
                            <BellFilled className="!text-white !text-lg" onClick={() => setShowNotification(!showNotification)} />
                        </div>
                        {<MenuOutlined className='md:!hidden text-2xl' onClick={() => setOpen(!open)} />}
                    </div>

                </Header>
                <Layout className='!bg-white '>
                    {showNotification && <div className="fixed md:top-[120px] md:right-[15px] right-[30px] h-[134px] w-[80%] md:w-[400px] z-[2] mt-[-20px] cursor-pointer" onClick={() => router.push("/dashboard/notification")}>
                        <NotificationCard 
                            isFixed 
                            onCancel={() => setShowNotification(false)} 
                            notification={notification}
                        />
                    </div>}
                    <div className="md:px-[50px] px-4">
                    {children}
                    </div>   
                </Layout>
                {open && <ClientSidemenu active={active} open={open} onCancel={() => setOpen(false)} />}
                {openJobModal && <PostJob open={openJobModal} onCancel={() => setOpenJobModal(false)} />}
            </Content>
        </Layout>
    </Layout>
  )
}

export default ClientContainer