import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { App, Calendar, Card, Col, Flex, Form, Row } from 'antd';
import type { CalendarProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import CardTitle from '@/components/general/CardTitle';
import AddCalenderFlow from '../flows/AddCalenderFlow';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';
import { deleteSchedule, getSchedule, saveSchedule, updateSchedule } from '@/redux/action/schedules';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { schedule } from '../../../../utils/interface';
import moment from 'moment';
import { dayOfWeek } from '../../../../utils/savedInfo';



dayjs.extend(dayLocaleData);

const Availabliltity = () => {
    const { modal, message } = App.useApp();
    const [form] = Form.useForm();
    const [ isAvailable, setIsAvailable ] = useState(false);
    const [ availability, setAvailability ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ markLoading, setMarkLoading ] = useState(false);
    const [ deleteLoading, setDeleteLoading ] = useState(false);
    const [ selectedDay, setSelectedDay ] = useState<Dayjs | null>(null);
    const [ startTime, setStartTime ] = useState<dayjs.Dayjs | null>(null);
    const [ endTime, setEndTime ] = useState<dayjs.Dayjs | null>(null);
    const [ avaliableDays, setAvailableDays ] = useState<schedule[]>([]);
    const [ editDay, setEditDay ] = useState<schedule>({
        dayOfWeek: null,
        startTime: "",
        endTime: "",
        isAvailable: false,
        notes: "",
        id: null,
        scheduleDate: ""
    });

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const [ payLoad, setPayload ] = useState<schedule>({
        dayOfWeek: null,
        startTime: "",
        endTime: "",
        isAvailable: false,
        notes: "",
        scheduleDate: ""
    });

    const handleGetAvailabilty = useCallback(() => {
        setLoading(true);
        getSchedule()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                console.log("response", res.data);
                setAvailableDays(res.data.data);
            }
        })
        .catch(err => {
            setLoading(false);
            modal.error({
                title: "Unable to get schedule",
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        })
    }, []);
    
    useEffect(() => {
        handleGetAvailabilty();
    }, []);

    const handleSave = (availability: boolean = false) => {
        if(editDay.id) handleUpdateSechedule(availability);
        else handleSetSechedule(availability)
    }

    const handleSetSechedule = (availability: boolean = false) => {
        const payload: schedule = {
            ...payLoad,
            isAvailable: availability,
            scheduleDate: selectedDay?.toISOString() || "",
        }

        setLoading(true);
        saveSchedule(payload)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                
                form.resetFields();
                message.success("Day has been set successfully, to make day active, mark as available!");
                const updatedDate = res.data.data;
                handleGetAvailabilty();

                setEditDay(updatedDate);
                setAvailability(true);
                setIsAvailable(true)
                setEndTime(dayjs(updatedDate.endTime))
                setPayload({ ...updatedDate });
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

    const handleUpdateSechedule = (availability: boolean = false) => { 
        const payload: schedule = {
            ...payLoad,
            isAvailable: availability,
            scheduleDate: selectedDay?.toISOString() || "",
            dayOfWeek: dayOfWeek.findIndex(day => day.name === payLoad.dayOfWeek)
        }
        if(!editDay.id) return;
        setLoading(true);
        updateSchedule(editDay.id!, payload)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                form.resetFields();
                message.success("Day has been updated successfully!");
                console.log("res", res.data);
                const updatedDate = res.data.data;
                handleGetAvailabilty();

                setEditDay(updatedDate);
                setAvailability(true);
                setIsAvailable(true)
                setEndTime(dayjs(updatedDate.endTime))
                setPayload({ ...updatedDate });
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

    const handleToggleMarkAvaialable = (availability: boolean = false) => { 
        const payload: schedule = {
            ...payLoad,
            isAvailable: availability,
            scheduleDate: selectedDay?.toISOString() || "",
            dayOfWeek: dayOfWeek.findIndex(day => day.name === payLoad.dayOfWeek)
        }

        if(!editDay.id) return;
        setMarkLoading(true);
        updateSchedule(editDay.id!, payload)
        .then(res => {
            if(res.status === 200) {
                setMarkLoading(false);
                form.resetFields();
                message.success(`This time has been marked as ${availability ? "available" : "unavaialable"}!`);
                const updatedDate = res.data.data;
                handleGetAvailabilty();

                setEditDay(updatedDate);
                setAvailability(true);
                setIsAvailable(true)
                setEndTime(dayjs(updatedDate.endTime))
                setPayload({ ...updatedDate });
            }
        })
        .catch(err => {
            setMarkLoading(false);
            modal.error({
                title: "Unable to set schedule",
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        })
    }

    const handledeleteSchedule = () => { 
        if(!editDay.id) return;
        setDeleteLoading(true);
        deleteSchedule(editDay.id!)
        .then(res => {
            if(res.status === 200 || res.status === 204) {
                setDeleteLoading(false);
                form.resetFields();
                message.success(res.data.message || "Time and date has been deleted successfully!");
                handleGetAvailabilty();

                setPayload({
                    startTime: "",
                    endTime: "",
                    isAvailable: false,
                    notes: "",
                    dayOfWeek: 0,
                    scheduleDate: ""
                });
                setEditDay({
                    dayOfWeek: null,
                    startTime: "",
                    endTime: "",
                    isAvailable: false,
                    notes: "",
                    id: null,
                    scheduleDate: ""
                })
                setAvailability(false);
                setIsAvailable(false);
                setSelectedDay(null);
                setStartTime(null);
                setEndTime(null);
            }
        })
        .catch(err => {
            setDeleteLoading(false);
            modal.error({
                title: "Unable to delete schedule",
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        })
    }

    const onDateChange: CalendarProps<Dayjs>["onChange"] = (date) => {
        const selected = avaliableDays.find(day => day.dayOfWeek === dayOfWeek[date.day()].name && day.scheduleDate.split("T")[0] === dayjs(date).format("YYYY-MM-DD"));
        if(selected) {
            setEditDay(selected);
            setAvailability(true);
            setIsAvailable(true)
            setEndTime(dayjs(selected.endTime))
            setPayload({ ...selected });
        } else {
            setPayload({
                startTime: "",
                endTime: "",
                isAvailable: false,
                notes: "",
                dayOfWeek: date.day(),
                scheduleDate: ""
            });
            setEditDay({
                dayOfWeek: null,
                startTime: "",
                endTime: "",
                isAvailable: false,
                notes: "",
                id: null,
                scheduleDate: ""
            })
            setAvailability(false);
            setIsAvailable(false);
        }

        setSelectedDay(date);
    }
  return (
    <Row gutter={[15, 15]}>
    <Col lg={12} sm={24} xs={24}>
        <Card 
            
            title={<CardTitle title='Availability' description={<div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                    <div className='h-[8px] w-[8px] bg-[#670316] rounded-full'></div>
                    <p className='text-[#343434] text-[10px]'>Available</p>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='h-[8px] w-[8px] bg-[#039855] rounded-full'></div>
                    <p className='text-[#343434] text-[10px]'>Booked</p>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='h-[8px] w-[8px] bg-[#f5f5f5] rounded-full'></div>
                    <p className='text-[#343434] text-[10px]'>Unavailable</p>
                </div>
            </div>} />} 
            styles={{ body: {}}}
        >
            <Card variant="borderless">
                <Calendar 
                    fullscreen={false}
                    headerRender={({ value, onChange,   }) => {
                        const year = value.year();
                        const month = value.month();
    
                        // const yearOptions = Array.from({ length: 20 }, (_, i) => {
                        //     const label = year - 10 + i;
                        //     return { label, value: label };
                        // });
    
                        // const monthOptions = value
                        //     .localeData()
                        //     .monthsShort()
                        //     .map((label, index) => ({
                        //     label,
                        //     value: index,
                        //     }));
    
                        return (
                            <div style={{ padding: 8 }}>
                            {/* <Typography.Title level={4}>Custom header</Typography.Title> */}
                            <Flex gap={8} justify="space-between" className='text-[#667085] text-xs'>
                                <LeftOutlined className='cursor-pointer' onClick={() => {
                                    const now = value.clone().month(month-1);
                                    onChange(now);
                                }}/>
                                <p className='text-[#344054]'>{value.format("MMMM")} {year}</p>
                                <RightOutlined className='cursor-pointer' onClick={() => {
                                    const now = value.clone().month(month+1);
                                    onChange(now);
                                }}/>
                                {/* <Radio.Group
                                size="small"
                                onChange={(e) => onTypeChange(e.target.value)}
                                value={type}
                                >
                                <Radio.Button value="month">Month</Radio.Button>
                                <Radio.Button value="year">Year</Radio.Button>
                                </Radio.Group>
                                <Select
                                size="small"
                                popupMatchSelectWidth={false}
                                value={year}
                                options={yearOptions}
                                onChange={(newYear) => {
                                    const now = value.clone().year(newYear);
                                    onChange(now);
                                }}
                                />
                                <Select
                                size="small"
                                popupMatchSelectWidth={false}
                                value={month}
                                options={monthOptions}
                                onChange={(newMonth) => {
                                    console.log("dd", newMonth, month);
                                    
                                    const now = value.clone().month(newMonth);
                                    onChange(now);
                                }}
                                /> */}
                            </Flex>
                            </div>
                        );
                    }}
                    onPanelChange={onPanelChange}
                    onChange={onDateChange}
                    className='!bg-[#FAFAFA]'
                    rootClassName='!bg-[#FAFAFA]'
                />
            </Card>
        </Card>
    </Col>

    <Col lg={12} sm={24} xs={24}>
        <Card 
            title={<CardTitle title={selectedDay ? selectedDay.format("dddd, MMMM DD") : "Select a Day to continue"} />} 
            styles={{ body: {}}}
            extra={isAvailable && availability && <RoundBtn width={86} height={40} title='Edit' icon={<Icon icon="flowbite:edit-outline" fontSize={18} />}  onClick={() => setAvailability(false)} />}
        >
            <Card variant="borderless">
               <AddCalenderFlow 
                    availability={availability} 
                    isAvailable={isAvailable} 
                    setAvailability={setAvailability} 
                    setIsAvailable={setIsAvailable} 
                    payLoad={payLoad}
                    setPayload={setPayload}
                    selectedDay={selectedDay}
                    handleSetSechedule={handleSave}
                    loading={loading}
                    setEndTime={setEndTime}
                    setStartTime={setStartTime}
                    startTime={startTime}
                    endTime={endTime}
                    form={form}
                    markLoading={markLoading}
                    handleToggleMarkAvaialable={handleToggleMarkAvaialable}
                    deleteLoading={deleteLoading}
                    handledeleteSchedule={handledeleteSchedule}
                />
            </Card>
        </Card>
    </Col>
    </Row>
  )
}

export default Availabliltity