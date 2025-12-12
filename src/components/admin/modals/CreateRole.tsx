import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { App, Checkbox, Divider, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react'
// import { createErrorMessage } from '../../../../utils/errorInstance';
import { IAdminPermissions } from '../../../../utils/interface';
import { createAdminRoles, IRoles, updateAnAdminRoles } from '@/redux/action/admin';
import { createErrorMessage } from '../../../../utils/errorInstance';


const FormItem = Form.Item;
const Option = Select.Option;
interface props {
    open: boolean;
    onCancel: () => void;
    refresh: () => void;
    type: "create" | "edit" | "view" | "delete";
    user?: IRoles;
    permissions: IAdminPermissions[];
}

const CreateRole = ({ onCancel, open, type, user, permissions, refresh }: props) => {
    const { modal } = App.useApp();
    const [form] = Form.useForm();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if(user) {
            form.setFieldsValue({
                name: user.name,
                description: user.description,
                permissionIds: user.permissionIds
            })
        }
    }, [user, form])

    const handleCreate = (value: IRoles) => {
        const payload: IRoles = {
            name: value.name,
            description: value.description,
            permissionIds: value.permissionIds
        }
        setLoading(true);
        createAdminRoles(payload)
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
                    title: `Unable to create admin role`,
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                });
            })
    }

    const handleEdit = (value: IRoles) => {
        const payload: IRoles = {
            name: value.name,
            description: value.description,
            permissionIds: value.permissionIds,
            roleId: value.roleId,
            isActive: type === "delete" ? false : true
        }

        setLoading(true);
        updateAnAdminRoles(user!.id || "", payload)
            .then(res => {
            if(res.status === 200) {
                setLoading(false);
                modal.success({
                    title: res.data.message || "Role edited successfully",
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
                title: `Unable to edit admin role`,
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
            });
        })
    }

    const handleSubmit = () => {
        form.validateFields()
        .then(value => {
            if(type === "edit" || type === "delete") handleEdit(value);
            else handleCreate(value);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const title = type === "create" ? "Create New" : type === "edit" ? "Edit" : type === "delete" ? "Disable User Role" : "View Super Admin Role";
    const description = type === "create" ? "Define a new rolw with specific permissions" : type === "edit" ? "Modify role permission" : "";
    const btnTitle = type === "create" ? "Create Role" : type === "edit" ? "Save Changes" : "Save Changes"
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title={title}
            description={description}
        />}
        footer={type !== "view" && <div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' width={87} onClick={onCancel} />
            <RoundBtn title={btnTitle} loading={loading} onClick={handleSubmit} primary width={180} />
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
            label="Role*" rules={[{required: true}]}>
                <Select placeholder="Select Roles" disabled={type === "view" || type === "delete"}>
                    <Option value="SuperAdmin">Super Admin</Option>
                    <Option value="Support">Support</Option>
                    <Option value="Finance">Finance</Option>
                </Select>
            </FormItem>

            <FormItem name="description" 
                // validateStatus={error ? 'error' : ''} 
                // help={error || ''} 
            label="Description*" rules={[{required: true}]}>
                <Input 
                    placeholder='Enter role description' 
                    disabled={type === "view"|| type === "delete"}
                />
            </FormItem>

            <FormItem 
                name="permissionIds" 
                label="Permissions*" 
                rules={[{required: true}]}
            >
                <Checkbox.Group className='flex flex-col gap-2' disabled={type === "view"|| type === "delete"}>
                    {permissions.map((permission) => (
                        <Checkbox key={permission.id} value={permission.id}>{permission.key}</Checkbox>
                    ))}
                </Checkbox.Group>
            </FormItem>
        </Form>
    </Modal>
  )
}

export default CreateRole