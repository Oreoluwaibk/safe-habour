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

const MAX_WORDS = 1000;

function countWords(text?: string) {
  if (!text) return 0;
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}
const FormItem = Form.Item;
const ApplyJob = ({ open, onCancel, job }: props) => {
    const { modal } = App.useApp();
    const [form] = Form.useForm();
    const [ loading, setLoading ] = useState(false);
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState<string | null>(null);


    const handleApplyForJob = () => {
        form.validateFields()
        .then(values => {
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const raw = e.target.value;
  const words = raw.trim().split(/\s+/);

  if (words.length > MAX_WORDS) {
    const truncated = words.slice(0, MAX_WORDS).join(" ");
    setMessage(truncated);
    form.setFieldsValue({ message: truncated });
    setError(`Message cannot exceed ${MAX_WORDS} words`);
  } else {
    setMessage(raw);
    setError(null);
    form.setFieldsValue({ message: raw });
  }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const paste = e.clipboardData.getData("text");
    const combined = (message + " " + paste).trim();
    const words = combined.split(/\s+/);

    if (words.length > MAX_WORDS) {
        e.preventDefault();
        const truncated = words.slice(0, MAX_WORDS).join(" ");
        setMessage(truncated);
        form.setFieldsValue({ message: truncated });
        setError(`Message cannot exceed ${MAX_WORDS} words`);
    }
    };
    
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
            <FormItem rules={[{required: true}]} label="Proposed Rate" name="proposedRate" initialValue={job.budget}>
                <InputNumber style={{width: "100%"}} />
            </FormItem> 
            <Form.Item
            label="Message to client"
            name="message"
            validateStatus={error ? "error" : ""}
            help={error || ""}
            rules={[
                { required: true, message: "Please enter your message" },
                {
                validator: (_, value: string) => {
                    if (countWords(value) > MAX_WORDS) {
                    return Promise.reject(
                        new Error(`Message cannot exceed ${MAX_WORDS} words`)
                    );
                    }
                    return Promise.resolve();
                },
                },
            ]}
            >
            <Input.TextArea
                value={message}
                placeholder="Tell client why you're perfect for this job..."
                rows={6}
                onChange={handleChange}
                onPaste={handlePaste}
            />
            </Form.Item>

            <div style={{ marginBottom: 12, textAlign: "right", color: "#666" }}>
            {countWords(message)} / {MAX_WORDS} words
            </div>
        </Form>
    </Modal>
  )
}

export default ApplyJob