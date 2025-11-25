"use client"
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, EnvironmentOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import { App, Avatar, Button, Card, Col, Row, Skeleton, Image } from 'antd';
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { getAJob } from '@/redux/action/jobs'
// import { jobs } from '../../../../../../utils/interface'
// import { createErrorMessage } from '../../../../../../utils/errorInstance'
import { useServiceCategory } from '@/hooks/useServiceCategory'
// import { handleDisplayServices } from '../../../../../../utils/converters'
// import ApplyJob from '@/components/wallet/modal/ApplyJob';
import moment from "moment";
// import { savedPreferredTime } from '../../../../../../utils/savedInfo'
// import { pictureUrl } from '../../../../../../utils/axiosConfig'
import { useAuthentication } from '@/hooks/useAuthentication'
import ClientContainer from '@/components/dashboard/ClientContainer'
import { handleDisplayServices } from '../../../../../../utils/converters'
import { JobDetails, review } from '../../../../../../utils/interface'
import { savedPreferredTime } from '../../../../../../utils/savedInfo'
import { pictureUrl } from '../../../../../../utils/axiosConfig'
import { createErrorMessage } from '../../../../../../utils/errorInstance'
import RateModal from '@/components/wallet/modal/RateModal'
import { useAppSelector } from '@/hook'
import RateCard from '@/components/client/cards/RateCard'

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const { modal, message } = App.useApp();
    const { authentication } = useAuthentication();
    const [ loading, setLoading ] = useState(false);
    const [ job, setJob ] = useState<JobDetails>();
    const { categories } = useServiceCategory();
    const [ openModal, setOpenModal ] = useState(false);
    const { user } = useAppSelector(state => state.auth);
    const [ reviews, setReviews ] = useState<review[]>([]);

    const handleGetJobs = useCallback(
    (id: string) => {
      setLoading(true);
      getAJob(id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setJob(res.data.data);
             res.data.data.client.serviceWorkerReviewComment && setReviews([
                    {
                        jobId: res.data.data.id,
                        rating: res.data.data.client.serviceWorkerRating,
                        comment: res.data.data.client.serviceWorkerReviewComment,
                        isPublic: true,
                        // name: res.data.data.client.name,
                        date: res.data.data.createdAt
                    }
                ])
          }
        })
        .catch((err) => {
          modal.error({
            title: "Unable to get this job",
            content: err?.response
              ? createErrorMessage(err.response.data)
              : err.message,
            onOk: () => setLoading(false),
          });
        })
        .finally(() => setLoading(false));
    },
    [modal] // dependencies
    );

    useEffect(() => {
        if (id) handleGetJobs(id.toString());
    }, [id, handleGetJobs]);

    const handleApply = () => {
        if(!authentication?.isVerified) return message.info("You have not been verified, this feature is only available to verified users!");
        setOpenModal(true)
    }
        
  return (
    <ClientContainer active='Worker'>
    <div onClick={() => router.back()} className='flex items-center gap-4 cursor-pointer my-2 text-[#343434]'>
        <ArrowLeftOutlined />
        <span>Back</span>
    </div>

    <Skeleton loading={loading}  className='!pb-6 min-h-[80vh]'>
        <Row gutter={[15, 15]}  className='!pb-6 min-h-[80vh]'>
        <Col lg={24} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle title={job?.jobTitle || "Hire Service"} />
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' /> {job?.location}</span>
                        <Rating />
                        <p className='text-lg text-[#646464] font-medium'>${job?.budget}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Status size={12} title={job && handleDisplayServices(job.serviceCategoryId, categories)?.name || ""} bg='#F6F6F6' color='#343434' />
                    </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-6'
            extra={
            job?.status === 3 && !job.client?.clientReviewComment && <Button 
                onClick={handleApply} 
                type="primary" 
                className='!h-[48px]' 
                icon={<StarOutlined className='!text-[#fff]' />}
                style={{borderRadius: 50}}>
                    Rate Experience
                </Button>}
            loading={loading}
        />       
        </Col>

        <Col lg={14} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title='Job Description' 
                    />
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-0'
            actions={[<p key={1} className='text-left px-6 text-sm text-[#585858]'>{job?.jobDescription}</p>]}
            loading={loading}
        /> 

        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title='Job Details' 
                    />
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-3'
            actions={[
                <div className='px-4 flex items-center gap-6' key={1}>
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464] flex items-center gap-1'><Icon icon="lets-icons:date-today-light" fontSize={14} />State Date:</span>
                        <span>{moment(job?.dateNeeded).format("DD/MM/YYYY")}</span>
                    </div>

                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464] flex items-center gap-1'><Icon icon="si:dollar-line" fontSize={14} />Payment:</span>
                        <span>Hourly rate paid weekly</span>
                    </div>

                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464] flex items-center gap-1'><Icon icon="mingcute:time-line" fontSize={14} />Preferred Time:</span>
                        <span>{job && savedPreferredTime.find(time => time.id === job?.timePreference)?.title}</span>
                    </div>
                </div>
            ]}
            loading={loading}
        />
        </Col>

        <Col lg={10} sm={24} xs={24}>
            <Card
                title={
                    <div>
                        <CardTitle title='Client Information' />
                        <div className='flex items-center gap-3'>
                            {job?.client?.imageUrl && <Image preview={false} src={`${pictureUrl}${job?.client?.imageUrl}`} alt='title' className='rounded-full h-[56px] w-[56px] object-cover' />}
                            {!job?.client?.imageUrl && 
                                <Avatar 
                                    icon={<UserOutlined className='text-2xl' />} 
                                    alt=''
                                    size={56} 
                                    className='h-[56px] w-[56px] rounded-full object-cover' 
                                />}
                            <CardTitle title={job?.client?.name || ""} description={<Rating />} />
                        </div>
                    </div>
                }
                classNames={{ header: "!py-4", body: "flex flex-col gap-6" }}
                className='!mt-0'
                loading={loading}
            >

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Member Since</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>{job?.client && moment(job?.client?.createdAt).format("YYYY")}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Verification</p>
                        <Status bg='' color={job?.client?.isVerified ? "#039855" : "#ff0004"} title={job?.client?.isVerified ? 'Verified' : "Not Verified"} />
                    </div>
            </Card>
        </Col>

        <Col lg={24} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title='Worker Review' 
                    />
                </div>
            }
            classNames={{ header: "!py-4", body: "", }}
            className='!mt-0'
            loading={loading}
        >
            {reviews && reviews.length > 0 && (
                reviews.map((review, i: number) => (
                    <RateCard reviewDetails={review} key={i} />
                ))
            )}
            {reviews.length === 0 && <p className='text-[#121212] text-center'>There are no client review for this job yet</p>}
        </Card> 

      
        </Col>
    </Row>
    </Skeleton>
    {openModal && job && 
    <RateModal
        open={openModal} 
        onCancel={() => setOpenModal(false)} 
        job={job}
        user={user}
        refresh={() => handleGetJobs(job.id)}
    />
    }
    </ClientContainer>
  )
}

export default Page