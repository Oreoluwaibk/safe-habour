import { App, Modal } from 'antd'
import React, { useState } from 'react'
import { IAdminJobDetails } from '../../../../utils/interface';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { cancelASuperadminJob } from '@/redux/action/admin';

interface props {
    open: boolean;
    onCancel: () => void;
    job: IAdminJobDetails;
    refresh: () => void;
}
const CancelJob = ({
    onCancel,
    open,
    job,
    refresh
}: props) => {
    const [ loading, setLoading ] = useState(false);
    const { modal } = App.useApp();

    const handleCancelJob = () => {
        setLoading(true);
        cancelASuperadminJob(job.jobId)
        .then(res => {
            if(res.status === 200) {
                modal.success({
                    title: res.data.message || "Job has been cancelled successfully",
                    onOk: () => { 
                        setLoading(false); 
                        refresh();
                        onCancel();
                    }
                })
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: `Unable to get mark ${job.jobTitle} as completed!`,
                content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }
  return (
     <Modal 
        open={open}
        onCancel={onCancel}
        footer={<div className='flex items-center gap-6'>
            <RoundBtn onClick={onCancel} title='No' width="50%" />
            <RoundBtn primary loading={loading} onClick={handleCancelJob} title="Yes" width="50%" />
        </div>}
        width={400}
        classNames={{ body: "flex flex-col justify-center items-center gap-4 text-sm"}}
    >
        <span style={{backgroundColor: "#FEE4E2"}} className='flex items-center justify-center w-12 h-12 rounded-full'>
            <Icon fontSize={20} icon="iconoir:cancel" color="#D92D20"  />
        </span>

        <p className='text-[#101828] text-lg font-medium'>Cancel {job.jobTitle}</p>
        <p className='text-[#667085] text-center'>Are you sure you want to cancel job? This action cannot be undone.</p>
    </Modal>
  )
}

export default CancelJob