import CardTitle from '@/components/general/CardTitle';
import CompleteInfo from '@/components/general/CompleteInfo';
import Status from '@/components/general/Status';
import { UploadOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Card, Upload } from 'antd'
import React, { ReactNode } from 'react'

interface props {
    title: string;
    description: string;
    icon?: ReactNode;
    approved?: boolean;
    // uploaded?: boolean;
}
const VerificationUpload = ({
    title,
    description,
    icon=<Icon icon="line-md:security" fontSize={14} className='mr-1' />,
    approved
}: props) => {
  return (
    <Card 
        title={
            <CardTitle 
                title={title} 
                description={description} 
                icon={icon} 
                status={<Status color={approved ? "#018A06" :'#FF0004'} bg={approved ? "#F3FFF4" :'#FFF7F9'} title={approved ? "approved" : "pending"} />}
        />}
        actions={[
            <div key={1} className='flex items-center justify-between px-6 py-4 !w-full'>

            <Upload className='w-full' style={{width: "100%"}}>
                <Button type="default" className='!w-full !h-[48px]' style={{borderRadius: 50}} icon={<UploadOutlined />}>{approved ? "Replace " :"Upload"} Document</Button>
            </Upload>
        </div>]}
        // styles={{body: {padding: 0}}}

    >
        <CompleteInfo 
            title='Police_Background_Check_2024.pdf'
            description='Uploaded 15/01/2024'
            nav="Expires 15/01/2025"
            onCancel={() => {}}
            icon={<Icon icon="basil:document-outline" fontSize={20} className='mt-1' />}
        />
    </Card>
  )
}

export default VerificationUpload