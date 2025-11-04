import CardTitle from '@/components/general/CardTitle'
import { Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import VerificationUpload from '../cards/VerificationUpload'
import { RcFile } from 'antd/es/upload'
import { IUser } from '../../../../utils/interface'

interface props {
    authentication: IUser;
    handleGetAuthentication: () => void;
    authLoading: boolean;
}
const Verification = ({ authentication }: props) => {
    const [ policeReport, setPoliceReport ] = useState<RcFile | null>(null);
    const [ sectorCheck, setSectorCheck ] = useState<RcFile | null>(null);
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
                    approved={authentication.hasIdentificationDocument}
                    value={policeReport}
                    setValue={setPoliceReport}
                    type={1}
                />
            </Col>

            <Col lg={24} sm={24} xs={24}>
                <VerificationUpload  
                    title='Vulnerable Sector Check'
                    description='Child/Adult abuse screening report'
                    value={sectorCheck}
                    approved={authentication.hasIdentificationDocument}
                    setValue={setSectorCheck}
                    type={2}
                />
            </Col>
        </Row>
    </Card>
  )
}

export default Verification