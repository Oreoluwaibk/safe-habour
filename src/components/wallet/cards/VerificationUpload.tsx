"use client"
import CardTitle from '@/components/general/CardTitle';
import CompleteInfo from '@/components/general/CompleteInfo';
import Status from '@/components/general/Status';
import { verifyDocuments } from '@/redux/action/auth';
import { UploadOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { App, Button, Card, Upload } from 'antd'
import { RcFile } from 'antd/es/upload';
import { toFormData } from 'axios';
import React, { ReactNode, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { useAppSelector } from '@/hook';

interface props {
    title: string;
    description: string;
    icon?: ReactNode;
    approved?: boolean;
    noStatus?: boolean;
    type?: number;
    value?: RcFile | null;
    setValue?: React.Dispatch<React.SetStateAction<RcFile | null>>
    // uploaded?: boolean;
}
const maxFileSize = 10000000;
const VerificationUpload = ({
    title,
    description,
    icon=<Icon icon="line-md:security" fontSize={14} className='mr-1' />,
    approved,
    noStatus,
    type,
    setValue,
    value
}: props) => {
    const { user } = useAppSelector(state => state.auth);
    const { message, modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ file, setFile ] = useState<RcFile | null>(null);

    useEffect(() => {
        if(value) setFile(value)
    }, [value]);

    const handleUpload = async (file: RcFile) => {
        setLoading(true);
        const payload = {
            UserPhysicalInformationType: type,
            UserPhysicalInformation: file,
            UserId: user.id
        }

        const formData = toFormData(payload) as FormData;
        setLoading(true);
        verifyDocuments(formData)
        .then(res => {
            if(res.status === 200 || res.status === 201){
                setLoading(false);
                message.success(res.data.message)
                if (setValue) setValue(file)
            }
        })
        .catch((err) => {
            modal.error({
                title: "Error",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        });
    }

    const handleBeforeUpload = async (file: RcFile) => {
        if (file.size > maxFileSize) return message.warning("Cannot upload file more than 10mb");

        // const bas = await getBase64(file);
        // setUploadName(file.name);
        handleUpload(file)
        
        
        return setFile(file);
    }

    const  handleRemovePicture = () => setFile(null);
  return (
    <Card 
        title={
            <CardTitle 
                title={title} 
                description={description} 
                icon={icon} 
                status={!noStatus && <Status color={approved ? "#018A06" :'#FF0004'} bg={approved ? "#F3FFF4" :'#FFF7F9'} title={approved ? "approved" : "pending"} />}
        />}
        actions={[
            <div key={1} className='flex items-center justify-between px-6 py-4 !w-full'>

            <Upload 
                className='w-full' 
                style={{width: "100%"}}
                // fileList={[file]}
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemovePicture}
                accept=".pdf, .doc, .docx" 
                showUploadList={false}
            >
                <Button loading={loading} type="default" className='!w-full !h-[48px]' style={{borderRadius: 50}} icon={<UploadOutlined />}>{approved ? "Replace " :"Upload"} Document</Button>
            </Upload>
        </div>]}
        styles={{ body: { padding: file ? 20 : 0}}}
    >
        {file && <CompleteInfo 
            title={file.name}
            description={file.lastModifiedDate.toDateString()}
            onCancel={() => setFile(null)}
            icon={<Icon icon="basil:document-outline" fontSize={20} className='mt-1' />}
        />}
    </Card>
  )
}

export default VerificationUpload