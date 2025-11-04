"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, EnvironmentOutlined, StarOutlined } from '@ant-design/icons'
import { App, Button, Card, Col, Row, Skeleton, Image } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { C1 } from '../../../../../../assets/image';
import { getAJobApplication } from '@/redux/action/jobs'
import { IJobApplication, review } from '../../../../../../utils/interface'
import { createErrorMessage } from '../../../../../../utils/errorInstance'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { handleDisplayServices } from '../../../../../../utils/converters'
import moment from "moment";
import RateModal from '@/components/wallet/modal/RateModal'
import RateCard from '@/components/client/cards/RateCard'
import { getClientJobReview } from '@/redux/action/review'
import { useAppSelector } from '@/hook'
import { pictureUrl } from '../../../../../../utils/axiosConfig'

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const { modal } = App.useApp();
    const { loginType, user } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState(false);
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
    const [ reviews, setReviews ] = useState<review[]>([]);
    const { categories } = useServiceCategory();
    const [ openModal, setOpenModal ] = useState(false);

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
    [modal] // dependencies
    );

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
            extra={<Button onClick={() => setOpenModal(true)} icon={<StarOutlined />} type="default" className='!text-[#670316] !h-[48px]' style={{borderRadius: 50}}>Rate Experience</Button>}
            loading={loading}
          />       
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Card
            title={
              <div>
                <CardTitle title='Client Information' />
                <div className='flex items-center gap-3'>
                  <Image src={`${pictureUrl}${job?.jobDetails.client?.imageUrl}` || C1} alt='title' className='rounded-full h-[56px] w-[56px] object-cover' />
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
              <p className='text-lg text-[#1e1e1e] font-medium'>{job?.jobDetails?.client && moment(job?.jobDetails.client?.createdAt).format("YYYY")}</p>
            </div>

            <div className='flex items-center justify-between'>
              <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
              <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
            </div>

            <div className='flex items-center justify-between'>
              <p className='text-lg text-[#1e1e1e]'>Verification</p>
              <Status bg='' color={job.jobDetails?.client?.isVerified ? "#039855" : "#ff0004"} title={job.jobDetails.client?.isVerified ? 'Verified' : "Not Verified"} />
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
              reviews.map((review, i:number) => (
                <RateCard reviewDetails={review} key={i} />
              ))
            )}
            {!reviews && <p className='text-[#121212] text-center'>There are no client review for this job yet</p>}
          </Card> 
        </Col>
    </Row>
    </Skeleton>
    {openModal && 
    <RateModal 
        refresh={() => handleGetClientJobReviews(job.jobDetails.id)} 
        user={user} 
        job={job.jobDetails} 
        isWorker={loginType === "ServiceWorker"} 
        open={openModal} 
        onCancel={() => setOpenModal(false)} 
    />}
    </WorkerContainer>
  )
}

export default Page