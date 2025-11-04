"use client"
import AvailabilityCard from '@/components/client/cards/AvailabilityCard';
import ProfileCard from '@/components/client/cards/ProfileCard';
import RateCard from '@/components/client/cards/RateCard';
import ClientContainer from '@/components/dashboard/ClientContainer';
import { getServiceWorkerByUserID } from '@/redux/action/serviceWorker';
import { App, Card, Col, Row } from 'antd';
import React, { use, useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../../../utils/errorInstance';
import { getWorkerSchedule } from '@/redux/action/schedules';
import { UserWorkerProfile } from '../../../../../../utils/interface';
import { useServiceCategory } from '@/hooks/useServiceCategory';
import HireType from '@/components/client/modal/HireType';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const Page = ({ params }: {params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { modal } = App.useApp();
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const { categories } = useServiceCategory()
    const [ showHireModal, setShowHireModal ] = useState(false);
    const [ worker, setWorker ] = useState<UserWorkerProfile>({
        "id": 9,
        "userId": "601b638b-daf0-4213-991a-f753f1b1e062",
        "firstName": "Frontend",
        "lastName": "Worker",
        "email": "h0159buixy@wnbaldwy.com",
        "phoneNumber": "",
        "dateOfBirth": "0001-01-01T00:00:00",
        "gender": null,
        "bio": "",
        "profilePicturePath": null,
        "streetAddress": "Toronto, On",
        "city": null,
        "country": null,
        "postalCode": null,
        "latitude": 6.5568768,
        "longitude": 3.3488896,
        "services": [
            {
                "serviceCategoryId": 0,
                "hourlyRate": null,
                "yearsOfExperience": null
            }
        ],
        "languages": [
            {
                "name": "English",
                "code": "en",
                "proficiencyLevel": null,
                "isNative": null
            },
            {
                "name": "English (US)",
                "code": "en",
                "proficiencyLevel": null,
                "isNative": null
            },
            {
                "name": "English (GB)",
                "code": "en",
                "proficiencyLevel": null,
                "isNative": null
            },
            {
                "name": "Spanish",
                "code": "es",
                "proficiencyLevel": null,
                "isNative": null
            }
        ],
        "hourlyRate": 30.00,
        "timeZone": null,
        "currency": null,
        "isOnboarded": true
    })

    console.log("sghe", showHireModal, id, categories);
    const handleGetServiceWorker = useCallback((id: string) => {
        setLoading(true);
        getServiceWorkerByUserID(id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setWorker(res.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get worker details",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, []);

    const handleGetWorkerScedule = useCallback((id: string) => {
        setLoading(true);
        getWorkerSchedule(id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                console.log("response", res.data);
                
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get worker details",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, []);

    useEffect(() => {
        if(id) handleGetServiceWorker(id);
        if(id) handleGetWorkerScedule(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    
  return (
    <ClientContainer active='Worker'>
        <div onClick={() => router.back()} className='flex items-center gap-4 cursor-pointer my-2 text-[#343434]'>
            <ArrowLeftOutlined />
            <span>Back</span>
        </div>
        
        <Row className='min-h-[90vh] pb-6' gutter={[15,15]}>
            <Col lg={10} sm={12} xs={24} className='!flex flex-col gap-6 h-full'>
                <ProfileCard loading={loading} worker={worker} onClick={() => setShowHireModal(true)} />

                <AvailabilityCard />
            </Col>

            <Col lg={14} sm={12} xs={24} className='!flex flex-col gap-6 h-full'>
                <Card loading={loading} variant="borderless" styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}>
                    <div className='flex flex-col gap-3'>
                        <p className='t-pri text-2xl font-semibold'>Bio</p>
                        <p className='text-[#373737]'>{worker.bio}</p>
                   </div>

                   <div className='flex flex-col gap-3'>
                        <p className='t-pri text-2xl font-semibold'>Services Offered</p>
                        <div className='flex items-center gap-4 flex-wrap font-semibold'>
                            {worker.services.map((service,i:number) => (
                                <div key={i} className='bg-[#fff8f9] rounded-[68px] px-4 py-1'>
                                    <p className='text-[#670316] text-sm'>
                                        {categories[service.serviceCategoryId]?.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                   </div>
                    <div className='flex flex-col gap-3'>
                        <p className='t-pri text-2xl font-semibold'>Language</p>
                        <div className='flex items-center gap-4 flex-wrap text-[#1e1e11]'>
                            {worker.languages.map((language,i:number) => (
                                <div key={i} className='bg-[#f5f5f5] rounded-[68px] px-4 py-1'>
                                    <p className='text-sm'>{language.name}</p>
                                </div>
                            ))}
                        </div>
                   </div>
                </Card>

                <Card variant="borderless" styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}>
                    <p className='t-pri text-2xl font-semibold'>Client Reviews</p>

                    <Row gutter={[15,15]}>
                        <Col lg={24} sm={24} xs={24}>
                            <RateCard />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        {showHireModal && <HireType 
            open={showHireModal} 
            onCancel={() => setShowHireModal(false)} 
            worker={worker} 
        />}
    </ClientContainer>
  )
}

export default Page