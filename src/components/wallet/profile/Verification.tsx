import CardTitle from '@/components/general/CardTitle'
import { Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import VerificationUpload from '../cards/VerificationUpload'
import { RcFile } from 'antd/es/upload'
import { IUser } from '../../../../utils/interface'
// import { getVerifiedDocuments } from '@/redux/action/auth'
// import { createErrorMessage } from '../../../../utils/errorInstance'

interface props {
    authentication: IUser;
    handleGetAuthentication: () => void;
    authLoading: boolean;
}
const Verification = ({ authentication }: props) => {
    const [ loading ] = useState(false);
    const [ policeReport, setPoliceReport ] = useState<RcFile | null>(null);
    const [ sectorCheck, setSectorCheck ] = useState<RcFile | null>(null);

    // const handleGetVerifyDocs = useCallback(() => {
    //     setLoading(true);
    //     getVerifiedDocuments()
    //     .then(res => {
    //         if(res.status === 200) {
    //             setLoading(false);
    //             console.log("res", res.data)
    //         }
    //     })
    //     .catch(err => {
    //         modal.error({
    //             title: "Unable to get documents",
    //             content: err?.response
    //             ? createErrorMessage(err.response.data)
    //             : err.message,
    //         });
    //     })
    // }, [modal]);

    
  return (
       <Card
        title={<CardTitle title='Document Verification'  description="Upload required documents to maintain your verified status. Documents are securely stored and reviewed by our team."/>}
        classNames={{
            header: "",
            body: "flex flex-col gap-6"
        }}
        className='!mt-6'
        loading={loading}
    >
        <Row>
            <Col lg={24} sm={24} xs={24}>
                <VerificationUpload  
                    title='Police Background Check'
                    description='Current police background check report'
                    approved={authentication.isIdentityDocumentApproved}
                    isUploaded={authentication.hasIdentificationDocument}
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
                    approved={authentication.isIdentityDocumentApproved}
                    isUploaded={authentication.hasIdentificationDocument}
                    setValue={setSectorCheck}
                    type={2}
                />
            </Col>
        </Row>
    </Card>
  )
}

export default Verification