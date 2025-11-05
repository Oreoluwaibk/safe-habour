"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons'
import { App, Avatar, Card, Col, Row, Skeleton, Image } from 'antd';
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react';
import { completeJobAsWorker, getAJobApplication } from '@/redux/action/jobs'
import { completeJob, IJobApplication, review } from '../../../../../../utils/interface'
import { createErrorMessage } from '../../../../../../utils/errorInstance'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { handleDisplayServices } from '../../../../../../utils/converters'
// import ApplyJob from '@/components/wallet/modal/ApplyJob';
import moment from "moment";
// import { savedPreferredTime } from '../../../../../../utils/savedInfo'
// import RateModal from '@/components/wallet/modal/RateModal'
// import Review from '@/components/client/settings/Review'
import RateCard from '@/components/client/cards/RateCard'
import { getClientJobReview } from '@/redux/action/review'
import RoundBtn from '@/components/general/RoundBtn'
import { useAppSelector } from '@/hook'
import AcceptDecline from '@/components/wallet/modal/AcceptDecline'
import { pictureUrl } from '../../../../../../utils/axiosConfig'

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const { modal } = App.useApp()
    const [ loading, setLoading ] = useState(false);
    const [ actionLoading, setActionLoading ] = useState(false);
    const [ job, setJob ] = useState<IJobApplication>({
            "id": "5d4afdc1-3bc0-4992-6545-08de1618ba71",
        "jobId": "8517cf86-2da6-4d53-3943-08de15311834",
        "message": "i fill i am capable of ploughing the house and i also have proofs and relevant experiences",
        "proposedRate": 200.00,
        "status": 1,
        "createdAt": "2025-10-28T11:54:49.6739794",
        "acceptedAt": null,
        "rejectedAt": null,
        "rejectionReason": null,
        "jobDetails": {
            "id": "8517cf86-2da6-4d53-3943-08de15311834",
            "serviceCategoryId": 2,
            "createdAt": "2025-10-28T11:33:14.0527071",
            "client": null,
            "dateNeeded": "2025-10-29T23:00:00",
            "jobTitle": "I want to plough my house",
            "isReocurringJob": false,
            "timePreference": 2,
            "location": "Toronto",
            "reoccurringDays": [],
            "budget": 200.00,
            "jobDescription": "The house roof",
            "clientId": "b299795d-7e98-4e7a-9694-1a0e7a3e2241",
            "status": 1,
            isHireDirectly: false
        }
    });
    const { categories } = useServiceCategory();
    const [ reviews, setReviews ] = useState<review[]>([]);
    const { user } = useAppSelector(state => state.auth);
    const [ openModal, setOpenModal ] = useState(false);
    const [ isAccept, setIsAccept ] = useState(false);   

    const handleGetJobApplication = useCallback(
        (id: string) => {
          setLoading(true);
          getAJobApplication(id)
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                setLoading(false);
                setJob(res.data.data);
                handleGetClientJobReviews(res.data.data.jobDetails.id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modal]);

    const handleGetClientJobReviews = useCallback(
    (id: string) => {
        setLoading(true);
        getClientJobReview(id)
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
            setLoading(false);
            console.log(res.data.data);
            setReviews(res.data.data);
            }
        })
        .catch((err) => {
            modal.error({
            title: "Unable to get review for this job",
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
    
    const handleMarkAsComplete = () => {
        const payload: completeJob = {
            jobId: job.jobDetails.id,
            completionNotes: ""
        }
        setActionLoading(true);
        completeJobAsWorker(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                    modal.success({
                    title: res.data.message || "Job is marked as completed",
                    onOk: () => {
                        setActionLoading(false);
                        handleGetJobApplication(id!.toString());
                    }
                })
            
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to mark this application as completed",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
                onOk: () => setActionLoading(false)
            });
        })
    }
    
  return (
    <WorkerContainer active='Schedule'>
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
                    <CardTitle title={job?.jobDetails.jobTitle || ""} />
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' /> {job?.jobDetails.location}</span>
                        <Rating />
                        <p className='text-lg text-[#646464] font-medium'>${job?.jobDetails.budget}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Status size={12} title={job && handleDisplayServices(job.jobDetails.serviceCategoryId, categories)?.name || ""} bg='#F6F6F6' color='#343434' />
                    </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-6'
            extra={
            <>
            {job.status === 2 && <div className='flex items-center gap-2 justify-end'>
                <RoundBtn width={94} onClick={() => {}} title='Cancel' />
                <RoundBtn primary width={159} onClick={handleMarkAsComplete} loading={actionLoading} title='Mark as Complete' />
            </div>}
            {job.jobDetails.isHireDirectly && job.status === 1 && <div className='flex items-center gap-2 justify-end'>
                <RoundBtn width={94} onClick={() => {
                    setIsAccept(false);
                    setOpenModal(true);
                }} title='Decline' />
                <RoundBtn primary width={94} onClick={() => {
                    setIsAccept(true);
                    setOpenModal(true);
                }} loading={actionLoading} title='Accept' />
            </div>}
            </>
            // <Button onClick={() => setOpenModal(true)} icon={<StarOutlined />} type="default" className='!text-[#670316] !h-[48px]' style={{borderRadius: 50}}>Rate Experience</Button>
        }
            loading={loading}
        />       
        </Col>

        <Col lg={10} sm={24} xs={24}>
            <Card
                title={
                    <div>
                        <CardTitle title='Client Information' />
                        <div className='flex items-center gap-3'>
                            {job?.jobDetails.client?.imageUrl && <Image src={`${pictureUrl}${job?.jobDetails.client?.imageUrl}`} alt='title' className='rounded-full h-[56px] w-[56px] object-cover' />}
                            {!job?.jobDetails.client?.imageUrl && 
                            <Avatar 
                                icon={<UserOutlined className='text-2xl' />} 
                                alt=''
                                size={84} 
                                className='h-[84px] w-[84px] rounded-full object-cover' 
                            />}
                            <CardTitle title={job?.jobDetails.client?.name || ""} description={<Rating />} />
                        </div>
                    </div>
                }
                classNames={{ header: "!py-4", body: "flex flex-col gap-6" }}
                className='!mt-0'
                loading={loading}
            >

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Member Since</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>{job?.jobDetails.client && moment(job?.jobDetails.client?.createdAt).format("YYYY")}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Verification</p>
                        <Status bg='' color={job?.jobDetails.client?.isVerified ? "#039855" : "#ff0004"} title={job?.jobDetails.client?.isVerified ? 'Verified' : "Not Verified"} />
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
            {!reviews && <p className='text-[#121212] text-center'>There are no client review for this job yet</p>}
        </Card> 

      
        </Col>
    </Row>
    </Skeleton>
    {openModal && 
        <AcceptDecline 
            open={openModal} 
            onCancel={() => setOpenModal(false)} 
            isAccept={isAccept} 
            application={job} 
            user={user}
            refresh={() =>{
                if(id) handleGetJobApplication(id.toString())}}
        />}
    </WorkerContainer>
  )
}

export default Page