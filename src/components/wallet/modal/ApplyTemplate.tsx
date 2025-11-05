import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { App, Card, Col, Form, Modal, Row, TimePicker } from 'antd';
import React, { useCallback, useState } from 'react'
import { GroupedSchedule } from '../../../../utils/converters';
import { schedule } from '../../../../utils/interface';
import dayjs from 'dayjs';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { updateBulkSchedule } from '@/redux/action/schedules';
import { dayOfWeek } from '../../../../utils/savedInfo';


interface props {
    open: boolean;
    onCancel: () => void;
    allSchedule: schedule[];
    refresh: () => void;
    avaliableDays: GroupedSchedule[];
}
const FormItem = Form.Item;
const ApplyTemplate = ({ open, onCancel, allSchedule, avaliableDays, refresh }: props) => {
    const [form] = Form.useForm();
    const { modal, message } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ startTime, setStartTime ] = useState<dayjs.Dayjs | null>(null);
    const [ endTime, setEndTime ] = useState<dayjs.Dayjs | null>(null);
    const [ error, setError ] = useState("");
    const [ time, setTime ] = useState({
        startTime: "",
        endTime: ""
    })
    const [ payLoad ] = useState<schedule[]>(allSchedule);

    const handleUpdateSechedule = () => { 
        if(!time.startTime) return message.error("Set the start time to continue!");
        if(!time.endTime) return message.error("Set the end time to continue!");

        payLoad.map(data => {
            data.startTime = time.startTime;
            data.endTime = time.endTime;
            data.dayOfWeek = dayOfWeek.findIndex(day => day.name === data.dayOfWeek);
            return data;
        })
    
        setLoading(true);
        updateBulkSchedule(payLoad)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                form.resetFields();
                message.success(res.data.message || "Template has been applied successfully!");
                refresh();
                onCancel();
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: "Unable to set schedule",
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        })
    }
    
    const handleSetStart = (date: dayjs.Dayjs, dateString: string | string[]) => {
        setStartTime(date);
        setTime(prev => ({...prev, startTime: dateString.toString()}))
    }
    
    const handleSetEnd = useCallback((date: dayjs.Dayjs, dateString: string | string[]) => {
        if (startTime && date.isBefore(startTime)) {
            setError("End time cannot be earlier than start time");
        } else {
            setError("");
            setEndTime(date);
            setTime(prev => ({...prev, endTime: dateString.toString()}))
        }
    }, [startTime]);
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title="Apply Weekly Template"
            description="Apply your current weekly template to a specific date range. This will overwrite any existing availability for those dates."
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' onClick={onCancel} width={86} height={40}  />
            <RoundBtn loading={loading} title='Apply Template' primary onClick={handleUpdateSechedule} width={138} height={40}  />
        </div>}
        width={700}
    >
        <Form form={form} layout="vertical">
            <Row gutter={[10, 0]}>
                 <Col lg={12} sm={12} xs={24}>
                    <FormItem label="From" name="startTime">
                        <TimePicker 
                            style={{width: "100%"}}
                            onChange={handleSetStart}
                            value={startTime}
                            format="HH:mm" 
                        />
                    </FormItem> 
                </Col>

                <Col lg={12} sm={12} xs={24}>
                    <FormItem 
                        validateStatus={error ? "error" : ""}
                        help={error || ""}
                        label="To"
                        rules={[
                            {
                            validator(_, value) {
                                const start = form.getFieldValue('startTime');
                                if (!value || !start) {
                                    return Promise.resolve();
                                }
                                if (value.isBefore(start)) {
                                return Promise.reject(new Error('End time cannot be before start time'));
                                }
                                return Promise.resolve();
                            },
                            },
                        ]}
                    >
                        <TimePicker 
                            style={{width: "100%"}} 
                            onChange={handleSetEnd}
                            format="HH:mm"
                            value={endTime}
                            // use12Hours
                        />
                    </FormItem> 
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <Card title="Current Template Review">
                        <Card classNames={{ body: "text-[#3E3E3E] flex flex-col gap-4 !py-1"}}>
                            {avaliableDays.map((days: GroupedSchedule, i: number) => (
                                <div className='flex items-center justify-between' key={i}>
                                    <p>{days.dayOfWeek}</p>
                                    {days.startTime.map((time: string,i:number) => (
                                        <p key={i}>{time} - {days.endTime[i]}</p>
                                    ))}
                                </div>
                            ))}
                        </Card>
                    </Card>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default ApplyTemplate