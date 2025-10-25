import CardTitle from '@/components/general/CardTitle';
import { App, Form, Input, InputNumber, Modal } from 'antd';
import React, { useState } from 'react'
import { jobs } from '../../../../utils/interface';
import RoundBtn from '@/components/general/RoundBtn';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { applyForAJob } from '@/redux/action/jobs';

interface props {
    open: boolean;
    onCancel: () => void;
    job: jobs
}
const FormItem = Form.Item;
const ApplyJob = ({ open, onCancel, job }: props) => {
    const { modal } = App.useApp();
    const [form] = Form.useForm();
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleApplyForJob = () => {
        form.validateFields()
        .then(values => {
            // setLoading(true);
            console.log("values", values);
            
            const payload = {
                jobId: job.id!,
                ...values
            }

            setLoading(true);
            applyForAJob(payload)
            .then(res => {
                if(res.status === 200 || res.status === 201){
                    setLoading(false);
                    modal.success({
                        title: res.data.message,
                        onOk: () => {
                            form.resetFields();
                            onCancel()
                        }
                    })
                }
            })
            .catch((err) => {
                modal.error({
                    title: "Unable to apply for this job",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false),
                });
            });
        })
        .catch(err => {console.log("err", err)})
        
    }

  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title="Apply for this Job"
            description={`Applying for: ${job.jobTitle}`}
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' onClick={onCancel} width={86} height={40}  />
            <RoundBtn title='Submit Application'  loading={loading} primary onClick={handleApplyForJob} width={160} height={40}  />
        </div>}
        width={700}
    >
        <Form form={form} layout="vertical">
            <FormItem rules={[{required: true}]} label="proposedcRate" name="proposedRate" initialValue={job.budget}>
                <InputNumber style={{width: "100%"}} />
            </FormItem> 

            <FormItem rules={[{required: true}]} label="Message to client" name="message">
                <Input.TextArea placeholder="Tell client why you're perfect for this job..." rows={3} style={{width: "100%"}} />
            </FormItem> 
        </Form>
    </Modal>
  )
}

export default ApplyJob