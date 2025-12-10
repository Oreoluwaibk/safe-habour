import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { App, Divider, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { IAdminUserList } from '../../../../utils/interface';


const FormItem = Form.Item;
const Option = Select.Option;
interface props {
    open: boolean;
    onCancel: () => void;
    refresh: () => void;
    isEdit: boolean;
    user?: IAdminUserList
}
const AddAdminUser = ({ onCancel, open, refresh, isEdit, user }: props) => {
    const { modal } = App.useApp();
    const [form] = Form.useForm();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if(user) {
            form.setFieldsValue({
                name: user.fullName,
                email: user.email,
                role: user.roles[0]
            })
        }
    }, [user])

    const handleSubmit = () => {
        form.validateFields()
        .then(value => {
            // setError("");
            // const payload: SuspendUser = {
            //     userId: user.id,
            //     suspensionReason: value.message
            // }
            
            // setLoading(true);
            // suspendAUser(payload)
            // .then(res => {
            //     if(res.status === 200) {
            //         setLoading(false);
            //         console.log(res.data);
            //         modal.success({
            //             title: res.data.message || "User suspended successfully",
            //             onOk: () => {
            //                 form.resetFields();
            //                 onCancel();
            //                 refresh();
            //             }
            //         })
            //     }
            // })
            // .catch(err => {
            //     setLoading(false);
            //     modal.error({
            //         title: `Unable to suspend user`,
            //         content: err?.response
            //             ? createErrorMessage(err.response.data)
            //             : err.message,
            //     });
            // })
        })
        .catch(err => {;
            // setError(err?.errorFields?.[0]?.errors?.[0] || "Enter reason for suspension");
        })
    }
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title={`${isEdit ? "Edit": "Add"} Admin User`}
            description={`Create a new admin user with specific role and permissions`}
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' width={87} onClick={onCancel} />
            <RoundBtn title={isEdit ? "Save Changes" :'Add User'} loading={loading} onClick={handleSubmit} primary width={180} />
        </div>}
        width={700}
        classNames={{ body: "flex flex-col "}}
    >
        <Divider size="small" />
        <Form layout='vertical' form={form}>
            <FormItem 
                name="name" 
                // validateStatus={error ? 'error' : ''} 
                // help={error || ''} 
                label="Name*" rules={[{required: true}]}>
                <Input 
                    placeholder='Enter name' 
                />
            </FormItem>

            <FormItem name="email" 
                // validateStatus={error ? 'error' : ''} 
                // help={error || ''} 
            label="Email*" rules={[{required: true}]}>
                <Input 
                    placeholder='Enter email' 
                />
            </FormItem>

            <FormItem 
                name="role" 
                label="Role*" 
                rules={[{required: true}]}
            >
                <Select placeholder="Select Role">
                    <Option>Super Admin</Option>
                    <Option>Support</Option>
                    <Option>Finance</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
  )
}

export default AddAdminUser