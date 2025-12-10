"use client"
import { Button, Layout } from 'antd'
import Image from 'next/image';
import React from 'react'
import { Logo } from '../../../assets/logo';
import Link from 'next/link';
import Dot from '@/components/general/Dot';
import { ArrowRightOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;
const Page = () => {

    const handleRedirect = () => {
       window.open("https://forms.gle/oXFX4KpdP7uKT4rU6", "_blank");
    }
  return (
    <Layout>
        <Content >
            <Header className="!bg-white flex items-center gap-3 justify-between !py-4 !h-[80px] md:!px-28 !sticky top-0 z-3">
                <Link href="/" className='md:ml-8 ml-2'>
                    <Image 
                        src={Logo}
                        alt='Safe Habour'
                        className="bg-white"
                    />
                </Link>
            </Header>

            <Content className='bg-white min-h-[100vh]! flex flex-col  gap-6 items-center px-4 md:px-0 text-center pt-16' >

                <span className='bg-[#FFF3F5] px-3 py-1 rounded-2xl'><Dot color='#670316' title='Coming Soon To Canada' /></span>

                <div className='flex flex-col gap-4'>
                    <h1 className='md:text-7xl text-4xl font-bold text-[#1E1E1E]mt-3'>Trusted Care & Home Servies</h1>


                    <h1 className='md:text-7xl text-4xl font-bold text-[#670316] mb-4'>Across Canada</h1>
                </div>

                <div className='text-[#424242] text-lg'>
                    <p>Connect with vetted care workers, babysitters, cooks and home </p>
                    <p>service professionals. Background-checked, insured, and ready to help your family.</p>
                </div>
                

                

                <Button onClick={handleRedirect} icon={<ArrowRightOutlined />} iconPosition="end" type="primary" className='md:w-[207px]! w-[167px]!'>Join Waitlist</Button>

                <p className='text-[#424242] text-sm'>Join 2,000+ families waiting for launch</p>
            </Content>
        </Content>
    </Layout>
  )
}

export default Page