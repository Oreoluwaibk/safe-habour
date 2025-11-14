import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { App, Calendar, Card, Col, Flex, Form, Row } from 'antd';
import type { CalendarProps } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import CardTitle from '@/components/general/CardTitle';
import AddCalenderFlow from '../flows/AddCalenderFlow';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';
import { deleteSchedule, getSchedule, saveBulkSchedule, updateBulkSchedule } from '@/redux/action/schedules';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { schedule } from '../../../../utils/interface';

dayjs.extend(dayLocaleData);

const Availabliltity = () => {
  const { modal, message } = App.useApp();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [avaliableDays, setAvailableDays] = useState<schedule[]>([]);
  const [selectedDays, setSelectedDays] = useState<Dayjs[]>([]);
  const [editDays, setEditDays] = useState<schedule[]>([]); // schedules for selected days

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const [payLoad, setPayload] = useState<schedule>({
    dayOfWeek: null,
    startTime: '',
    endTime: '',
    isAvailable: false,
    notes: '',
    scheduleDate: ''
  });

  const [isAvailable, setIsAvailable] = useState(false);
  const [availability, setAvailability] = useState(false);

  // Fetch schedules from backend
  
    const handleGetAvailabilty = useCallback(() => {
        setLoading(true);
        getSchedule()
        .then(res => {
            setLoading(false);
            if(res.status === 200) setAvailableDays(res.data.data);
        })
        .catch(err => {
            setLoading(false);
            modal.error({
            title: 'Unable to get schedule',
            content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        });
    }, [modal]);

    useEffect(() => {
        handleGetAvailabilty();
    }, [handleGetAvailabilty]);

    useEffect(() => {
        if(selectedDays.length === 0) {
            handleReset();
        }
    }, [selectedDays]);

    const handleReset = () => {
        setEditDays([]);
        setIsAvailable(false);
        setAvailability(false);
        setPayload({
            dayOfWeek: null,
            startTime: '',
            endTime: '',
            isAvailable: false,
            notes: '',
            scheduleDate: ''
        });
        setStartTime(null);
        setEndTime(null);
    }
    const onDateChange: CalendarProps<Dayjs>['onChange'] = (date) => {
    if (!date) return;

    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const hasSchedule = avaliableDays.some(d => d.scheduleDate.split('T')[0] === dateStr);

    setSelectedDays(prev => {
        // Check if mixing saved and unsaved dates
        const isMixing = prev.some(d => {
        const dHasSchedule = avaliableDays.some(s => s.scheduleDate.split('T')[0] === d.format('YYYY-MM-DD'));
        return dHasSchedule !== hasSchedule;
        });

        if (isMixing) {
        message.warning("You cannot select dates with saved schedules together with unsaved dates. Selection has been reset.");
        return [date]; // reset selection to just this date
        }

        // Toggle date selection
        const exists = prev.some(d => d.isSame(date, 'day'));
        if (exists) return prev.filter(d => !d.isSame(date, 'day'));
        return [...prev, date];
    });

    setSelectedDay(date);

    // Get schedules for the clicked date
    const schedules = avaliableDays.filter(d => d.scheduleDate.split('T')[0] === dateStr);
    setEditDays(schedules);

    if (schedules.length) {
        const first = schedules[0];
        setPayload({ ...first });
        setIsAvailable(true);
        setAvailability(true);
        setStartTime(dayjs(first.startTime));
        setEndTime(dayjs(first.endTime));
    } else {
        setPayload({
        dayOfWeek: date.day(),
        startTime: '',
        endTime: '',
        isAvailable: false,
        notes: '',
        scheduleDate: ''
        });
        setIsAvailable(false);
        setAvailability(false);
        setStartTime(null);
        setEndTime(null);
    }
    };

    const handleSave = (availabilityFlag: boolean = false) => {
        if(editDays.length) handleUpdateSchedules(availabilityFlag);
        else handleSetSchedules(availabilityFlag);
    };

    const handleSetSchedules = (availabilityFlag: boolean = false) => {
        if(selectedDays.length === 0) return;

        const payloads: schedule[] = selectedDays.map(day => ({
        ...payLoad,
        isAvailable: availabilityFlag,
        scheduleDate: day.toISOString(),
        dayOfWeek: day.day()
        }));

        setLoading(true);
        saveBulkSchedule(payloads)
        .then(res => {
            setLoading(false);
            message.success('Schedules have been created successfully!');
            handleGetAvailabilty();
            setEditDays(res.data.data);
        })
        .catch(err => {
            setLoading(false);
            modal.error({
            title: 'Unable to create schedules',
            content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        });
    };

    const handleUpdateSchedules = (availabilityFlag: boolean = false) => {
        if(editDays.length === 0) return;

        const payloads: schedule[] = selectedDays.map(day => ({
        ...payLoad,
        isAvailable: availabilityFlag,
        scheduleDate: day.toISOString(),
        dayOfWeek: day.day(),
        id: editDays.find(d => d.scheduleDate.split('T')[0] === day.format('YYYY-MM-DD'))?.id
        }));

        setLoading(true);
        updateBulkSchedule(payloads) // assuming endpoint accepts multiple IDs + array payload
        .then(res => {
            setLoading(false);
            message.success('Schedules have been updated successfully!');
            handleGetAvailabilty();
            setEditDays(res.data.data);
        })
        .catch(err => {
            setLoading(false);
            modal.error({
            title: 'Unable to update schedules',
            content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        });
    };

    const handleToggleMarkAvailable = (availabilityFlag: boolean) => {
        if(!selectedDay) return;
        if(editDays.length === 0) return;

        const payloads: schedule[] = selectedDays.map(day => ({
        ...payLoad,
        isAvailable: availabilityFlag,
        scheduleDate: day.toISOString(),
        dayOfWeek: day.day(),
        id: editDays.find(d => d.scheduleDate.split('T')[0] === day.format('YYYY-MM-DD'))?.id
        }));

        setMarkLoading(true);
        updateBulkSchedule(payloads)
        .then(res => {
            setMarkLoading(false);
            message.success(`This time has been marked ${availabilityFlag ? 'available' : 'unavailable'}!`);
            handleGetAvailabilty();
            setPayload(prev=> ({ ...prev, isAvailable: availabilityFlag }));
            setEditDays(res.data.data);
        })
        .catch(err => {
            setMarkLoading(false);
            modal.error({
            title: 'Unable to toggle availability',
            content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        });
    };

    const handleDeleteSchedule = () => {
        if (!editDays.length) return;

        setDeleteLoading(true);
        
        const deletePromises = editDays.map(day => deleteSchedule(day.id!));

        Promise.all(deletePromises)
        .then(() => {
            setDeleteLoading(false);
            message.success('All selected schedules deleted successfully!');
            handleGetAvailabilty();

            // Reset states
            setSelectedDay(null);
            setSelectedDays([]);
            setEditDays([]);
            setIsAvailable(false);
            setAvailability(false);
            setStartTime(null);
            setEndTime(null);
            setPayload({
                dayOfWeek: 0,
                startTime: '',
                endTime: '',
                isAvailable: false,
                notes: '',
                scheduleDate: ''
            });
        })
        .catch(err => {
            setDeleteLoading(false);
            modal.error({
                title: 'Unable to delete schedules',
                content: err?.response ? createErrorMessage(err.response.data) : err.message,
            });
        });
    };


  return (
    <Row gutter={[15, 15]}>
      <Col lg={12} sm={24} xs={24}>
        <Card 
          title={<CardTitle title="Availability" description={
            <div className='flex items-center gap-3'>
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
            </div>
          } />} 
        >
          <Calendar
            fullscreen={false}
            fullCellRender={(date) => {
              const isSelected = selectedDays.some(d => d.isSame(date, 'day'));
              const selected = avaliableDays.find(day =>
                day.scheduleDate.split('T')[0] === dayjs(date).format('YYYY-MM-DD')
              );
              return (
                <div className={`custom-day flex flex-col justify-center items-center text-xs w-[35px] h-[35px] rounded-[20px] 
                  ${selected && (selected.isAvailable ? 'bg-[#F1FFF9]' : 'bg-[#FFF5F7]')} 
                  ${isSelected ? 'bg-[#670316] text-black' : 'text-black'}`}>
                  {date.date()}
                  {selected && <Icon icon="mdi:circle" fontSize={5} className='mt-1' color={selected.isAvailable ? '#039855' : '#670316'} />}
                </div>
              );
            }}
            onChange={onDateChange}
            headerRender={({ value, onChange }) => {
              const year = value.year();
              const month = value.month();
              return (
                <Flex gap={8} justify="space-between" className='text-[#667085] text-xs p-2'>
                  <LeftOutlined className='cursor-pointer' onClick={() => onChange(value.clone().month(month - 1))} />
                  <p className='text-[#344054]'>{value.format('MMMM')} {year}</p>
                  <RightOutlined className='cursor-pointer' onClick={() => onChange(value.clone().month(month + 1))} />
                </Flex>
              );
            }}
            validRange={[dayjs(), dayjs().add(3, 'month')]}
            className='!bg-[#FAFAFA]'
          />
        </Card>
      </Col>

      <Col lg={12} sm={24} xs={24}>
        <Card 
          title={<CardTitle title={
            selectedDays.length === 0 
              ? "Select a Day to continue" 
              : selectedDays.length > 1 
                ? `${selectedDays[0].format("dddd, MMMM DD")} - ${selectedDays[selectedDays.length -1].format("dddd, MMMM DD")}` 
                : `${selectedDays[0].format("dddd, MMMM DD")}`
          } />}
          extra={isAvailable && availability && (<div className='flex gap-2 items-center'>
            <RoundBtn width={86} height={40} title='Reset' onClick={handleReset} />
            <RoundBtn width={86} height={40} title='Edit' onClick={() => setAvailability(false)} />
          </div>)}
        >
          <AddCalenderFlow
            availability={availability}
            isAvailable={isAvailable}
            setAvailability={setAvailability}
            setIsAvailable={setIsAvailable}
            selectedDays={selectedDays}
            editDays={editDays}
            payLoad={payLoad}
            setPayload={setPayload}
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            form={form}
            handleSetSechedule={handleSave}
            markLoading={markLoading}
            handleToggleMarkAvaialable={handleToggleMarkAvailable}
            deleteLoading={deleteLoading}
            handledeleteSchedule={handleDeleteSchedule}
            loading={loading}
            handleReset={handleReset}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Availabliltity;
