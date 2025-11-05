import { loginAction, verifyTwoFASetting } from '@/redux/action/auth';
import { App, Button, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { useAppDispatch, useAppSelector } from '@/hook';
import { setLastRoute } from '@/redux/reducer/auth/auth';
import { useRouter } from 'next/navigation';

interface props {
    open: boolean;
    onCancel: () => void;
    email: string;
}
const TwoFaModal = ({ open, onCancel, email }: props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { modal, message } = App.useApp();
    const { lastRoute } = useAppSelector(state => state.auth)
    const [ loading, setLoading ] = useState(false);
    const [ otp, setOtp ] = useState("");
    
    const handleSubmit = () => {
        if(!otp) return message.error("Enter your otp to continue!");
        const payload = {
            code: otp,
            email
        }
        setLoading(true);
        verifyTwoFASetting(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                modal.success({
                    title: "Login successful!",
                    content: res.data.message,
                    onOk: async () => {
                        setLoading(false);
                        const result = await dispatch(loginAction(res.data.data));
                        console.log("result:", result)
                        const role = res.data.data?.roles?.[0];
                        if (lastRoute) {
                            router.push(lastRoute);
                            dispatch(setLastRoute(null)); // clear it
                        } 
                        else if (role === "ClientUser") router.push("/dashboard/client");
                        else if (role === "ServiceWorker") {
                            if(res.data.data.user?.isServiceWorkerOnboarded) router.push("/dashboard/worker");
                            else router.push("/dashboard/worker/intro");
                        };
                        onCancel();
                    }
                });
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to verify code",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        });
    }
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={ <div className='flex items-center justify-end gap-4 px-6 py-4'>
            <Button onClick={onCancel} type="default" className='md:!min-w-[98px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} >Cancel</Button>
            <Button type="primary" loading={loading} onClick={handleSubmit} className='md:!min-w-[98px] !h-[48px]' style={{borderRadius: 50}}>Send</Button>
        </div>}
        title={<p className='text-lg font-semibold'>Enter the code sent to {email}</p>}
        width={700}
        styles={{body: { padding: "20px 0 10px" }}}
        classNames={{ body: "flex flex-col items-center justify-center"}}
    >
        <Input.OTP 
            value={otp} 
            onChange={(value) => setOtp(value)} 
            length={6} 
            size="large"
        />
    </Modal>
  )
}

export default TwoFaModal