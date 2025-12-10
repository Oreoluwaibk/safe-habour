"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, EnvironmentOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import { App, Avatar, Card, Col, Row, Skeleton, Image } from 'antd';
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react';
import { getAJob } from '@/redux/action/jobs'
import { JobDetails, review } from '../../../../../../utils/interface'
import { createErrorMessage } from '../../../../../../utils/errorInstance'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { handleDisplayServices } from '../../../../../../utils/converters'
// import ApplyJob from '@/components/wallet/modal/ApplyJob';
import moment from "moment";
// import { savedPreferredTime } from '../../../../../../utils/savedInfo'
// import RateModal from '@/components/wallet/modal/RateModal'
// import Review from '@/components/client/settings/Review'
import RateCard from '@/components/client/cards/RateCard'
// import { getClientJobReview } from '@/redux/action/review'
import RoundBtn from '@/components/general/RoundBtn'
import { useAppSelector } from '@/hook'
import { pictureUrl } from '../../../../../../utils/axiosConfig'
import useApplicationStatus from '@/hooks/useApplicationStatus'
import RateModal from '@/components/wallet/modal/RateModal'

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const { modal } = App.useApp()
    const [ loading, setLoading ] = useState(false);
    const [ application, setApplication ] = useState<JobDetails>({
        "id": "0cdf71ee-625f-4055-c242-08de28710082",
        "serviceCategoryId": 3,
        "createdAt": "2025-11-20T20:11:33.7946891",
        "dateNeeded": "2025-11-19T23:00:00",
        "jobTitle": "testing job notification",
        "isReocurringJob": false,
        "timePreference": 1,
        "location": "Toronto",
        "reoccurringDays": [],
        "budget": 100.00,
        "jobDescription": "I want to test job notification",
        "clientId": "b299795d-7e98-4e7a-9694-1a0e7a3e2241",
        "status": 3,
        "isHireDirectly": false,
        "applicantCount": 0,
        "client": {
            "name": "Frontend Client",
            "imageUrl": "uploads/profile-pictures/b299795d-7e98-4e7a-9694-1a0e7a3e2241/profile_20251114_172906.png",
            "createdAt": "2025-10-18T06:37:56.7806163",
            "isVerified": true,
            "clientRating": 4,
            "clientReviewComment": "The job was as described, no hassle or unneccessary negotiation",
            "serviceWorkerRating": 4,
            "serviceWorkerReviewComment": "The worker was perfect for the job",
            "reviews": []
        }
    });
    const { categories } = useServiceCategory();
    const [ reviews, setReviews ] = useState<review[]>([]);
    const { user } = useAppSelector(state => state.auth);
    const [ openModal, setOpenModal ] = useState(false);
    const { statusTitle, colors } = useApplicationStatus(application.status, 'job'); 

    const handleGetJobApplication = useCallback(
        (id: string) => {
          setLoading(true);
          getAJob(id)
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                setLoading(false);
                setApplication(res.data.data);
                if(res.data.data.client.clientReviewComment) setReviews([
                    {
                        jobId: res.data.data.id,
                        rating: res.data.data.client.clientRating,
                        comment: res.data.data.client.clientReviewComment,
                        isPublic: true,
                        name: res.data.data.client.name,
                        date: res.data.data.createdAt
                    }
                ])
                // handleGetClientJobReviews(res.data.data.id);
            }
        })
        .catch((err) => {
            modal.error({
            title: "Unable to get this application",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            onOk: () => setLoading(false),
            });
        })
        .finally(() => setLoading(false));
    },
    [modal]);

    // const handleGetClientJobReviews = useCallback(
    // (id: string) => {
    //     setLoading(true);
    //     getClientJobReview(id)
    //     .then((res) => {
    //         if (res.status === 200 || res.status === 201) {
    //             setLoading(false);
    //             setReviews(res.data.data);
    //         }
    //     })
    //     .catch((err) => {
    //         modal.error({
    //         title: "Unable to get review for this job",
    //         content: err?.response
    //             ? createErrorMessage(err.response.data)
    //             : err.message,
    //             onOk: () => setLoading(false),
    //         });
    //     })
    //     .finally(() => setLoading(false));
    // },
    // [modal] // dependencies
    // );
    
    useEffect(() => {
        if (id) handleGetJobApplication(id.toString());
    }, [id, handleGetJobApplication]);

    // const handleAccept = () => {
    //     setActionLoading(true);
    //     acceptJobApplication(id!.toString())
    //     .then(res => {
    //         if(res.status === 200 || res.status === 201) {
    //             setActionLoading(false);
    //             modal.success({
    //                 title: res.data.message || "Job accepted successfully",
    //                 onOk: () => {
    //                     setActionLoading(false);
    //                     handleGetJobApplication(id!.toString());
    //                 }
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         modal.error({
    //         title: "Unable to accept application",
    //         content: err?.response
    //             ? createErrorMessage(err.response.data)
    //             : err.message,
    //             onOk: () => setActionLoading(false)
    //         });
    //     })
    // }

  return (
    <WorkerContainer active='Jobs'>
    <div onClick={() => router.back()} className='flex items-center gap-4 cursor-pointer my-2 text-[#343434]'>
        <ArrowLeftOutlined />
        <span>Back</span>
    </div>

    <Skeleton loading={loading}  className='!pb-6 min-h-[90vh]'>
        <Row gutter={[15, 15]} className='!pb-6 min-h-[90vh]'>
        <Col lg={24} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title={application?.jobTitle || "Hire Service"} 
                        status={<Status title={statusTitle} bg={colors.bg} color={colors.color} />}
                    />
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' /> {application?.location}</span>
                        <Rating />
                        <p className='text-lg text-[#646464] font-medium'>${application?.budget}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Status size={12} title={application && handleDisplayServices(application.serviceCategoryId, categories)?.name || ""} bg='#F6F6F6' color='#343434' />
                    </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-6'
            extra={
                application?.client && !application?.client.serviceWorkerReviewComment && <RoundBtn 
                    onClick={() => setOpenModal(true)} 
                    icon={<StarOutlined />}
                    width={169}
                    title="Rate Experience" 
                />
            }
            
            // <RoundBtn onClick={() => setOpenModal(true)} icon={<StarOutlined />} type="default" className='!text-[#670316] !h-[48px]' style={{borderRadius: 50}}>Rate Experience</Button>
        
            loading={loading}
        />       
        </Col>

        <Col lg={10} sm={24} xs={24}>
            <Card
                title={
                    <div>
                        <CardTitle title='Client Information' />
                        <div className='flex items-center gap-3'>
                            {application?.client?.imageUrl && <Image src={`${pictureUrl}${application?.client?.imageUrl}`} alt='title' className='rounded-full h-[56px] w-[56px] object-cover' />}
                            {!application?.client?.imageUrl && 
                            <Avatar 
                                icon={<UserOutlined className='text-2xl' />} 
                                alt=''
                                size={56} 
                                className='h-[56px] w-[56px] rounded-full object-cover' 
                            />}
                            <CardTitle title={application?.client?.name || ""} description={<Rating />} />
                        </div>
                    </div>
                }
                classNames={{ header: "!py-4", body: "flex flex-col gap-6" }}
                className='!mt-0'
                loading={loading}
            >

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Member Since</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>{application?.client && moment(application?.client?.createdAt).format("YYYY")}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Verification</p>
                        <Status bg='' color={application?.client?.isVerified ? "#039855" : "#ff0004"} title={application?.client?.isVerified ? 'Verified' : "Not Verified"} />
                    </div>

                   
            </Card>
        </Col>

        <Col lg={14} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title='Client Review' 
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
    
    {openModal && 
    <RateModal 
        refresh={() => handleGetJobApplication(application.id)} 
        user={user} 
        job={application} 
        isWorker={true} 
        open={openModal} 
        onCancel={() => setOpenModal(false)} 
    />}
    </WorkerContainer>
  )
}

export default Page