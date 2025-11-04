import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { PlusOutlined } from '@ant-design/icons';
import { App, Button, Col, Form, Modal, Row, Switch, TimePicker } from 'antd'
import React, { useCallback, useState } from 'react'
import { GroupedSchedule } from '../../../../utils/converters';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { updateSchedule } from '@/redux/action/schedules';
import { schedule } from '../../../../utils/interface';
import { dayOfWeek } from '../../../../utils/savedInfo';
import dayjs from 'dayjs';

interface props {
    open: boolean;
    onCancel: () => void;
    days: GroupedSchedule;
    refresh: () => void;
}
const FormItem = Form.Item;
const EditSchdedule = ({ open, onCancel, days, refresh }: props) => {
    const [form] = Form.useForm();
    const [ isAvailable, setIsAvailable ] = useState(days.isAvailable[0]);
    const { modal, message } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ payLoad, setPayload ] = useState<schedule>({
        dayOfWeek: null,
        startTime: days.startTime[0],
        endTime: days.endTime[0],
        isAvailable: false,
        notes: "",
        scheduleDate: ""
    });
    const [ startTime, setStartTime ] = useState<dayjs.Dayjs | null>(null);
    const [ endTime, setEndTime ] = useState<dayjs.Dayjs | null>(null);
    const [error, setError] = useState("");

    const handleUpdateSechedule = () => { 
        const payload: schedule = {
            ...payLoad,
            isAvailable: isAvailable,
            scheduleDate: days.scheduleDate[0],
            dayOfWeek: dayOfWeek.findIndex(day => day.name === days.dayOfWeek)
        } 

        if(!days.id[0]) return;
        setLoading(true);
        updateSchedule(days.id[0]!, payload)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                form.resetFields();
                message.success("Day has been updated successfully!");
                const updatedDate = res.data.data;
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

    const handleSetStart = (date: any, dateString: string | string[]) => {
        setStartTime(date);
        setPayload(prev => ({...prev, startTime: dateString.toString()}))
    }

    const handleSetEnd = useCallback((date: any, dateString: string | string[]) => {
        if (startTime && date.isBefore(startTime)) {
            setError("End time cannot be earlier than start time");
        } else {
            setError("");
            setEndTime(date);
            setPayload(prev => ({...prev, endTime: dateString.toString()}))
        }
    }, [startTime]);

  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title={`Edit ${days.dayOfWeek} Schedule`}
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' onClick={onCancel} width={86} height={40}  />
            <RoundBtn title='Save Changes' loading={loading} primary onClick={handleUpdateSechedule} width={138} height={40}  />
        </div>}
        width={700}
    >
        <div>
            <div className='flex items-center gap-2 mt-4'>
                <Switch checked={isAvailable} onChange={(e) => setIsAvailable(e)} title={`Available on ${days.dayOfWeek}`} />
                <p className='text-lg text-[#151F32]'>Available on {days.dayOfWeek}</p>
            </div>
                
            {/* </Switch> */}
            {isAvailable && <div className='flex flex-col gap-4 mt-6'>
                <p className='text-[#3E3E3E]'>Add Time Slot</p>

                <div>
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
                                <FormItem label="">
                                    <Button  className='w-full !h-[42px] !border-[#C7C7C7] rounded-[5px]' icon={<PlusOutlined />}>Add Time Slot</Button>
                                </FormItem> 
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>}
        </div>
    </Modal>
  )
}

export default EditSchdedule