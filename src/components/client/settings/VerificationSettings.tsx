import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import UploadCard from '../cards/UploadCard'
import { Icon } from '@iconify/react'
import { RcFile } from 'antd/es/upload'
import { IUser } from '../../../../utils/interface'
import { getVerificationDocument } from '@/redux/action/auth'
import { createErrorMessage } from '../../../../utils/errorInstance'

interface props {
    authentication: IUser;
}
const VerificationSettings = ({  }: props) => {
    const [ idCard, setIdCard ] = useState<RcFile | null>(null);
    const [ proofOfAddress, setProofOfAddress ] = useState<RcFile | null>(null);
    const [ loading, setLoading ] = useState(false);
    const { modal } = App.useApp();
    const [ documents, setDocuments ] = useState({
        "userIdentificationDocumentPath": "uploads/user-verification/e9ed3d12-83c0-4dc5-a0ac-f0c1077ffe45/useridentification_20251218_060448.pdf",
        "userLocationDocumentPath": "uploads/user-verification/e9ed3d12-83c0-4dc5-a0ac-f0c1077ffe45/userlocation_20251218_060453.pdf",
        "userIdentificationDocumentUrl": "https://safe-habour-api.azurewebsites.net/uploads/user-verification/e9ed3d12-83c0-4dc5-a0ac-f0c1077ffe45/useridentification_20251218_060448.pdf",
        "userLocationDocumentUrl": "https://safe-habour-api.azurewebsites.net/uploads/user-verification/e9ed3d12-83c0-4dc5-a0ac-f0c1077ffe45/userlocation_20251218_060453.pdf",
        "hasIdentificationDocument": true,
        "hasLocationDocument": true
    })

     const handleGetDocument = useCallback(() => {
        setLoading(true);
        getVerificationDocument()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                console.log(res.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get verification documents",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, [modal]);

    useEffect(() => {
        handleGetDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <Card 
        title={<div>
            <p className='text-lg font-semibold'>Verification Settings</p>
            <p className='text-xs text-[#878787] font-light'>Upload document and get verified</p>
        </div>}
        
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        loading={loading}
    >
        <Row gutter={[15, 15]} className='py-6'>
            <Col lg={24} sm={24} xs={24}>
                <UploadCard 
                    title='Canadian ID' 
                    isUploaded={documents.hasIdentificationDocument}
                    description='Upload your D/L ,PR or Canadian Card' 
                    value={idCard}
                    setValue={setIdCard}
                    type={1}
                    icon={<Icon icon="material-symbols-light:id-card-rounded" color='#505050' className='!text-xl' fontSize={20} />}
                    url={documents.userIdentificationDocumentUrl}
                />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <UploadCard 
                    title='Proof of Address' 
                    description='Upload Bill within 30 days' 
                    icon={<Icon icon="mdi:address-marker" color='#505050' className='!text-xl' fontSize={20} />}
                    isUploaded={documents.hasIdentificationDocument}
                    value={proofOfAddress}
                    setValue={setProofOfAddress}
                    type={2}
                    url={documents.userLocationDocumentUrl}
                />
            </Col>
           
        </Row>
    </Card>
  )
}

export default VerificationSettings