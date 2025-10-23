import CardTitle from '@/components/general/CardTitle'
import { Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import ServiceInfoCard from '../cards/ServiceInfoCard'
import RoundBtn from '@/components/general/RoundBtn'
import { PlusOutlined } from '@ant-design/icons'
import ServiceModal from '../modal/ServiceModal'

const ServicesInfo = () => {
    const [ openAddModal,setOpenAddModal ] = useState(false);
  return (
    <Card
        title={<CardTitle title='Services & Hourly Rates' />}
        classNames={{
            header: "",
            body: "flex flex-col gap-6"
        }}
        className='!mt-6'
        extra={<RoundBtn title='Add Services' onClick={() => setOpenAddModal(true)} icon={<PlusOutlined />} />}
    >
            <Row>
                <Col lg={24} sm={24} xs={24}>
                    <ServiceInfoCard  
                        title='Elder Care'
                        description='2 years experience'
                        rate='$28/hour'
                    />
                </Col>
            </Row>

        {openAddModal && <ServiceModal open={openAddModal} onCancel={() => setOpenAddModal(false)} />}
    </Card>
  )
}

export default ServicesInfo