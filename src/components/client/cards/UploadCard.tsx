import { useAppSelector } from '@/hook';
import { verifyDocuments } from '@/redux/action/auth';
import { App, Card, Upload, Image } from 'antd'
import { RcFile } from 'antd/es/upload';
import { toFormData } from 'axios';
import React, { ReactNode, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import CompleteInfo from '@/components/general/CompleteInfo';
import { Icon } from '@iconify/react';
import { LoadingOutlined } from '@ant-design/icons';
// import Image from 'next/image';

interface props {
  title: string;
  description: string;
  icon: ReactNode;
  isUploaded?: boolean;
  approved?: boolean;
  type?: number;
  value?: RcFile | null;
  setValue?: React.Dispatch<React.SetStateAction<RcFile | null>>;
  url?: string;
}
const maxFileSize = 10000000;
const UploadCard = ({ title, description, icon, isUploaded, value, type, setValue, url, approved }: props) => {
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
        title: "Unable to upload document",
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
      variant="borderless"
      style={{backgroundColor: isUploaded ? "#FFF9FA" : "#FBFBFB", width: "100%"}} 
      styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}
    >
    <Upload 
      className='flex items-center justify-between w-full'
      beforeUpload={handleBeforeUpload}
      onRemove={handleRemovePicture}
      accept=".jpg,.png,.jpeg,.pdf" 
      style={{width: "100%"}}
      showUploadList={false}
    >

    <div className='w-full'>
      <div className='flex items-center gap-1'>
        {icon} 
        <p className='text-[#505050] font-medium text-lg '>{title}</p>
        {loading && <LoadingOutlined spin />}
      </div>
      
      <p className='text-[#808080]'>{description} - click to upload</p>
    </div>
    {isUploaded && !approved && <div className='text-[#670316] bg-[#FFE4E9] rounded-2xl px-2 h-7.5 flex items-center '>
      <span className='text-[#670316] text-[12px]'>Pending</span>
    </div>}

    {isUploaded && approved && <div className='text-[#670316] bg-[#FFE4E9] rounded-2xl px-2 h-7.5 flex items-center '>
      <span className='text-[#670316] text-[12px]'>Approved</span>
    </div>}
       
    </Upload> 
    {file && <CompleteInfo 
      title={file.name}
      description={file.lastModifiedDate.toDateString()}
      onCancel={() => setFile(null)}
      icon={<Icon icon="basil:document-outline" fontSize={20} className='mt-1' />}
      />}
      {url && !file &&( url.split(".").includes("pdf") ? (
        <iframe
          src={url}
          width="100%"
          height="100%"
          allowFullScreen
          title={url}
        />
      ) : (
      <Image 
          src={url}
          alt="Perp"
          preview={false} // optional: disable AntD preview
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover", // fills container, crops if necessary
            display: "block",  // prevents inline spacing issues
          }} 
      />))}
    </Card>
   
  )
}

export default UploadCard