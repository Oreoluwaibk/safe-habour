"use client"
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion';
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
                            priority
                        />
                        </Link>
                    </div>

                </Header>
                <Layout className='!bg-[#F7F7F7] !min-h-[90vh] !flex !justify-center !items-center' >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </Layout>
               
            </Content>
        </Layout>
    </Layout>
  )
}

export default AuthContainer