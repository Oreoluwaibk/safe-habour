import { App, Avatar, Button, Input, Modal, Rate, Image } from 'antd';
import React, { useState } from 'react'
import { C1 } from '../../../../assets/image';
import CardTitle from '@/components/general/CardTitle';
import { IUser, JobDetails, review } from '../../../../utils/interface';
import { postWorkerJobReview } from '@/redux/action/review';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { pictureUrl } from '../../../../utils/axiosConfig';
import { UserOutlined } from '@ant-design/icons';

interface props {
  open: boolean;
  onCancel: () => void;
  isWorker?: boolean;
  user: IUser;
  job: JobDetails;
  refresh: () => void;
}

const RateModal = ({ open, onCancel, isWorker, user, job, refresh }: props) => {
  const { modal, message } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState("");

  const handleSendWorkerReview = () => {
    if(!rating) return message.error("Kindly set the rating to continue!");
    if(!comment) return message.error("Kindly drop a comment to continue!")

    const payload: review = {
      isPublic: true,
      rating,
      comment,
      jobId: job.id
    }
    setLoading(true);
    postWorkerJobReview(payload)
    .then(res => {
      if(res.status === 200 || res.status === 201) {
        setLoading(false);
        refresh();
        onCancel();
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to save review",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
        onOk: () => setLoading(false)
      });
    })
  }

  const handleSubmit = () => {
    if(isWorker) handleSendWorkerReview();
  }
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={ <div className='flex items-center justify-end gap-4 px-6 py-4'>
            <Button onClick={onCancel} type="default" className='md:!min-w-[98px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} >Cancel</Button>
            <Button type="primary" loading={loading} onClick={handleSubmit} className='md:!min-w-[98px] !h-[48px]' style={{borderRadius: 50}}>Send</Button>
        </div>}
        title={<p className='text-lg font-semibold'>Rate Experience</p>}
        width={700}
        styles={{body: { padding: "20px 0 10px" }}}
    >
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between bg-[#f9f9f9] px-2'>
                <div className='flex items-center gap-3'>
                    {user.profilePicturePath && <Image className='!h-12 w-12 rounded-full object-cover' src={`${pictureUrl}${user.profilePicturePath}`} alt='' />}
                    {!user.profilePicturePath && <Avatar icon={<UserOutlined className='text-xl' />} className='!h-12 w-12 rounded-full object-cover' size={48} alt='' />}
                    <CardTitle title={`${user.firstName} ${user.lastName}`} description={user.email} />
                </div>
                <Rate className='text-[#FFDD33] text-sm' value={rating} onChange={(value) => setRating(value)} count={5}   />
            </div>
            <Input.TextArea minLength={200} value={comment} onChange={(e) => setComment(e.target.value)}  placeholder='Rate Experience' rows={5} />
        </div>
    </Modal>
  )
}

export default RateModal