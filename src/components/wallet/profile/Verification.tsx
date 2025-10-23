import CardTitle from '@/components/general/CardTitle'
import { Card, Col, Row } from 'antd'
import React from 'react'
import VerificationUpload from '../cards/VerificationUpload'

const Verification = () => {
  return (
       <Card
        title={<CardTitle title='Document Verification'  description="Upload required documents to maintain your verified status. Documents are securely stored and reviewed by our team."/>}
        classNames={{
            header: "",
            body: "flex flex-col gap-6"
        }}
        className='!mt-6'
    >
        <Row>
            <Col lg={24} sm={24} xs={24}>
                <VerificationUpload  
                    title='Police Background Check'
                    description='Current police background check report'
                    approved
                />
            </Col>

            <Col lg={24} sm={24} xs={24}>
                <VerificationUpload  
                    title='Vulnerable Sector Check'
                    description='Child/Adult abuse screening report'
                />
            </Col>
        </Row>
    </Card>
  )
}

export default Verification