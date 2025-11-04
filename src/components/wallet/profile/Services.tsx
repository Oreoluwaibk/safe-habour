import CardTitle from '@/components/general/CardTitle'
import { App, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import ServiceInfoCard from '../cards/ServiceInfoCard'
import RoundBtn from '@/components/general/RoundBtn'
import { PlusOutlined } from '@ant-design/icons'
import ServiceModal from '../modal/ServiceModal'
import { categoryType, IServiceDetail, IUser } from '../../../../utils/interface'

interface props {
    authentication: IUser;
    handleGetAuthentication: () => void;
    categories: categoryType[];
    serviceLoading: boolean;
    authLoading: boolean;
}
const ServicesInfo = ({ 
    authentication, 
    handleGetAuthentication, 
    categories,
    serviceLoading,
    authLoading 
}: props) => {
    const [ openAddModal,setOpenAddModal ] = useState(false);
    const [ selected, setSelected ] = useState<IServiceDetail | null>(null);
  return (
    <Card
        title={<CardTitle title='Services & Hourly Rates' />}
        classNames={{
            header: "",
            body: "flex flex-col gap-6"
        }}
        loading={serviceLoading || authLoading}
        className='!mt-6'
        extra={<RoundBtn title='Add Services' onClick={() => setOpenAddModal(true)} icon={<PlusOutlined />} />}
    >
            <Row gutter={[15, 15]}>
                {authentication?.services.map((service,i:number) => (
                    <Col lg={24} sm={24} xs={24} key={i}>
                        <ServiceInfoCard  
                            title={categories[service?.serviceCategoryId]?.name}
                            description={`${service.yearsOfExperience || 0} years experience`}
                            rate={`$${service.hourlyRate || 0}/hour`}
                            service={service}
                            categories={categories}
                            refresh={handleGetAuthentication}
                        />
                    </Col>
                    // <Status size={12} title={categories[service?.serviceCategoryId]?.name} bg='#F6F6F6' color='#343434' />
                ))}
            </Row>

        {openAddModal && 
            <ServiceModal 
                open={openAddModal} 
                onCancel={() => setOpenAddModal(false)} 
                categories={categories}
                selected={selected}
                refresh={handleGetAuthentication}
            />}
    </Card>
  )
}

export default ServicesInfo