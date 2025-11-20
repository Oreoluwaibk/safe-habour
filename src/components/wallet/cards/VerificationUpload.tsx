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
    setValue?: React.Dispatch<React.SetStateAction<RcFile | null>>;
    accept?: string;
    isUploaded: boolean;
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
    value,
    accept= ".pdf, .doc, .docx, .jpeg, .jpg, .png",
    isUploaded
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
                message.success("Your document are being reviewed")
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
        handleUpload(file)
        return setFile(file);
    }

    const  handleRemovePicture = () => setFile(null);
  return (
    <Card 
        title={
            <CardTitle 
                title={title} 
                description={`${description} (max size 10mb)`} 
                icon={icon} 
                status={!noStatus && 
                    <Status 
                        color={approved && isUploaded ? "#018A06" : isUploaded && !approved ? "#FFDD33" :'#FF0004'} 
                        bg={approved && isUploaded ? "#F3FFF4" : isUploaded && !approved ? "#FFFBE6" : '#FFF7F9'} 
                        title={approved && isUploaded ? "approved" : isUploaded && !approved  ? "pending verification" : "Not uploaded"} />
                    }
        />}
        actions={[
            <div key={1} className='flex items-center justify-between px-6 py-4 !w-full'>

            <Upload 
                className='w-full' 
                style={{width: "100%"}}
                // fileList={[file]}
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemovePicture}
                accept={accept} 
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