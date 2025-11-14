import { App, Button, Input, Modal, Image, Avatar } from 'antd';
import React, { useState } from 'react';
import CardTitle from '@/components/general/CardTitle';
import { acceptInvite, IJobApplication, IUser, rejectInvite } from '../../../../utils/interface';
import { acceptWorkInvite, cancelJobApplication, rejectJobApplication, rejectWorkInvite } from '@/redux/action/jobs';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { UserOutlined } from '@ant-design/icons';
import { pictureUrl } from '../../../../utils/axiosConfig';

interface props {
  open: boolean;
  onCancel: () => void;
  isReject?: boolean;
  user: IUser;
  applicationId: string;
  refresh: () => void;
}
const RejectCancel = ({ open, onCancel, isReject, user, refresh, applicationId }: props) => {
    const { modal, message: antDMessage } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState("");

    const handleSubmit = () => {
        if(!message) return antDMessage.error(`Type in your ${isReject ? "rejection" : "cancelation"} message to continue!`)
        if(isReject) handleReject();
        else handleCancel();
    }

    const handleCancel = () => {
        const payload = {
            applicationId,
            cancellationReason: message
        }

        setLoading(true);
        cancelJobApplication(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                modal.success({
                    title: "Application cancelled successfully",
                    content: res.data.message,
                    onOk: () => {
                        setLoading(false);
                        refresh();
                        onCancel();
                    }
                });
                
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to cancel this application",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }

    const handleReject = () => {
        const payload = {
            applicationId,
            rejectionReason: message,
        }
        setLoading(true);
        rejectJobApplication(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                modal.success({
                    title: "Application rejected successfully",
                    content: res.data.message,
                    onOk: () => {
                        setLoading(false);
                        refresh();
                        onCancel();
                    }
                });
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to reject this application",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={ <div className='flex items-center justify-end gap-4 px-6 py-4'>
            <Button onClick={onCancel} type="default" className='md:!min-w-[98px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} >Cancel</Button>
            <Button type="primary" loading={loading} onClick={handleSubmit} className='md:!min-w-[98px] !h-[48px]' style={{borderRadius: 50}}>Send</Button>
        </div>}
        title={<p className='text-lg font-semibold'>{!isReject ? "Cancel" : "Reject"} Application</p>}
        width={700}
        styles={{body: { padding: "20px 0 10px" }}}
    >
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between bg-[#f9f9f9] px-2'>
                <div className='flex items-center gap-3'>
                    {user?.profilePicturePath && <Image className='!h-12 w-12 rounded-full object-cover' src={`${pictureUrl}${user.profilePicturePath}`} alt='' />}
                    {!user?.profilePicturePath && 
                        <Avatar 
                            icon={<UserOutlined className='text-2xl' />} 
                            alt=''
                            size={48} 
                            className='h-[48px] w-[48px] rounded-full object-cover' 
                        />}
                    <CardTitle title={`${user.firstName} ${user.lastName}`} description={user.email} />
                </div>
                
            </div>
            <Input.TextArea minLength={200} value={message} onChange={(e) => setMessage(e.target.value)}  placeholder='Enter your message' rows={5} />
        </div>
    </Modal>
  )
}

export default RejectCancel