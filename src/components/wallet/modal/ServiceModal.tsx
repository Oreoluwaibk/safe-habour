import RoundBtn from '@/components/general/RoundBtn';
import { App, Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { categoryType, IServiceDetail } from '../../../../utils/interface';
import { updateServiceWorkerRate } from '@/redux/action/serviceWorker';
import { createErrorMessage } from '../../../../utils/errorInstance';

interface props {
    open: boolean;
    onCancel: () => void;
    isEdit?: boolean;
    categories: categoryType[];
    selected: IServiceDetail | null;
    refresh: () => void;
}
const FormItem = Form.Item;
const Option = Select.Option;
const ServiceModal = ({ 
    onCancel, 
    open, 
    isEdit,
    categories,
    selected,
    refresh 
}: props) => {
    const [form] = Form.useForm();
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ serviceName, setServiceName ] = useState(selected && categories[selected?.serviceCategoryId]?.name || "")

    useEffect(() => {
        if(isEdit && selected && categories.length > 0) 
            setServiceName(categories[selected?.serviceCategoryId]?.name)
            form.setFieldsValue({
                serviceCategoryId: selected && categories[selected?.serviceCategoryId]?.name || "",
                hourlyRate: selected && selected?.hourlyRate || 1,
                yearsOfExperience: selected && selected?.yearsOfExperience || 1
            })
    }, [isEdit, selected, categories, form])
    const handleSubmit = () => {
        if(isEdit) handleEdit()
        else handleCreate()
    }

    const handleCreate = () => {
        form.validateFields()
        .then(value => {
            setLoading(true);
            updateServiceWorkerRate(value)
            .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                    modal.success({
                        title: "Service rate created successfully",
                        onOk: () => {
                            setLoading(false);
                            refresh();
                            onCancel();
                        }
                    })
                    
                }
            })
            .catch(err => {
                modal.error({
                    title: "Unable to create service rate",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false)
                });
            })
        })
    }

    const handleEdit = () => {
        form.validateFields()
        .then(value => {
            const payload = {
                ...value,
                serviceCategoryId: selected && selected?.serviceCategoryId.toString() || ""
            }
            setLoading(true);
            updateServiceWorkerRate(payload)
            .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                    modal.success({
                        title: "Service rate updated successfully",
                        onOk: () => {
                            setLoading(false);
                            refresh();
                            onCancel();
                        }
                    })
                    
                }
            })
            .catch(err => {
                modal.error({
                    title: "Unable to update service rate",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false)
                });
            })
        })
    }
     
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        title={<p>{isEdit ? "Edit Service" : "Add New Service"}</p>}
        footer={<div className='flex justify-end items-center gap-4'>
            <RoundBtn width={86} title="Cancel" onClick={onCancel} />
            <RoundBtn loading={loading} width={136} title={isEdit ? "Save" : "Add Service"} primary onClick={handleSubmit} />
        </div>}
        // classNames={{ bod}}
        className='py-12'
    >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {isEdit && <FormItem name="serviceCategoryId" label="Service Name" rules={[{required: true}]}>
                <Input placeholder='e.g., Pet Care' disabled value={serviceName} />
            </FormItem>}

            {!isEdit && <FormItem name="serviceCategoryId" label="Service Name" rules={[{required: true}]}>
                <Select placeholder='e.g., Pet Care' style={{height: 52}}>
                {categories.map((Category, i: number) => (
                    <Option value={Category.id} key={i}>{Category.name}</Option>
                ))}
                </Select>
            </FormItem>}

            <FormItem name="hourlyRate" label="Hourly Rate ($)" rules={[{required: true}]}>
                <InputNumber min={1} style={{ width: "100%"}} placeholder='25' />
            </FormItem>

            <FormItem name="yearsOfExperience" label="Experience" rules={[{required: true}]}>
                <InputNumber style={{ width: "100%"}} min={1} placeholder='e.g., 3 years' />
            </FormItem>
        </Form>
    </Modal>
  )
}

export default ServiceModal