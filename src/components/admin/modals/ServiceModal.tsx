import RoundBtn from '@/components/general/RoundBtn';
import { App, Form, Input, InputNumber, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { categoryType, IAdminServiceCategory, IServiceDetail } from '../../../../utils/interface';
import { updateServiceWorkerRate } from '@/redux/action/serviceWorker';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { useAuthentication } from '@/hooks/useAuthentication';
import CardTitle from '@/components/general/CardTitle';
import { createServiceCategory, editServiceCategory } from '@/redux/action/superAdmin';

interface props {
    open: boolean;
    onCancel: () => void;
    isEdit?: boolean;
    selected: IAdminServiceCategory | null;
    refresh: () => void;
}
const FormItem = Form.Item;
const Option = Select.Option;
const ServiceModal = ({ 
    onCancel, 
    open, 
    isEdit,
    selected,
    refresh 
}: props) => {
    const [form] = Form.useForm();
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    
    useEffect(() => {
        if(isEdit && selected) 
            form.setFieldsValue({
                name: selected && selected.name || "",
                commisionRate: selected && selected?.commisionRate || 1,
                description: selected && selected?.description || ""
            })
    }, [isEdit, selected, form])
    const handleSubmit = () => {
        if(isEdit) handleEdit()
        else handleCreate()
    }

    const handleCreate = () => {
        form.validateFields()
        .then(value => {
            setLoading(true);
            createServiceCategory(value)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    setLoading(false);
                    modal.success({
                        title: "Service created successfully",
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
            setLoading(true);
            const id = selected && selected.id || ""
            editServiceCategory(id, value)
            .then(res => {
                if(res.status === 200 || res.status === 204) {
                    setLoading(false);
                    modal.success({
                        title: "Service category updated successfully",
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
        title={<CardTitle title={<p>{isEdit ? "Edit Category" : "Add New Category"}</p>} description={<p>{isEdit ? "Edit this service Category" : "Create a New Service Category for the platform"}</p>} />}
        footer={<div className='flex justify-end items-center gap-4'>
            <RoundBtn width={86} title="Cancel" onClick={onCancel} />
            <RoundBtn loading={loading} width={136} title={isEdit ? "Save" : "Add Service"} primary onClick={handleSubmit} />
        </div>}
        // classNames={{ bod}}
        className='py-12'
    >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <FormItem name="name" label="Service Name" rules={[{required: true}]}>
                <Input placeholder='e.g., Care Worker' />
            </FormItem>

            <FormItem name="commisionRate" label="Commission" rules={[{required: true}]}>
                <InputNumber min={1} style={{ width: "100%"}} placeholder='25' />
            </FormItem>

            <FormItem name="description" label="Description" rules={[{required: true}]}>
                <Input.TextArea style={{ width: "100%"}} rows={4} placeholder='Description' />
            </FormItem>
        </Form>
    </Modal>
  )
}

export default ServiceModal