import { Card, Col, Row } from 'antd'
import React from 'react'
import UploadCard from '../cards/UploadCard'
import { Icon } from '@iconify/react'

const VerificationSettings = () => {
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
                    description='Upload your D/L ,PR or Canadian Card' 
                    icon={<Icon icon="material-symbols-light:id-card-rounded" color='#505050' className='!text-xl' fontSize={20} />}
                />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <UploadCard 
                    title='Proof of Address' 
                    description='Upload Bill within 30 days' 
                    icon={<Icon icon="mdi:address-marker" color='#505050' className='!text-xl' fontSize={20} />}
                    isUploaded
                />
            </Col>
           
        </Row>
    </Card>
  )
}

export default VerificationSettings