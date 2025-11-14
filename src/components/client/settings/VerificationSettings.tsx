import { Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import UploadCard from '../cards/UploadCard'
import { Icon } from '@iconify/react'
import { RcFile } from 'antd/es/upload'
import { IUser } from '../../../../utils/interface'

interface props {
    authentication: IUser;
}
const VerificationSettings = ({ authentication }: props) => {
    const [ loading ] = useState(false);
    const [ idCard, setIdCard ] = useState<RcFile | null>(null);
    const [ proofOfAddress, setProofOfAddress ] = useState<RcFile | null>(null);
  return (
    <Card 
        title={<div>
            <p className='text-lg font-semibold'>Verification Settings</p>
            <p className='text-xs text-[#878787] font-light'>Upload document and get verified</p>
        </div>}
        
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
    >
        <Row gutter={[15, 15]} className='py-6'>
            <Col lg={24} sm={24} xs={24}>
                <UploadCard 
                    title='Canadian ID' 
                    isUploaded={authentication.hasIdentificationDocument}
                    description='Upload your D/L ,PR or Canadian Card' 
                    value={idCard}
                    setValue={setIdCard}
                    type={1}
                    icon={<Icon icon="material-symbols-light:id-card-rounded" color='#505050' className='!text-xl' fontSize={20} />}
                />
                {/* <VerificationUpload  
                    title='Police Background Check'
                    description='Current police background check report'
                    approved={authentication.hasIdentificationDocument}
                    value={policeReport}
                    setValue={setPoliceReport}
                    type={1}
                /> */}
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <UploadCard 
                    title='Proof of Address' 
                    description='Upload Bill within 30 days' 
                    icon={<Icon icon="mdi:address-marker" color='#505050' className='!text-xl' fontSize={20} />}
                    isUploaded={authentication.hasIdentificationDocument}
                    value={proofOfAddress}
                    setValue={setProofOfAddress}
                    type={2}
                />
            </Col>
           
        </Row>
    </Card>
  )
}

export default VerificationSettings