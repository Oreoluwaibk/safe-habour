"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { App, Card } from 'antd'
// import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IJobApplication } from '../../../../utils/interface'
import moment from 'moment'
import { savedPreferredTime } from '../../../../utils/savedInfo'
import { acceptJobApplication } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'

interface props {
  application: IJobApplication; // Replace 'any' with the actual type of application if available
}
const JobApplicationCard = ({ application }: props) => {
    // const router = useRouter();
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ statusTitle, setStatusTitle ] = React.useState<string>("");
    
    useEffect(() => {
    if (application.status !== undefined) {
        switch (application.status) {
        case 1: setStatusTitle("Open"); break;
        case 2: setStatusTitle("InProgress"); break;
        case 3: setStatusTitle("Completed"); break;
        case 4: setStatusTitle("Cancelled"); break;
        case 5: setStatusTitle("Disputed"); break;
        case 6: setStatusTitle("ServiceWorkerCompleted"); break;
        default: setStatusTitle("Unknown"); break;
        }
    }
    }, [application.status]);

    const handleAccept = () => {
            setLoading(true);
            acceptJobApplication(application.id)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    modal.success({
                        title: res.data.message || "Job accepted successfully",
                        onOk: () => {
                            setLoading(false);
                            // onRefresh();
                        }
                    })
                }
            })
            .catch(err => {
                modal.error({
                    title: "Unable to accept application",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false)
                });
            })
        }

    const open = statusTitle === "Open" || statusTitle === "InProgress";
  return (
     <Card
        title={
            <div>
                <CardTitle 
                    title={application.jobDetails.jobTitle} 
                    description={`Client: ${application.jobDetails.client?.name}`} 
                    status={ <Status title={statusTitle} bg={open ? "#FFF5F7" : "#FFF5F5"} color={open ? "#670316" : "#FF0004"} />} 
                /> 

                <p className=' mt-[-10px] text-[#343434] text-lg'>{application.jobDetails.jobDescription}</p>

                <div className='flex items-center gap-12 mt-4'>
                     <div className='flex items-center gap-2 '>
                        <EnvironmentOutlined color='#670316' className='!text-[#670316]'/>
                        <p className='text-[#646464] font-normal'>{application.jobDetails.location}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ClockCircleOutlined color='#646464' className='!text-[#646464]' />
                        <p className='text-[#646464] font-normal'>{application.jobDetails && savedPreferredTime.find(time => time.id === application.jobDetails.timePreference)?.title} - {moment(application.jobDetails.dateNeeded).format("DD/MM/YYYY")} </p>
                    </div>
                </div>

            </div>
        }
        extra={<div className='flex flex-col items-end justify-between w-full'>
            <Status title='No Application Yet' bg='#f5f5f5' color='#1E1E1E' />
            <div style={{height: 30}}></div>
            <RoundBtn loading={loading} icon={<EyeOutlined className='!text-[#670316]' />} title='View Details' onClick={handleAccept} />
        </div>}
        classNames={{ header: "!pb-4", body: "flex flex-col gap-2"}}
       
    />
        
    
  )
}

export default JobApplicationCard