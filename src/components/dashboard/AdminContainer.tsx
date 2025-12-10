"use client"
import "@/styles/client.css"
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Image as AntDImage } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState, useTransition } from 'react'
import { Logo } from '../../../assets/logo';
import Image from 'next/image';
import NotificationCard from "../general/NotificationCard";
import { CheckedCircle, MaskedLogo } from "../../../assets/icons";
import WorkerSideMenu from "./WorkerSideMenu";
import { useAppSelector } from "@/hook";
import { logoutUser } from "@/redux/action/auth";
import { INotification } from "../../../utils/interface";
import { useAuthentication } from "@/hooks/useAuthentication";
import { pictureUrl } from "../../../utils/axiosConfig";
import { NotificationBell } from "../notification/NotificationBell";
import NotificationToast from "../notification/NotificationToast";
import WorkerSearch from "../general/search/WorkerSearch";
import AdminSideMenu from "./AdminSideMenu";
import RoundBtn from "../general/RoundBtn";

const { Content, Header, Sider } = Layout;

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
const AdminContainer = ({
    children,
    active
}:Props) => {
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [open, setOpen] = useState(false);
    const [ showNotification, setShowNotification ] = useState(false);
    const { isAuthenticated, loginType } = useAppSelector(state => state.auth);
    const [ isPending, startTransition ] = useTransition();
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

   const handleLogout = useCallback(() => {
    setLoading(true);
    logoutUser()
      .then((res) => {
        if (res.status === 200) {
            setLoading(false);
            startTransition(() => {
                router.push("/auth/login");
            })
          
        }
      })
      .catch((err) => {
        setLoading(false);
        startTransition(() => {
            router.push("/auth/login");
        })
        console.log("err:", err)
      });
    }, [router]); 

    useEffect(() => {
        if (!isAuthenticated) handleLogout();
    }, [isAuthenticated, handleLogout]); 

    useEffect(() => {
        //SuperAdmin  ServiceWorker
        if(isAuthenticated && loginType !== "SuperAdmin") {
            if(loginType === "ServiceWorker") router.replace("/dashboard/worker");
            else router.replace("/dashboard/client")
        } 
            
    }, [loginType, isAuthenticated, router])

  return (
     <Layout >
        <Layout>
           
            <Content className="bg-white min-h-[80vh]">
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
                       

                       
                    </div>
                    

                    <div className='hidden md:flex items-center gap-4'>
                        {/* <WorkerSearch width={300} /> */}
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
                                onClick={() => router.push("/dashboard/admin/profile")}
                            />}
                            {!authentication?.profilePicturePath && <Avatar icon={<UserOutlined />} onClick={() => router.push("/dashboard/admin/profile")} size={48} className="cursor-pointer !border-[#039855] !border" />}
                            {authentication?.isProfileComplete && <div className="bg-[#EAFFF5] h-[14px] w-[14px] rounded-[100px] flex items-center justify-center absolute z-[1] right-[-4px] top-2">
                                <Image src={CheckedCircle} alt="image" className="!text-[#039855] " />
                            </div>}
                        </div>

                        <RoundBtn  title="Logout" onClick={handleLogout} loading={loading || isPending } width={87} />
                       
                        {/* <Button type='primary' className='!h-[50px] w-[160px] !rounded-[50px] !bg-white color-bg !font-medium hover:!text-[#670316]' onClick={() => setOpenJobModal(true)}><PlusOutlined className="" /> Post a Job</Button> */}
                    </div>

                    <div className='flex md:hidden items-center gap-2'>
                        {/* <SearchOutlined className="!text-black !text-lg" /> */}
                        <NotificationBell />
                        {<MenuOutlined className='md:!hidden text-2xl' onClick={() => setOpen(!open)} />}
                    </div>

                </Header>
                
                <Layout className='!bg-white relative!'>
                    <Sider 
                        className="pl-4! bg-white! rounded-xl! sticky! top-[120px] h-[100vh] hidden md:block"
                        width={313}
                    >
                        <AdminSideMenu active={active} open={true} onCancel={() => {}} />
                    </Sider>
                    {showNotification && <div className="fixed md:top-[120px] md:right-[15px] right-[30px] h-[134px] w-[80%] md:w-[400px] z-[2] mt-[-20px] cursor-pointer" onClick={() => router.push("/dashboard/notification")}>
                        <NotificationCard 
                            isFixed 
                            onCancel={() => setShowNotification(false)} 
                            notification={notification}
                        />
                    </div>}
                    <div className="md:px-[20px] px-4 w-full!">
                    {children}
                    </div>   
                </Layout>
                {open && <WorkerSideMenu active={active} open={open} onCancel={() => setOpen(false)} />}
            </Content>
        </Layout>
    </Layout>
  )
}

export default AdminContainer