import CheckCard from '@/components/client/cards/CheckCard';
import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { useServiceCategory } from '@/hooks/useServiceCategory';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { useState } from 'react'

const ServiceCategory = () => {
    const [ loading, setLoading ] = useState(false);
    const { categories } = useServiceCategory();
  return (
    <Card 
        title={<CardTitle title='Service Categories' description="Manage available service categories on the platform"   />}
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "" }}
        loading={loading}
        extra={
        <RoundBtn onClick={() => {}} title='Add New Category' icon={<PlusOutlined />} width={167} />}
    >
        <Row gutter={[5, 5]} className='py-6'>
            {categories.map((category, i: number) => (
                <Col lg={24} sm={24} xs={24} key={i}>
                    <CheckCard 
                        title={category.name} 
                        description=""
                        // loading={selected === notification.notificationType && updateLoading}
                        onClick={() => {
                            // setSelected(notification.notificationType);
                            // handleUpdateSettings(!notification.inAppNotificationEnabled, notification.notificationType)
                        }}
                        isEdit={() => {}}
                        value={true}
                    />
                </Col>
            ))}
        </Row>
    </Card>
  )
}

export default ServiceCategory