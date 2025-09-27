"use client"
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { Logo } from '../../../assets/logo';


const { Content, Header } = Layout;
type Props = {
    children: ReactNode;
}
const AuthContainer = ({ children }: Props) => {
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
                    </div>

                </Header>
                <Layout className='!bg-[#F7F7F7] !min-h-[90vh] !flex !justify-center !items-center' >
                    {children}
                </Layout>
               
            </Content>
        </Layout>
    </Layout>
  )
}

export default AuthContainer