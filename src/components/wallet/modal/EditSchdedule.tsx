import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Button, Col, Form, Modal, Row, Switch, TimePicker } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { GroupedSchedule } from '../../../../utils/converters';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { deleteSchedule, saveSchedule, updateBulkSchedule, updateSchedule } from '@/redux/action/schedules';
import { Schedule, schedule } from '../../../../utils/interface';
import { dayOfWeek } from '../../../../utils/savedInfo';
import dayjs from 'dayjs';


interface props {
    open: boolean;
    onCancel: () => void;
    day: string;
    // days: GroupedSchedule;
    refresh: () => void;
    schedule: Schedule[];
    isAvailable: boolean;
}
const FormItem = Form.Item;
const EditSchdedule = ({ open, onCancel, refresh, day, schedule, isAvailable }: props) => {
    const [form] = Form.useForm();
    const { modal, message } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ payLoad, setPayload ] = useState<schedule>({
        dayOfWeek: day,
        startTime: "",
        endTime: "",
        isAvailable: false,
        notes: "",
        scheduleDate: ""
    });
    const [ startTime, setStartTime ] = useState<dayjs.Dayjs | null | string>(null);
    const [ endTime, setEndTime ] = useState<dayjs.Dayjs | null | string>(null);
    const [error, setError] = useState("");
    const [ timeSlots, setTimeSlots ] = useState<Schedule[]>([]);
    const [ deleteLoading, setDeleteLoading ] = useState(false);
    const [ selected, setSelected ] = useState<number|null>(null);
    const [ saveLoading, setSaveLoading ] = useState(false);
    const [ updateLoading, setUpdateLoading ] = useState(false);
    const [ available, setAvailable ] = useState(false);

    useEffect(() => {
        if(schedule) setTimeSlots(schedule)
    }, [schedule])

    useEffect(() => {
        setAvailable(isAvailable);
    }, [isAvailable])

    const handleUpdateSechedule = () => { 
        const payload: schedule = {
            ...payLoad,
            isAvailable: false,
            scheduleDate: "",
            dayOfWeek: day
        } 

        if(!day) return;
        setLoading(true);
        updateSchedule("kk", payload)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                form.resetFields();
                message.success("Day has been updated successfully!");
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

    const handleBulkUpdateSechedule = () => { 
        const payload: schedule = {
            ...payLoad,
            isAvailable: false,
            scheduleDate: "",
            dayOfWeek: day
        } 

        if(!day) return;
        setLoading(true);
        updateSchedule("kk", payload)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                form.resetFields();
                message.success("Day has been updated successfully!");
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
        setStartTime(dateString.toString());
        setPayload(prev => ({...prev, startTime: dateString.toString()}))
    }
    
    const handleSetEnd = useCallback((date: dayjs.Dayjs, dateString: string | string[]) => {
        if (startTime && date.isBefore(startTime)) {
            setError("End time cannot be earlier than start time");
        } else {
            setError("");
            setEndTime(dateString.toString());
            setPayload(prev => ({...prev, endTime: dateString.toString()}))
        }
    }, [startTime]);

    const handleSaveTime = () => {
        if(!startTime) return message.error("set start time to continue");
        if(!endTime) return message.error("set end time to continue");

        const newSchedule = {
            dayOfWeek: dayOfWeek.find(date => date.name === day)?.id ||"",
            startTime: startTime.toString(),
            endTime: endTime.toString(),
            isAvailable: true,
        }

        setSaveLoading(true);
        saveSchedule(newSchedule)
        .then(res => {
            setSaveLoading(false);
            // setTimeSlots((prev) => [
            // ...prev, {
            //     ...res.data.data
            // }])
            refresh();
        })
        .catch(err => {
            setSaveLoading(false);
            modal.error({
                title: 'Unable to save schedule',
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        })

        setStartTime(null);
        setEndTime(null);
    }

    const handleRemove = (i: number, id?: string) => {
        if(id) handleDeleteSchedule(i, id);
        else setTimeSlots(prev => prev.filter((_, index) => index !== i));
    }

    const handleDeleteSchedule = (i: number, id: string) => {
        setDeleteLoading(true);
        deleteSchedule(id)
        .then(res => {
            setDeleteLoading(false);
            setTimeSlots(prev => prev.filter((_, index) => index !== i));
            refresh();
        })
        .catch(err => {
            setDeleteLoading(false);
            modal.error({
                title: 'Unable to delete schedules',
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        });
    }

    const handleBulkUpdate = (value: boolean) => {
        if(timeSlots.length === 0) return setAvailable(true)
        setUpdateLoading(true);
        const updateSchedule = timeSlots.map((time) => {
            time.isAvailable = value;
            time.dayOfWeek = dayOfWeek.find(date => date.name === day)?.id ||""
            return time
        })

        setUpdateLoading(true);
        updateBulkSchedule(updateSchedule)
        .then(res => {
            setUpdateLoading(false);
            refresh();
        })
        .catch(err => {
            setUpdateLoading(false);
            modal.error({
                title: 'Unable to update schedules',
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        })
        
    }

  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title={`Edit ${day} Schedule`}
        />}
        footer={null}
        // footer={<div className='flex items-center gap-4 justify-end'>
        //     <RoundBtn title='Cancel' onClick={onCancel} width={86} height={40}  />
        //     <RoundBtn title='Save Changes' loading={loading} primary onClick={handleUpdateSechedule} width={138} height={40}  />
        // </div>}
        width={700}
    >
        <div>
            <div className='flex items-center gap-2 mt-4'>
                {updateLoading ? <LoadingOutlined spin /> :<Switch checked={available} onChange={(e) => handleBulkUpdate(e)} title={`Available on ${day}`} />}
                <p className='text-lg text-[#151F32]'>Available on {day}</p>
            </div>
                
            {/* </Switch> */}
            {available && <div className='flex flex-col gap-4 mt-6'>
                <p className='text-[#3E3E3E]'>Add Time Slot</p>

                <div className='flex items-center gap-2 flex-wrap'>
                    {timeSlots.map((slots, i:number) => (
                        <span key={i} className='flex items-center gap-2 py-1 px-2 bg-[#C598A1] rounded-[5px]'>
                            <p key={i}>{slots.startTime} - {slots.endTime}</p>
                            {deleteLoading && selected === i ? <LoadingOutlined spin /> :<DeleteOutlined className='cursor-pointer' onClick={() => {
                                setSelected(i)
                                handleRemove(i, slots.id)}} />}
                        </span>
                    ))}
                </div>

                

                <div>
                    <Form form={form} layout="vertical">
                        <Row gutter={[10, 0]}>
                            <Col lg={12} sm={12} xs={24}>
                                <FormItem label="From" name="startTime">
                                    <TimePicker 
                                        style={{width: "100%"}}
                                        onChange={handleSetStart}
                                        // value={dayjs(startTime)}
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
                                        // value={new Date(endTime)}
                                        // use12Hours
                                    />
                                </FormItem> 
                            </Col>

                            <Col lg={24} sm={24} xs={24}>
                                <FormItem label="">
                                    <Button loading={saveLoading} onClick={handleSaveTime} className='w-full h-10.5! border-[#C7C7C7]! rounded-[5px]' icon={<PlusOutlined />}>Add Time Slot</Button>
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