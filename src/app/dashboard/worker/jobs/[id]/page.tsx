"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons'
import { App, Avatar, Button, Card, Col, Row, Skeleton, Image } from 'antd';
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { getAJob } from '@/redux/action/jobs'
import { jobs } from '../../../../../../utils/interface'
import { createErrorMessage } from '../../../../../../utils/errorInstance'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { handleDisplayServices } from '../../../../../../utils/converters'
import ApplyJob from '@/components/wallet/modal/ApplyJob';
import moment from "moment";
import { savedPreferredTime } from '../../../../../../utils/savedInfo'
import { pictureUrl } from '../../../../../../utils/axiosConfig'

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const { modal } = App.useApp()
    const [ loading, setLoading ] = useState(false);
    const [ job, setJob ] = useState<jobs>();
    const { categories } = useServiceCategory();
    const [ openModal, setOpenModal ] = useState(false);

    const handleGetJobs = useCallback(
    (id: string) => {
      setLoading(true);
      getAJob(id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setJob(res.data.data);
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
        
  return (
    <WorkerContainer active='Jobs'>
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
                        <Status size={12} title={job && handleDisplayServices(job.serviceCategory, categories)?.name || ""} bg='#F6F6F6' color='#343434' />
                    </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-6'
            extra={<Button onClick={() => setOpenModal(true)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Apply Now</Button>}
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
    </Row>
    </Skeleton>
    {openModal && job && <ApplyJob open={openModal} onCancel={() => setOpenModal(false)} job={job} />}
    </WorkerContainer>
  )
}

export default Page