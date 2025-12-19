"use client"
import { App, Button, DatePicker, Form, Input, Modal, Select, TimePicker } from 'antd'
import React, { useState } from 'react';
import "@/styles/modal.css";
import { IJobHireRequest, UserWorkerProfile } from '../../../../utils/interface';
import { hireServiceWorker } from '@/redux/action/jobs';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { savedPreferredTime } from '../../../../utils/savedInfo';

interface props {
  open: boolean;
  onCancel: () => void;
  worker: UserWorkerProfile;
  type: number;
}

const Option = Select.Option;
const FormItem = Form.Item;
const BookRequest = ({ open, onCancel, worker, type }: props) => {
  const [form] = Form.useForm();
  const { modal } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ date, setDate ] = useState({
    start: "",
    end: ""
  })
  const [ time, setTime ] = useState({
    start: "",
    end: "",
    duration: 0,
    amount: ""
  })
  const [ noOfHours, setNoOfHours ] = useState("");
  
  const handleHire = () => {
    form.validateFields()
    .then(value => {
      const payload: IJobHireRequest = {
        timePreference: value.timePreference,
        preferredStartDate:date.start,
        serviceWorkerId: worker.userId,
        proposedRate: parseFloat(time.amount),
        budget: parseFloat(time.amount),
        hireType: type,
        preferredEndDate: date.end,
        description: value.description,
        timePreferenceEnd: time.end,
        timePreferenceStart:time.start
      }

      if(worker.services) payload.serviceCategoryId = worker.services[worker.services.length - 1].serviceCategoryId

      setLoading(true)
      hireServiceWorker(payload)
      .then(res => {
        if(res.status === 200 || res.status === 201){
          modal.success({
            title: "You have successfully sent hire request!",
            content: res.data.message,
            onOk: () => {
              onCancel();
              setLoading(false);
            }
          })
        }
      })
      .catch(err => {
        modal.error({
        title: "Unable to hire this worker",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
          onOk: () => setLoading(false)
        });
      })
    })
  }

  return (
  <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    title={<p className='t-pri text-xl'>Book Request</p>}
    width={700}
    styles={{body: { padding: "20px 0 0" }}}
  >
    <Form layout="vertical" form={form} className='' onFinish={handleHire}>
      <FormItem label="Day" name="preferredStartDate" rules={[{required: true}]}>
        <DatePicker.RangePicker 
          style={{width: "100%", height: 42}} 
          // placeholder="Select Date"
          onChange={(date, dateString) => {
            setDate({
              start: dateString[0],
              end: dateString[1]
            })
          }}

        />
      </FormItem>

      {/* <FormItem label="Duration(hours)" name="timePreference" rules={[{required: true}]}>
        <Select placeholder="Select TIme">
          {savedPreferredTime.map((preference: {id: number, title: string}, i: number) => (
            <Option key={i} value={preference.id}>{preference.title}</Option>
          ))}
        </Select>
      </FormItem> */}

      <FormItem label="Time" name="preferredEndDate" rules={[{required: true}]}>
        <TimePicker.RangePicker 
          style={{width: "100%", height: 42}} 
          // format="HH:mm A"
          onChange={(dates, dateStrings) => {
            // setTime({
            //   start: dateString[0],
            //   end: dateString[1]
            // })
            if (!dates) return;

            const [start, end] = dates;

            let diffInMinutes = end?.diff(start, "minutes") || 0;

            // handle overnight time (e.g. 10pm → 2am)
            if (diffInMinutes < 0) {
              diffInMinutes += 24 * 60;
            }

            const hoursDecimal = diffInMinutes / 60;
            const totalAmount = hoursDecimal * Number(worker.hourlyRate);
            const hours = Math.floor(diffInMinutes / 60);
            const minutes = diffInMinutes % 60;

            setTime({
              start: dateStrings[0],
              end: dateStrings[1],
              duration: diffInMinutes,
              amount: totalAmount.toFixed(2)
            });

            setNoOfHours(`${hours}h ${minutes}m`)
          }}
          // placeholder="Select Date"
         

        />
      </FormItem>

       <FormItem label="Description" name="description" rules={[{required: true}]}>
        <Input placeholder="Descrption" />
      </FormItem>

      <div className='rate-calculator mt-8'>
        <div className='flex items-center justify-between text-lg'>
          <p>Hourly Rate:</p>
          <p>${worker.hourlyRate}/hr</p>
        </div>

        <div className='flex items-center justify-between text-lg'>
          <p>Duration:</p>
          <p>{noOfHours}</p>
        </div>

        <div className='flex items-center justify-between text-lg font-semibold border-t border-t-[#e8e8e8] pt-3'>
          <p>Estimated Total:</p>
          <p>${time.amount}</p>
        </div>
      </div>

      <FormItem style={{width: "100%"}} className='flex justify-end'>
        <Button 
          type="primary" 
          loading={loading} 
          htmlType="submit" 
          className='md:!w-[129px] !h-[48px]' 
          style={{borderRadius: 50}}>
            Send Request
          </Button>
      </FormItem>
    </Form>
  </Modal>
  )
}

export default BookRequest