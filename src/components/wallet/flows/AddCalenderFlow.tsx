import React, { useCallback, useState } from 'react';
import { App, Button, Col, Form, FormInstance, Row, TimePicker } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import RoundBtn from '@/components/general/RoundBtn';
import { Dayjs } from 'dayjs';
import { schedule } from '../../../../utils/interface';

interface Props {
  selectedDays: Dayjs[];
  editDays: schedule[];
  isAvailable: boolean;
  availability: boolean;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
  payLoad: schedule;
  setPayload: React.Dispatch<React.SetStateAction<schedule>>;
  handleSetSechedule: (availability: boolean) => void;
  loading: boolean;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  setStartTime: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndTime: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  form: FormInstance<string>;
  handleToggleMarkAvaialable: (availability: boolean) => void;
  markLoading: boolean;
  deleteLoading: boolean;
  handledeleteSchedule: () => void;
  handleReset: () => void;
}

const FormItem = Form.Item;

const AddCalenderFlow: React.FC<Props> = ({
  selectedDays,
  // editDays,
  isAvailable,
  availability,
  setIsAvailable,
  setAvailability,
  payLoad,
  setPayload,
  handleSetSechedule,
  loading,
  startTime,
  // endTime,
  setStartTime,
  setEndTime,
  form,
  handleToggleMarkAvaialable,
  markLoading,
  deleteLoading,
  handledeleteSchedule,
  // handleReset
}) => {
  const { message } = App.useApp();
  const [error, setError] = useState('');

  const handleMakeAvailable = () => {
    if(selectedDays.length === 0) return message.error('Please select at least one day!');
    setIsAvailable(true);
  };

  const handleSetStart = (date: Dayjs, dateString: string | string[]) => {
    setStartTime(date);
    setPayload(prev => ({ ...prev, startTime: dateString.toString() }));
  };

  const handleSetEnd = useCallback((date: Dayjs, dateString: string | string[]) => {
    if(startTime && date.isBefore(startTime)) setError('End time cannot be earlier than start time');
    else {
      setError('');
      setEndTime(date);
      setPayload(prev => ({ ...prev, endTime: dateString.toString() }));
    }
  }, [startTime, setEndTime, setPayload]);

  const handleToggleAvailable = (value: boolean) => handleToggleMarkAvaialable(value);

  return (
    <>
      {!isAvailable && !availability && (
        <div className='flex flex-col items-center gap-4 justify-center h-[300px]'>
          <Icon icon="mingcute:time-line" fontSize={80} color='#B9B9B9' />
          <p className='text-[#1E1E1E] text-lg'>No availability set for this date</p>
          <RoundBtn icon={<PlusOutlined />} title='Make Available' height={39} onClick={handleMakeAvailable} primary />
        </div>
      )}

      {isAvailable && (
        <div className='flex flex-col gap-4'>
          <div className='bg-[#F5F5F5] flex items-center justify-between rounded-xl px-4 py-2'>
            <p className='text-[#151F32] text-lg'>Available this day</p>
            <RoundBtn 
              title={payLoad.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
              icon={<CheckCircleOutlined />}
              height={39}
              width={154}
              primary
              loading={markLoading}
              onClick={() => handleToggleAvailable(!payLoad.isAvailable)}
            />
          </div>

          {!availability && (
            <div className='mt-2 flex flex-col gap-4'>
              <p className='text-[#3E3E3E]'>Add Time Slot</p>
              <Form form={form} layout="vertical">
                <Row gutter={[10,0]}>
                  <Col lg={12} sm={12} xs={24}>
                    <FormItem label="From" name="startTime">
                      <TimePicker 
                        style={{width: '100%'}}
                        value={startTime}
                        onChange={handleSetStart}
                        format="HH:mm"
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} sm={12} xs={24}>
                    <FormItem label="To" validateStatus={error ? 'error' : ''} help={error || ''}>
                      <TimePicker 
                        style={{width: '100%'}}
                        // value={endTime}
                        onChange={handleSetEnd}
                        format="HH:mm"
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} sm={24} xs={24}>
                    <FormItem>
                      <Button loading={loading} onClick={() => handleSetSechedule(false)} icon={<PlusOutlined />} className='w-full !h-[42px] rounded-[5px]'>Add Time Slot</Button>
                    </FormItem>
                  </Col>
                  <Col lg={24} sm={24} xs={24}>
                    <p onClick={() => setAvailability(true)} className='text-center cursor-pointer text-[#121212]'>View Time Slots</p>
                  </Col>
                </Row>
              </Form>
            </div>
          )}

          {availability && (
            <div className='flex flex-col gap-4 border border-[#E1E1E1] rounded-[5px] px-2 py-4'>
              <p className='text-[#3E3E3E] font-medium'>Available Time Slot</p>
              {payLoad.startTime && payLoad.endTime ? (
                <div className='flex items-center justify-between'>
                  <p>{`${payLoad.startTime} - ${payLoad.endTime}`}</p>
                  <div className='flex gap-2'>
                    {/* <Button loading={loading} onClick={() => handleSetSechedule(true)}>Edit</Button> */}
                    {deleteLoading ? <LoadingOutlined spin /> :<DeleteOutlined className="cursor-pointer" onClick={handledeleteSchedule} />}
                    {/* <Button danger loading={deleteLoading} onClick={handledeleteSchedule}>Delete</Button> */}
                  </div>
                </div>
              ) : <p>No time slot added yet</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddCalenderFlow;
