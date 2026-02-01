import CheckCard from '@/components/client/cards/CheckCard';
import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { useServiceCategory } from '@/hooks/useServiceCategory';
import { activateDeactivateServices, deleteServicesCategory, getAllServices } from '@/redux/action/superAdmin';
import { PlusOutlined } from '@ant-design/icons';
import { App, Card, Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { IAdminServiceCategory } from '../../../../utils/interface';
import ServiceModal from '../modals/ServiceModal';

const ServiceCategory = () => {
    const { modal, message } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ updateLoading, setUpdateLoading ] = useState(false);
    const [ deleteLoading, setDeleteLoading ] = useState(false);
    const [ selected, setSelected ] = useState<number>(0);
    const [ selectedCategory, setSelectedCategory ] = useState<IAdminServiceCategory | null>(null);
    const [ categories, setCategories ] = useState<IAdminServiceCategory[]>([]);
    const [ openModal, setOpenModal ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);

    const handleGetAllServices = useCallback(() => {
        setLoading(true);
        getAllServices()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setCategories(res.data.data);
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: `Unable to get categories`,
                content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, []);

    const handleSilentGetServices = useCallback(() => {
        getAllServices()
        .then(res => {
            if(res.status === 200) {
                setCategories(res.data.data);
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: `Unable to get categories`,
                content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, []);

    const handleUpdateService = (id: number) => {
        setUpdateLoading(true);
        activateDeactivateServices(id)
        .then(res => {
            if(res.status === 200 || res.status === 204) {
                message.success("Category updated successfully")
                setUpdateLoading(false);
                handleSilentGetServices();
                // setCategories(res.data.data);
            }
        })
        .catch(err => {
            setUpdateLoading(false);
            modal.error({
                title: `Unable to get categories`,
                content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }

    const handleDeleteService = (id: number) => {
        setDeleteLoading(true);
        deleteServicesCategory(id)
        .then(res => {
            if(res.status === 200 || res.status === 204) {
                message.success("Category delete successfully")
                setDeleteLoading(false);
                handleSilentGetServices();
                // setCategories(res.data.data);
            }
        })
        .catch(err => {
            setDeleteLoading(false);
            modal.error({
                title: `Unable to delete category`,
                content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }

    useEffect(() => {
        handleGetAllServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <Card 
        title={<CardTitle title='Service Categories' description="Manage available service categories on the platform"   />}
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "" }}
        loading={loading}
        extra={
        <RoundBtn onClick={() => {
            setIsEdit(false);
            setOpenModal(true);
        }} title='Add New Category' icon={<PlusOutlined />} width={167} />}
    >
        <Row gutter={[5, 5]} className='py-6'>
            {categories.map((category, i: number) => (
                <Col lg={24} sm={24} xs={24} key={i}>
                    <CheckCard 
                        title={category.name} 
                        description=""
                        loading={selected === category.id && updateLoading}
                        onClick={() => {
                            setSelected(category.id);
                            handleUpdateService(category.id)
                        }}
                        isEdit={() => {
                            setSelectedCategory(category)
                            setIsEdit(true);
                            setOpenModal(true)
                        }}
                        deleteLoading={deleteLoading && selected === category.id}
                        isDelete={() => {
                            setSelected(category.id)
                            handleDeleteService(category.id);
                        }}
                        value={category.isActive}
                    />
                </Col>
            ))}
        </Row>

        {openModal && (
            <ServiceModal 
                onCancel={() =>setOpenModal(false)}
                open={openModal}
                selected={selectedCategory}
                isEdit={isEdit}
                refresh={handleSilentGetServices}
            />
        )}
    </Card>
  )
}

export default ServiceCategory