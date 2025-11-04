import { App, Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import CheckCard from '../cards/CheckCard'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { updateTwoFASetting } from '@/redux/action/auth';
import { useAppSelector } from '@/hook';
import { useAuthentication } from '@/hooks/useAuthentication';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';

const TwoFactor = () => {
    const { modal } = App.useApp();
    const { user } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const { authentication, handleGetAuthentication } = useAuthentication();
    const [ enable, setEnable ] = useState(authentication?.isTwoFactorAuthenticationEnabled || false);

    useEffect(() => {
        setEnable(authentication?.isTwoFactorAuthenticationEnabled || false)
    }, [authentication?.isTwoFactorAuthenticationEnabled])

    const handleUpdate = () => {
        const payload = {
            enableTwoFactor: enable,
            userId: user.id
        }
        setLoading(true);
        updateTwoFASetting(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201){
                modal.success({
                    title: res.data.message || "Two factor authentication settings saved successfully!",
                    onOk: () => {
                        setLoading(false);
                        handleGetAuthentication();
                    }
                })
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to change two factor authentication settings",
                content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
                onOk: () => setLoading(false)
            });
        })
    }
    
  return (
   <Card 
        title="Two Factor Authentication" 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
    >
        <Row gutter={[5, 5]} className='py-6'>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard 
                    title='Enable Two-Factor Authentication' 
                    description='Whenever you sign in to your account, you will need to enter a security code sent to you.' 
                    value={enable}
                    onChange={()=> setEnable(!enable)}
                />
            </Col>

            <Col lg={24} sm={24} xs={24} className='!flex justify-end mt-2'>
                <RoundBtn 
                    loading={loading}
                    title={authentication?.isTwoFactorAuthenticationEnabled ? "Disable 2FA" :'Enable 2FA'}
                    icon={<Icon icon="fluent:phone-20-regular" />}
                    onClick={handleUpdate}
                />
            </Col>
        </Row>
    </Card>
  )
}

export default TwoFactor