import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { App, Divider, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react'
// import { createErrorMessage } from '../../../../utils/errorInstance';
import { IAdminUserList } from '../../../../utils/interface';
import { createAdminUser, editAnAdminUser, IAdminCreateUser, IRoles } from '@/redux/action/admin';
import { createErrorMessage } from '../../../../utils/errorInstance';


const FormItem = Form.Item;
const Option = Select.Option;
interface props {
    open: boolean;
    onCancel: () => void;
    refresh: () => void;
    isEdit: boolean;
    user?: IAdminUserList;
    roles: IRoles[]
}
const AddAdminUser = ({ onCancel, open, isEdit, user, refresh, roles }: props) => {
    const { modal } = App.useApp();
    const [form] = Form.useForm();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if(user) {
            form.setFieldsValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles[0]
            })
        }
    }, [user, form]);

    const handleCreate = (value: IAdminCreateUser) => {
        const payload: IAdminCreateUser = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            roleId: value.roleId
        }
        setLoading(true);
        createAdminUser(payload)
         .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                    modal.success({
                        title: res.data.message || "User created successfully",
                        onOk: () => {
                            form.resetFields();
                            onCancel();
                            refresh();
                        }
                    })
                }
            })
            .catch(err => {
                setLoading(false);
                modal.error({
                    title: `Unable to create admin user`,
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                });
            })
    }

    const handleEdit = (value: IAdminCreateUser) => {
        const payload: IAdminCreateUser = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            roleId: value.roleId,
            userId: user?.id!,
            isActive: true
        }

        setLoading(true);
        editAnAdminUser(user?.id!, payload)
         .then(res => {
            if(res.status === 200) {
                setLoading(false);
                modal.success({
                    title: res.data.message || "User edited successfully",
                    onOk: () => {
                        form.resetFields();
                        onCancel();
                        refresh();
                    }
                })
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: `Unable to edit admin user`,
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
            });
        })
    }

    const handleSubmit = () => {
        form.validateFields()
        .then(value => {
            if(isEdit) handleEdit(value);
            else handleCreate(value);
        })
        .catch(err => {
            console.log(err)
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
                name="firstName" 
                // validateStatus={error ? 'error' : ''} 
                // help={error || ''} 
                label="First Name*" rules={[{required: true}]}>
                <Input 
                    placeholder='Enter name' 
                />
            </FormItem>

            <FormItem 
                name="lastName" 
                // validateStatus={error ? 'error' : ''} 
                // help={error || ''} 
                label="Last Name*" rules={[{required: true}]}>
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
                name="roleId" 
                label="Role*" 
                rules={[{required: true}]}
            >
                <Select placeholder="Select Role">
                    {roles.map((role, i) => (
                        <Option key={i} value={role.id || role}>{role.name}</Option>
                    ))}
                </Select>
            </FormItem>
        </Form>
    </Modal>
  )
}

export default AddAdminUser