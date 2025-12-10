"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { IAdminVerificationList, IVerificationFullDetails } from '../../../../utils/interface';
import { Avatar, Card, Col, Divider, Modal, Row, Image, App } from 'antd';
import CardTitle from '@/components/general/CardTitle';
import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Status from '@/components/general/Status';
import { Icon } from '@iconify/react';
import RoundBtn from '@/components/general/RoundBtn';
import ApproveReject from './ApproveReject';
import { getAVerification } from '@/redux/action/admin';
import { createErrorMessage } from '../../../../utils/errorInstance';
import moment from 'moment';
 
interface props {
    open: boolean;
    onCancel: () => void;
    verification: IAdminVerificationList;
    refresh: () => void
}
const KYCReview = ({
    onCancel,
    open,
    verification,
    refresh
}: props) => {
    const { modal } = App.useApp();
    const [ openAcceptReject, setOpenAcceptReject ] = useState(false);
    const [ isReject, setIsReject ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ details, setDetails ] = useState<IVerificationFullDetails>({
        userId: "" ,
        fullName: "" ,
        phoneNumber: "" ,
        email: "" ,
        location: "" ,
        service: "" ,
        submittedAt: "" ,
        hasIdentificationDocument: false,
        hasLocationDocument: false,
        userIdentificationDocumentPath: "" ,
        userLocationDocumentPath: "" ,
        userIdentificationDocumentUrl: "" ,
        userLocationDocumentUrl: "" 
    })

    const handleGetVerification = useCallback(() => {
        setLoading(true);
        getAVerification(verification.userId)
        .then(res => {
              if(res.status === 200) {
                setLoading(false);
                setDetails(res.data.data);
              }
            })
            .catch(err => {
                setLoading(false);
                modal.error({
                    title: `Unable to get verification`,
                    content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                });
            })
    }, [modal, verification.userId]);

    useEffect(() => {
        handleGetVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title="KYC Document Review"
        />}
        footer={<div className='flex items-center gap-6'>
            <RoundBtn onClick={() => {
                setIsReject(true);
                setOpenAcceptReject(true);
            }} title='Reject' bg='#D92D20' primary width="50%" />
            <RoundBtn primary  onClick={() => {
                setIsReject(false);
                setOpenAcceptReject(true);
            }} title="Approve" width="50%" />
        </div>}
        loading={loading}
        width={800}
        classNames={{ body: "flex flex-col gap-4"}}
    >
        <Divider size="small" />
        <div className='rounded-xl border border-[#E9E8E8] py-2 px-3'>
            <CardTitle 
                title={details.fullName}
                description={<p>{details.email}</p>}
                sideIcon={
                    <>
                    {<Avatar icon={<UserOutlined />} className='text-xl! w-10! h-10!' />}
                    </>
                }
                status={<Status  color={details.hasIdentificationDocument && details.hasLocationDocument? "#039855" :"#ff0000"} bg={details.hasIdentificationDocument && details.hasLocationDocument ? "#E1FFF2" :"#FFF6F7"} title={details.hasIdentificationDocument && details.hasLocationDocument ? "Verified" : "Pending"} />}
            />
        </div>

        <div className='rounded-xl border border-[#E9E8E8] py-1 px-6'>
            <Row gutter={[15, 0]}>
            
            <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Email"
                    description={details.email}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <Icon icon="oui:email" fontSize={20}  color='#670316'/>
                        </span>
                    }
                />
            </Col>
            <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Phone"
                    description={details.phoneNumber}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <PhoneOutlined className='text-[#670316]! text-xl!' />
                        </span>
                    }
                />
            </Col>
            <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Submitted"
                    description={moment(details.submittedAt).format("YYYY-MM-DD")}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <Icon icon="lets-icons:date-today-duotone-line" fontSize={20}  color='#670316'/>
                        </span>
                    }
                />
            </Col>
            <Col lg={12} sm={12} xs={24}>
                <CardTitle 
                    title="Location"
                    description={details.location}
                    sideIcon={
                        <span className='w-9 h-9 bg-[#ffecf0] flex items-center justify-center rounded-full'>
                            <EnvironmentOutlined className='text-[#670316]! text-xl!' />
                        </span>
                    }
                />
            </Col>
            </Row>
            
            
            
        </div>

        <Card title={<CardTitle title="Submitted Documents" icon={<Icon icon="proicons:document" />} />} className='mb-4'>
            <Row gutter={[15, 15]}>
                <Col lg={12} sm={12} xs={24} className='h-[200px] overflow-y-hidden'>
                    {/* <PdfViewer pdfUrl={details.userIdentificationDocumentUrl} /> */
                    }
                    {details.userIdentificationDocumentUrl.split(".").includes("pdf") ? (
                        <iframe
                            src={details.userIdentificationDocumentUrl}
                            width="100%"
                            height="100%"
                            allowFullScreen
                            title={details.userIdentificationDocumentUrl}
                        />
                    ) : (
                    <Image 
                        src={details.userIdentificationDocumentUrl}
                        alt="Perp"
                        preview={false} // optional: disable AntD preview
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // fills container, crops if necessary
                            display: "block",  // prevents inline spacing issues
                        }} 
                    />)}
                    
                    
                </Col>

                <Col lg={12} sm={12} xs={24} className='h-[200px] overflow-y-hidden'>
                {details.userLocationDocumentUrl.split(".").includes("pdf") ? (
                        <iframe
                            src={details.userLocationDocumentUrl}
                            width="100%"
                            height="100%"
                        />
                    ) : (
                    <Image 
                        src={details.userLocationDocumentUrl}
                        alt="Perp"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", 
                            display: "block",
                            objectPosition: "center"
                        }} 
                    />)}
                </Col>
            </Row>
        </Card>

        {openAcceptReject && <ApproveReject refresh={() => {
            refresh();
            onCancel()
        }} onCancel={() => setOpenAcceptReject(false)} open={openAcceptReject} verification={verification} isReject={isReject} />}
    </Modal>
  )
}

export default KYCReview