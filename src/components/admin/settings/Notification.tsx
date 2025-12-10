import CheckCard from '@/components/client/cards/CheckCard'
import CardTitle from '@/components/general/CardTitle'
import { getNotificationSettings, updateNotificationSetting } from '@/redux/action/extra'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance'
import { IUserNotificationPreferences, notificationDescriptions, NotificationType } from '../../../../utils/interface'
import { useAppSelector } from '@/hook'
import RoundBtn from '@/components/general/RoundBtn'
import { PlusOutlined } from '@ant-design/icons'

const Notification = () => {
    const [ loading, setLoading ] = useState(false);
    const [ updateLoading, setUpdateLoading ] = useState(false);
    const { modal } = App.useApp();
    const { user } = useAppSelector(state => state.auth);
    const [ selected, setSelected ] = useState<number | null>(null);
    const [ notifications, setNotifications ] = useState<IUserNotificationPreferences>([]);

    // const handleGetNotificationSettings = useCallback(() => {
    //     setLoading(true);
    //     getNotificationSettings()
    //     .then(res => {
    //         if(res.status === 200) {
    //             setLoading(false);
    //             setNotifications(res.data.data);
    //         }
    //     })
    //     .catch(err => {
    //         modal.error({
    //         title: "Unable to get notification settings",
    //         content: err?.response
    //         ? createErrorMessage(err.response.data)
    //         : err.message,
    //         onOk: () => setLoading(false)
    //         });
    //     })
    // }, [modal]);

    const handleSilentLoad = useCallback(() => {
        getNotificationSettings()
        .then(res => {
            if(res.status === 200) {
                setNotifications(res.data.data);
                setSelected(null);
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get notification settings",
            content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
            onOk: () => setLoading(false)
            });
        })
    }, [modal]);

    const handleUpdateSettings = (value: boolean, type: number) => {
        const payload = {
            userId: user.id,
            notificationType: type,
            emailNotificationEnabled: value,
            inAppNotificationEnabled: value
        }
        setUpdateLoading(true);
        updateNotificationSetting(payload)
        .then(res => {
            if(res.status === 200) {
                setUpdateLoading(false);
                handleSilentLoad();
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to update notification settings",
            content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
            onOk: () => setUpdateLoading(false)
            });
        })
    }  

    useEffect(() => {
        // handleGetNotificationSettings();
    
    }, []);

  return (
    <Card 
        title={<CardTitle title='Push Notification' description="Manage available service categories on the platform"  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "" }}
        loading={loading}
        extra={
        <RoundBtn onClick={() => {}} title='Add New Category' icon={<PlusOutlined />} width={167} />}
    >
        <Row gutter={[5, 5]} className='py-6'>
            {notifications.map((notification, i: number) => (
                <Col lg={24} sm={24} xs={24} key={i}>
                    <CheckCard 
                        title={notification.notificationTypeName} 
                        description={
                            notificationDescriptions[notification.notificationTypeName as keyof typeof NotificationType] ||
                            "Notification update"
                        }
                        loading={selected === notification.notificationType && updateLoading}
                        onClick={() => {
                            setSelected(notification.notificationType);
                            handleUpdateSettings(!notification.inAppNotificationEnabled, notification.notificationType)
                        }}
                        value={notification.emailNotificationEnabled && notification.inAppNotificationEnabled}
                    />
                </Col>
            ))}
        </Row>
    </Card>
  )
}

export default Notification