"use client"
import "@/styles/client.css"
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Image as AntDImage, App } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState, useTransition } from 'react'
import { Logo } from '../../../assets/logo';
import Image from 'next/image';
import NotificationCard from "../general/NotificationCard";
import { CheckedCircle, MaskedLogo } from "../../../assets/icons";
import WorkerSideMenu from "./WorkerSideMenu";
import { useAppDispatch, useAppSelector } from "@/hook";
import { logoutUser as logoutEndpoint } from "@/redux/action/auth";
import { INotification } from "../../../utils/interface";
import { useAuthentication } from "@/hooks/useAuthentication";
import { pictureUrl } from "../../../utils/axiosConfig";
import { NotificationBell } from "../notification/NotificationBell";
import NotificationToast from "../notification/NotificationToast";
import WorkerSearch from "../general/search/WorkerSearch";
import { logoutUser } from "@/redux/reducer/auth/auth";

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
    const { modal } = App.useApp();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [ showNotification, setShowNotification ] = useState(false);
    const { isAuthenticated, loginType } = useAppSelector(state => state.auth);
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
    const { authentication } = useAuthentication();
    const [ isPending, startTransition ] = useTransition();
    const [ loading, setLoading ] = useState(false);

    const handleLogout = useCallback(() => {
        setLoading(true);
        logoutEndpoint()
            .then((res) => {
            if (res.status === 200) {
                    setLoading(false);
                    dispatch(logoutUser())
                    startTransition(() => {
                        router.push("/auth/login");
                    })
                
            }
        })
        .catch((err) => {
            setLoading(false);
            startTransition(() => {
                dispatch(logoutUser())
                router.push("/auth/login");
            })
            console.log("err:", err)
        });
    }, [router, dispatch]); 

    const handleAskLogout = () => {
        modal.info({
            title: "Are you sure you want to logout",
            onOk: ()=> handleLogout(),
            closable: true
        })
    }

    useEffect(() => {
        if (!isAuthenticated) handleLogout();
    }, [isAuthenticated, handleLogout]); 

    useEffect(() => {
        if(isAuthenticated && loginType !== "ServiceWorker") {
            if(loginType === "SuperAdmin") router.replace("/dashboard/admin");
            else router.replace("/dashboard/client")
        } 
    }, [loginType, isAuthenticated, router])

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
                    <WorkerSearch width={300} />
                    <NotificationToast />
                    <div className="mt-2">
                        <NotificationBell />
                    </div>
                        {/* <NotificationBell /> */}
                    <div className="relative flex items-center">
                        {authentication?.profilePicturePath && 
                        <AntDImage 
                            src={`${pictureUrl}${authentication.profilePicturePath}`} 
                            alt={authentication.fullName} 
                            preview={false}
                            className="w-12! h-12! rounded-full! cursor-pointer" 
                            onClick={() => router.push("/dashboard/worker/profile")}
                        />}
                        {!authentication?.profilePicturePath && <Avatar icon={<UserOutlined />} onClick={() => router.push("/dashboard/worker/profile")} size={48} className="cursor-pointer !border-[#039855] !border" />}
                        {authentication?.isProfileComplete && <div className="bg-[#EAFFF5] h-[14px] w-[14px] rounded-[100px] flex items-center justify-center absolute z-[1] right-[-4px] top-2">
                            <Image src={CheckedCircle} alt="image" className="!text-[#039855] " />
                        </div>}
                    </div>
                    
                    {/* <Button type='primary' className='!h-[50px] w-[160px] !rounded-[50px] !bg-white color-bg !font-medium hover:!text-[#670316]' onClick={() => setOpenJobModal(true)}><PlusOutlined className="" /> Post a Job</Button> */}
                </div>

                <div className='flex md:hidden items-center gap-2'>
                    {/* <SearchOutlined className="!text-black !text-lg" /> */}
                    <div className="mt-2">
                        <NotificationBell />
                    </div>
                    
                    <div className="relative flex items-center">
                        {authentication?.profilePicturePath && 
                        <AntDImage 
                            src={`${pictureUrl}${authentication.profilePicturePath}`} 
                            alt={authentication.fullName} 
                            preview={false}
                            className="w-8! h-8! rounded-full! cursor-pointer" 
                            onClick={() => router.push("/dashboard/worker/profile")}
                        />}
                        {!authentication?.profilePicturePath && <Avatar icon={<UserOutlined />} onClick={() => router.push("/dashboard/worker/profile")} size={32} className="cursor-pointer !border-[#039855] !border" />}
                        {authentication?.isProfileComplete && <div className="bg-[#EAFFF5] h-[14px] w-[14px] rounded-[100px] flex items-center justify-center absolute z-[1] right-[-4px] top-2">
                            <Image src={CheckedCircle} alt="image" className="!text-[#039855] " />
                        </div>}
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
                    <div className="md:px-[50px] px-1 pt-8 md:pt-0 w-full! bg-[#f6f6f6] min-h-[100vh]">
                    {children}
                    </div>   
                </Layout>
                {open && <WorkerSideMenu loading={loading || isPending} 
                        handleLogout={handleAskLogout}  active={active} open={open} onCancel={() => setOpen(false)} />}
            </Content>
        </Layout>
    </Layout>
  )
}

export default WorkerContainer