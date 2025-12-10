import React, { useState } from 'react'
import { IAdminJobDetails } from '../../../../utils/interface';
import { App, Col, Divider, Modal, Row } from 'antd';
import RoundBtn from '@/components/general/RoundBtn';
import CardTitle from '@/components/general/CardTitle';
import Status from '@/components/general/Status';
import { CloseOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import CancelJob from './CancelJob';
import useApplicationStatus from '@/hooks/useApplicationStatus';
import moment from 'moment';
import { completeASuperadminJob } from '@/redux/action/admin';
import { createErrorMessage } from '../../../../utils/errorInstance';


interface props {
    open: boolean;
    onCancel: () => void;
    job: IAdminJobDetails;
    refresh: () => void;
}
const JobDetailsModal = ({
    onCancel,
    open,
    job,
    refresh
}: props) => {
    const { modal } = App.useApp();
    const [ openCancel, setOpenCancel ] = useState(false);
    const [ markLoading, setMarkLoading ] = useState(false);
    const { statusTitle, colors } = useApplicationStatus(job.status, "job");

    const handleMArkComplete = () => {
        setMarkLoading(true);
        completeASuperadminJob(job.jobId)
        .then(res => {
            if(res.status === 200) {
            setMarkLoading(false);
            modal.success({
                title: <div className='flex flex-col items-center justify-center gap-6'>
                <span style={{backgroundColor: "#D1FADF"}} className='flex items-center justify-center w-12 h-12 rounded-full'>
                    <Icon fontSize={20} icon={"mdi:checkbox-marked-circle-outline"} color="#039855" />
                </span>
                
                <p className='text-[#101828] text-lg font-medium text-center'>{res.data.message || "You have successfully mark this job as complete"}</p>
                </div>,
                icon: null,
                footer: null,
                closable: true,
                closeIcon: <CloseOutlined />,
            })
            refresh();
            }
        })
        .catch(err => {
            modal.error({
            title: `Unable to get mark ${job.jobTitle} as completed!`,
            content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
            });
            setMarkLoading(false);
        })
    }
  return (
    <Modal 
        open={open}
        title={<CardTitle title="Job Details" description="Complete information about this booking" />}
        onCancel={onCancel}
        footer={<div className='flex items-center gap-6'>
            <RoundBtn primary bg='#D92D20' onClick={() => setOpenCancel(true)} title='Cancel Job' width="50%" />
            <RoundBtn primary loading={markLoading} onClick={handleMArkComplete} title="Mark As Completed" width="50%" />
        </div>}
        width={700}
        classNames={{ body: "flex flex-col gap-4 text-sm"}}
    >
        <Divider size="small" />

        <Row gutter={[15, 15]} className='mb-6'>
            <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Job Title</p>
                <p className='text-[#343434] font-bold text-sm'>{job.jobTitle}</p>

            </Col>

            <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Status</p>
                <p className='text-[#343434] font-bold text-sm'><Status title={statusTitle} bg={colors.bg} color={colors.color} /></p>

            </Col>
            <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Client</p>
                <p className='text-[#343434] font-bold text-sm'>{job.clientName}</p>

            </Col>
            <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Worker</p>
                <p className='text-[#343434] font-bold text-sm'>{job.workerName}</p>
            </Col>

            <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Date</p>
                <p className='text-[#343434] font-bold text-sm'>{moment(job.date).format("YYYY-MM-DD")}</p>
            </Col>

            <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Duration</p>
                <p className='text-[#343434] font-bold text-sm'>{job.durationInHours || "N/A"}</p>
            </Col>

             <Col lg={12} sm={24} xs={24} className='flex flex-col gap-1'>
                <p className='text-[#767676] font-semibold'>Amount</p>
                <p className='text-[#343434] font-bold text-sm'>${Number(job.amount).toFixed(2)}</p>
            </Col>
            
        </Row>
         {openCancel && <CancelJob refresh={() => { 
            onCancel();
            refresh(); }} open={openCancel} onCancel={() => setOpenCancel(false)} job={job} />}
    </Modal>
  )
}

export default JobDetailsModal