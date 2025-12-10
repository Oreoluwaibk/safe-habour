import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';
import { App, Modal } from 'antd';
import React, { useState } from 'react'
import { IAdminVerificationList, IUser } from '../../../../utils/interface';
import { adminApproveDocument } from '@/redux/action/auth';
import { createErrorMessage } from '../../../../utils/errorInstance';


interface props {
    open: boolean;
    onCancel: () => void;
    isReject?: boolean;
    verification: IAdminVerificationList;
    refresh: () => void;
}
const ApproveReject = ({ open, onCancel, isReject, verification, refresh }: props) => {
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);

    const handleApprove = async () => {
        setLoading(true);

        const documentTypes = [1, 2];

        try {
            for (const type of documentTypes) {
                const payload = {
                    userId: verification.userId,
                    documentType: type,
                    isApproved: true,
                    rejectionReason: "",
                };

                const res = await adminApproveDocument(payload);

                if (res.status === 200) {
                    console.log(`Document type ${type} approved:`, res.data.data);
                }
            }

            setLoading(false);
            modal.success({
                title: "Documents approved",
                content: "All verification documents have been successfully approved.",
                onOk: () => {
                    setLoading(false);
                    refresh()
                }
            });
        } catch (err: any) {
            setLoading(false);
            modal.error({
            title: "Unable to approve verification documents",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        }
    };


    const handleReject = async () => {
        setLoading(true);

        const documentTypes = [1, 2];

        try {
            for (const type of documentTypes) {
                const payload = {
                    userId: verification.userId,
                    documentType: type,
                    isApproved: false,
                    rejectionReason: "Documents are not valid",
                };

                const res = await adminApproveDocument(payload);

                if (res.status === 200) {
                    console.log(`Document type ${type} rejected:`, res.data.data);
                }
            }

            setLoading(false);
            modal.success({
                title: "Documents rejected",
                content: "All verification documents have been successfully rejected.",
                onOk: () => {
                    setLoading(false);
                    refresh();
                    onCancel();
                }
            });
        } catch (err: any) {
            setLoading(false);
            modal.error({
                title: "Unable to reject verification documents",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
            });
        }
    }

    const handleSubmit = () => {
        if(isReject) handleReject();
        else handleApprove();
    }
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        footer={<div className='flex items-center gap-6'>
            <RoundBtn onClick={onCancel} title='Cancel' width={170} />
            <RoundBtn primary bg={isReject ? "#D92D20": undefined } loading={loading} onClick={handleSubmit} title={isReject ? "Reject" : "Approve"} width={170} />
        </div>}
        width={400}
        classNames={{ body: "flex flex-col justify-center items-center gap-4 text-sm"}}
    >
        <span style={{backgroundColor: isReject ? "#FEE4E2" : "#D1FADF"}} className='flex items-center justify-center w-12 h-12 rounded-full'>
            {<Icon fontSize={20} icon={isReject ? "iconoir:cancel" :"mdi:checkbox-marked-circle-outline"} color={isReject ? "#D92D20" : "#039855"} />}
        </span>

        <p className='text-[#101828] text-lg font-medium'>{isReject ? "Reject" :"Approve"} {verification.fullName}</p>
        <p className='text-[#667085] text-center'>Are you sure you want to {isReject ? "reject": "approve" } {verification.fullName}? This action cannot be undone.</p>
    </Modal>
  )
}

export default ApproveReject