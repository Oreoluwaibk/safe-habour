import { App, Avatar, Card, Col, Divider, List, Modal, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { IAdminUserList } from '../../../../utils/interface';
import CardTitle from '@/components/general/CardTitle';
import { PhoneOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { pictureUrl } from '../../../../utils/axiosConfig';
import { Icon } from '@iconify/react';
import moment from 'moment';
import Dot from '@/components/general/Dot';
import Status from '@/components/general/Status';
import { getAUsers } from '@/redux/action/admin';
import { createErrorMessage } from '../../../../utils/errorInstance';

interface props {
    open: boolean;
    onCancel: () => void;
    user: IAdminUserList;
    isWorker?: boolean
}
const UserDetails = ({
    onCancel,
    open,
    user,
    isWorker
}: props) => {
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title="Client Details"
        />}
        footer={null}
        width={700}
        classNames={{ body: "flex flex-col gap-4"}}
    >
        <Divider size="small" />
        <div className='rounded-xl border border-[#E9E8E8] py-2 px-3'>
            <CardTitle 
                title={user.fullName}
                description={<p>{user.email}{isWorker && <span className='text-[#323232] ml-4'><StarFilled className='text-[#FFDD33]!' /> {user.averageRating && Number(user.averageRating).toFixed(1) || "0.0"}</span>}</p>}
                sideIcon={
                    <>
                    {!user.profilePicturePath && <Avatar icon={<UserOutlined />} className='text-xl! w-10! h-10!' />}
                    {user.profilePicturePath && <Image src={`${pictureUrl}${user.profilePicturePath}`} alt={user.fullName} className='text-xl! w-10! h-10!' />}
                    </>
                }
                status={isWorker && <Status  color={user.isVerified? "#039855" :"#ff0000"} bg={user.isVerified? "#E1FFF2" :""} title={user.isVerified ? "Verified" : "Not Verified"} />}
            />
        </div>

        <div className='rounded-xl border border-[#E9E8E8] py-1 px-6'>
            <Row gutter={[15, 0]}>
            {isWorker && <>
                <Col lg={12} sm={12} xs={24} className='w-full'>
                <CardTitle 
                    title="Service"
                    description={<List 
                        dataSource={user.servicesOffered} 
                        renderItem={(item: string) => (
                        <List.Item style={{margin: 0, padding: 0}}>
                            {item}
                        </List.Item>
                        )}
                        size="small"
                    />}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <Icon icon="material-symbols-light:service-toolbox-outline-rounded" fontSize={20}  color='#670316'/>
                        </span>
                    }
                />
                </Col>

                <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Job Completed"
                    description={user.completedJobsCount}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <Icon icon="mdi:checkbox-marked-circle-outline" fontSize={20}  color='#670316'/>
                        </span>
                    }
                />
                </Col>
            </>}
            <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Phone"
                    description={user.phoneNumber}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <PhoneOutlined className='text-[#670316]! text-xl!' />
                        </span>
                    }
                />
            </Col>
            <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Date Joined"
                    description={moment(user.dateJoined).format("YYYY-MM-DD")}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <Icon icon="lets-icons:date-today-duotone-line" fontSize={20}  color='#670316'/>
                        </span>
                    }
                />
            </Col>
            </Row>
           
            
           
        </div>

        {!isWorker && <Card title="Recent Activity">
            <Dot color='#767676' title='Posted 3 jobs in the last 30 days' />
            <Dot title='Last active: 2 hours ago' color="#767676" />
            <Dot title='Total bookings: 12' color="#767676" />
        </Card>}

        {isWorker && (
            <Card title="Performance Metrics">
                <Dot color='#767676' title={`Average rating: ${user.averageRating || 0}/5.0`} />
                <Dot title={`Completed Jobs: ${user.completedJobsCount}`} color="#767676" />
                <Dot title='Response time: 2.5 hours' color="#767676" />
                <Dot title='Last active: 5 hours ago' color="#767676" />

            </Card>
        )}
    </Modal>
  )
}

export default UserDetails