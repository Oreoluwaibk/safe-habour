"use client"
import { App, Button, Layout } from 'antd'
import Image from 'next/image';
import React, { useState, useTransition } from 'react'
import { Logo } from '../../../../../assets/logo';
import { reActviateAccount } from '@/redux/action/auth';
import { useRouter } from 'next/navigation';
import { createErrorMessage } from '../../../../../utils/errorInstance';

const { Header, Content } = Layout;
const Page = () => {
    const router = useRouter();
    const { modal, message } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ isPending, startTransition ] = useTransition();

    const handleReactivate = () => {
        setLoading(true)
        reActviateAccount()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                message.success(res.data.message || "Your account has been reactivate!");
                startTransition(() => {
                    router.push("/dashboard/worker")
                })
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to reactivate your account",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }
  return (
    <Layout className='bg-white!'>
        <Header className='bg-white! py-8! md:pl-24! sticky top-0'>
            <Image src={Logo} alt='Logo' />
        </Header>

        <Content className='bg-white! min-h-screen! flex flex-col items-center justify-center gap-10 '>
           <div className="flex flex-col items-center justify-center gap-6 text-center py-16 px-4">
            <h1 className="text-3xl font-bold text-[#670316]">Account Deactivated</h1>
            
            <p className="text-lg text-gray-700 max-w-md">
                Your account has been temporarily deactivated. Don’t worry — you can reactivate it anytime by clicking the button below. If you think this is a mistake, please contact our support team.
            </p>

            <Button onClick={handleReactivate} loading={isPending || loading} type="primary" className='w-full text-base! px-8!'>Reactivate Account</Button>

            <p className="text-sm text-gray-500 mt-4">
                Need help? <a href="/support" className="text-[#670316] underline">Contact Support</a>
            </p>
            </div>
        </Content>
    </Layout>
  )
}

export default Page