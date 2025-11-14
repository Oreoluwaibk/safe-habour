"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, ClockCircleOutlined, EnvironmentOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, Card, Col, Row, Skeleton, Image, Avatar } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react';
import { completeJobAsWorker, getAJobApplication } from '@/redux/action/jobs'
import { completeJob, IJobApplication } from '../../../../../../utils/interface'
import { createErrorMessage } from '../../../../../../utils/errorInstance'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { handleDisplayServices } from '../../../../../../utils/converters'
import moment from "moment";
import RateModal from '@/components/wallet/modal/RateModal'
// import { getClientJobReview } from '@/redux/action/review'
import { useAppSelector } from '@/hook'
import { pictureUrl } from '../../../../../../utils/axiosConfig'
import { Icon } from '@iconify/react'
import { savedPreferredTime } from '../../../../../../utils/savedInfo'
import useApplicationStatus from '@/hooks/useApplicationStatus'
import AcceptDecline from '@/components/wallet/modal/AcceptDecline'
import RoundBtn from '@/components/general/RoundBtn'

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { modal } = App.useApp();
  const { user } = useAppSelector(state => state.auth);
  const [ loading, setLoading ] = useState(false);
  const [ application, setApplication ] = useState<IJobApplication>({
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
      isHireDirectly: false,
      applicantCount: 0
    }
  });
  // const [ reviews, setReviews ] = useState<review[]>([]);
  const { categories } = useServiceCategory();
  const [ openModal, setOpenModal ] = useState(false);
  const [ openRateModal, setOpenRateModal ] = useState(false);
  const { statusTitle, colors } = useApplicationStatus(application.status, 'application');
  const [ isAccept, setIsAccept ] = useState(true);
  const [ markLoading, setMarkLoading ] = useState(false);
  
  const handleGetJobApplication = useCallback(
  (id: string) => {
    setLoading(true);
    getAJobApplication(id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setLoading(false);
          setApplication(res.data.data);
          // handleGetClientJobReviews(res.data.data.jobDetails.id);
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
  [modal]
  );

  // const handleGetClientJobReviews = useCallback(
  // (id: string) => {
  //   setLoading(true);
  //   getClientJobReview(id)
  //     .then((res) => {
  //       if (res.status === 200 || res.status === 201) {
  //         setLoading(false);
  //         setReviews(res.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       modal.error({
  //         title: "Unable to get review for this job",
  //         content: err?.response
  //           ? createErrorMessage(err.response.data)
  //           : err.message,
  //         onOk: () => setLoading(false),
  //       });
  //     })
  //     .finally(() => setLoading(false));
  // },
  // [modal] // dependencies
  // );

  const handleMarkAsComplete = () => {
    const payload: completeJob = {
      jobId: application.jobDetails.id,
      completionNotes: ""
    }
    setMarkLoading(true);
    completeJobAsWorker(payload)
    .then(res => {
      if(res.status === 200 || res.status === 201) {
        modal.success({
          title: res.data.message || "Job is marked as completed",
          onOk: () => {
            setMarkLoading(false);
            handleGetJobApplication(application.id);
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
        onOk: () => setMarkLoading(false)
      });
    })
  }

  useEffect(() => {
    if (id) handleGetJobApplication(id.toString());
  }, [id, handleGetJobApplication]);

  const handleAcceptDecline = (accept: boolean) => {
    setIsAccept(accept);
    setOpenModal(true);
  }
    
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
                title={application?.jobDetails.jobTitle || "Hire Service"} 
                status={<Status title={statusTitle} bg={colors.bg} color={colors.color} />}
              />
              <div className='flex items-center gap-3'>
                <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' /> {application?.jobDetails.location}</span>
                <Rating />
                <p className='text-lg text-[#646464] font-medium'>${application?.jobDetails.budget}</p>
              </div>
              <div className='flex items-center gap-4'>
                <Status size={12} title={application && handleDisplayServices(application.jobDetails.serviceCategoryId, categories)?.name || ""} bg='#F6F6F6' color='#343434' />
              </div>
            </div>
          }
          classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
          className='!mt-6'
          extra={
            <>
            {application.jobDetails.status === 5 && <Button onClick={() => setOpenRateModal(true)} icon={<StarOutlined />} type="default" className='!text-[#670316] !h-[48px]' style={{borderRadius: 50}}>Rate Experience</Button>}
            {application.jobDetails.isHireDirectly && application.status === 1 && <div className='flex items-center gap-2'>
              <RoundBtn width={89} onClick={() => handleAcceptDecline(false)} title='Decline' />
              <RoundBtn primary width={89} onClick={() => handleAcceptDecline(true)} title='Accept' />
            </div>}
            {application.status === 2 && application.jobDetails.status ===2 && <div className='flex items-center gap-2'>
              <RoundBtn onClick={handleMarkAsComplete} loading={markLoading} width={187} title='Mark as Complete' icon={<ClockCircleOutlined className='text-[#670316]' />} />
            </div>}
            </>
            
          }
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
          actions={[<p key={1} className='text-left px-6 text-sm text-[#585858]'>{application.jobDetails.jobDescription}</p>]}
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
              <span>{moment(application?.jobDetails.dateNeeded).format("DD/MM/YYYY")}</span>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-[#646464] flex items-center gap-1'><Icon icon="si:dollar-line" fontSize={14} />Payment:</span>
              <span>Hourly rate paid weekly</span>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-[#646464] flex items-center gap-1'><Icon icon="mingcute:time-line" fontSize={14} />Preferred Time:</span>
              <span>{application && savedPreferredTime.find(time => time.id === application?.jobDetails?.timePreference)?.title}</span>
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
                {application?.jobDetails.client?.imageUrl && <Image src={`${pictureUrl}${application?.jobDetails.client?.imageUrl}`} alt='title' className='rounded-full h-[56px] w-[56px] object-cover' />}
                {!application?.jobDetails.client?.imageUrl && 
                <Avatar 
                  icon={<UserOutlined className='text-2xl' />} 
                  alt=''
                  size={56} 
                  className='h-[56px] w-[56px] rounded-full object-cover' 
                />}
                <CardTitle title={application?.jobDetails.client?.name || ""} description={<Rating />} />
              </div>
            </div>
          }
          classNames={{ header: "!py-4", body: "flex flex-col gap-6" }}
          className='!mt-0'
          loading={loading}
        >

          <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Member Since</p>
            <p className='text-lg text-[#1e1e1e] font-medium'>{application?.jobDetails?.client && moment(application?.jobDetails.client?.createdAt).format("YYYY")}</p>
          </div>

          <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
            <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
          </div>

          <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Verification</p>
            <Status bg='' color={application.jobDetails?.client?.isVerified ? "#039855" : "#ff0004"} title={application.jobDetails.client?.isVerified ? 'Verified' : "Not Verified"} />
          </div>
        </Card>
      </Col>
    </Row>
    </Skeleton>
    {openModal && 
      <AcceptDecline 
        open={openModal} 
        onCancel={() => setOpenModal(false)} 
        isAccept={isAccept} 
        application={application} 
        user={user}
        refresh={() =>{
          if(id) handleGetJobApplication(id.toString())}}
      />}
     {openRateModal && 
      <RateModal 
        refresh={() => {}} 
        user={user} 
        job={application.jobDetails} 
        isWorker={true} 
        open={openRateModal} 
        onCancel={() => setOpenRateModal(false)} 
      />}
    </WorkerContainer>
  )
}

export default Page