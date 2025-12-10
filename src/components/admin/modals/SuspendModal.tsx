import React, { useState } from 'react'
import { IAdminUserList } from '../../../../utils/interface';
import { App, Divider, Form, Input, Modal } from 'antd';
import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { suspendAUser, SuspendUser, unSuspendAUser, UnSuspendUser } from '@/redux/action/admin';
import { createErrorMessage } from '../../../../utils/errorInstance';

const FormItem = Form.Item;
interface props {
    open: boolean;
    onCancel: () => void;
    user: IAdminUserList;
    refresh: () => void;
}
const SuspendModal = ({ onCancel, open, user, refresh }: props) => {
    const [form] = Form.useForm();
    const [error, setError] = useState('');
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);

    const handleSuspend = () => {
        form.validateFields()
        .then(value => {
            setError("");
            const payload: SuspendUser = {
                userId: user.id,
                suspensionReason: value.message
            }
            
            setLoading(true);
            suspendAUser(payload)
            .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                    modal.success({
                        title: res.data.message || "User suspended successfully",
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
                    title: `Unable to suspend user`,
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                });
            })
        })
        .catch(err => {;
            setError(err?.errorFields?.[0]?.errors?.[0] || "Enter reason for suspension");
        })
    }

    const handleUnSuspend = () => {
        form.validateFields()
        .then(value => {
            setError("");
            const payload: UnSuspendUser = {
                userId: user.id,
                reason: value.message
            }
            
            setLoading(true);
            unSuspendAUser(payload)
            .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                    modal.success({
                        title: res.data.message || "User unsuspended successfully",
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
                    title: `Unable to unsuspend user`,
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                });
            })
        })
        .catch(err => {;
            setError(err?.errorFields?.[0]?.errors?.[0] || "Enter reason for suspension");
        })
    }

    const handleSubmit = () => {
        if(user.isActive) handleSuspend();
        else handleUnSuspend();
    }
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title={user.isActive ? "Suspend User": "Unsuspend User"}
            description={`You are about to ${user.isActive ? "suspend" :"unsuspend"} ${user.fullName}. Please provide a reason for this action.`}
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' width={87} onClick={onCancel} />
            <RoundBtn title={user.isActive ? 'Suspend Account' : "Unsuspend Account"} loading={loading} onClick={handleSubmit} primary width={180} />
        </div>}
        width={700}
        classNames={{ body: "flex flex-col gap-4"}}
    >
        <Divider size="small" />
        <Form layout='vertical' form={form}>
            <FormItem name="message" validateStatus={error ? 'error' : ''} help={error || ''} label={`Reason for ${user.isActive ?"suspension*" : "unsuspension*"}`} rules={[{required: true}]}>
                <Input.TextArea 
                    rows={4} 
                    placeholder={`Enter the reason for ${user.isActive ? "suspending": "unsuspending"} this account...`}
                />
            </FormItem>
        </Form>
    </Modal>
  )
}

export default SuspendModal