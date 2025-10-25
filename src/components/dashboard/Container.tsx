"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import Image from 'next/image';
import { LinkedinFilled, MenuOutlined, TwitterOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaceBook, Logo } from '../../../assets/logo';
import Sidemenu from './Sidemenu';
import { MaskedLogo } from '../../../assets/icons';
import { useAppSelector } from '@/hook';
import { logoutUser } from '@/redux/action/auth';


const { Content, Header, Footer } = Layout;

type Props = {
    children: ReactNode;
    active: string;
    hide?: boolean;
    center?: boolean
}

export const NavItem = ({ href, label, active, mobile }: { href: string, label: string; active: boolean; mobile?: boolean}) => {
    return(

    <Link href={href}>
      <span className={`menu-link ${active ? 'active' : ''} ${mobile ? '!text-lg font-semibold text-[#1E1E1E]' : ''} text-text`}>{label}</span>
    </Link>
)};

const Container = ({
    children,
    active,
    hide,
    center
}:Props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        if(!isAuthenticated) handleLogut();
    }, [isAuthenticated]);

    const handleLogut = () => {
        logoutUser()
        .then(res => {
            if(res.status === 200)  router.push("/auth/login");
        })
        .catch(err => {
            router.push("/auth/login");
            console.log("error loggin out", err);
        })
    }
    
  return (
    <Layout >
        <Layout>
            <Content>
                <Header className="!bg-white flex items-center gap-3 justify-between !py-4 !h-[80px] md:!px-28 !sticky top-0 z-3" >
                    <div className='flex items-center gap-20'>
                        <Link href="/" className=''>
                        <Image 
                            src={Logo}
                            alt='Safe Habour'
                            className="bg-white"
                        />
                        </Link>
                       

                        {!hide && <div className="bg-white md:flex items-center gap-8 hidden">
                            <NavItem href="/" label="Home" active={active === 'Home'} /> 
                            <NavItem href="/about" label="About Us" active={active === 'About Us'} /> 
                            <NavItem href="/services" label="Services" active={active === 'Services'} /> 
                            <NavItem href="/how-it-works" label="How it works" active={active === 'How it works'} /> 
                            <NavItem href="/trust-and-safety" label="Trust & Safety" active={active === 'Trust & Safety'} /> 
                            <NavItem href="/faqs" label="FAQs" active={active === 'FAQs'} /> 
                            <NavItem href="/blogs" label="Blogs" active={active === 'Blogs'} /> 
                        </div>}
                    </div>
                    

                    {!hide && <div className='hidden md:flex items-center gap-4'>
                        <Button type="text" className='!text-[#667085] !h-[44px] w-[94px] !text-base' onClick={() => router.push("/auth/login")}>Login</Button>
                        <Button type='primary' className='!h-[44px] w-[94px] !rounded-[8px]' onClick={() => router.push("/auth/choose-auth")}>Sign Up</Button>
                    </div>}

                    {<MenuOutlined className='md:!hidden text-2xl' onClick={() => setOpen(!open)} />}

                </Header>
                <Layout className={`!bg-white ${center && "!flex !flex-col items-center justify-center"}`} >
                    {children}
                </Layout>
                <Footer className="!bg-[#250007] !text-white px-4 md:px-20">
                    <Row gutter={[4, 8]} className="md:!py-16 md:!px-8">
                        <Col lg={15} sm={24} xs={24} className="flex flex-col gap-4 mb-10 md:mb-0">
                            <Link href="/" className='!mb-6'>
                                <Image src={MaskedLogo} className="" alt="footer logo" />
                            </Link>
                            <p className='md:!w-1/2 !mt-6'>Connecting Canadian families with trusted, vetted care professionals for peace of mind and quality service.</p>
                        </Col>
                        <Col lg={3} sm={12} xs={12} className="footer-menu">
                            <p className="text-[#98A2B3] font-bold">Services</p>
                            <Link href="/services/care-workers">Care Workers</Link>
                            <Link href="/services/support-workers">Support Workers</Link>
                            <Link href="/services/snow-plowings">Snow Plowing</Link>
                            <Link href="/services/personal-cooks">Personal Cooks</Link>
                            <Link href="/services/house-chores">House Chores</Link>
                            <Link href="/services/companion-workers">Companion workers</Link>

                        </Col>
                        <Col lg={3} sm={12} xs={12} className="footer-menu">
                            <p className="text-[#98A2B3] font-bold">Company</p>
                            <Link href="/about">About Us</Link>
                            <Link href="/how-it-works">How It Works</Link>
                            <Link href="/trust-and-safety">Trust & Safety</Link>
                            <Link href="/contact-us">Contact</Link>
                            <Link href="/blog">Blog</Link>
                        </Col>
                        <Col lg={3} sm={12} xs={12} className="footer-menu mt-5 md:mt-0">
                            <p className="text-[#98A2B3] font-bold">Support</p>
                            <Link href="/faqs">FAQs</Link>
                            
                            <Link href="/privacy-policy">Privacy policy</Link>
                            <Link href="/terms">Terms of Services</Link>
                        </Col>
                    </Row>
                    <Row className="!flex !items-center !justify-between md:!border-t md:border-t-[#D1D1D1] !pt-8 md:!pb-6">
                        <p>© 2077 Safe Harbour. All rights reserved.</p>

                        <div className='!flex !items-center gap-2 md:!gap-4 mt-2 md:mt-0'>
                            <TwitterOutlined  className='!text-2xl'/>
                            <LinkedinFilled className='!text-2xl' />
                            <Image src={FaceBook} alt='facebook icon' />
                        </div>
                    </Row>
                </Footer>

                {open && <Sidemenu active={active} open={open} onCancel={() => setOpen(false)} />}
            </Content>
        </Layout>
    </Layout>
  )
}

export default Container