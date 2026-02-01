"use client"
import { App, Button,  Form, Input, Modal, TimePicker } from 'antd'
import DatePicker, { DateObject } from "react-multi-date-picker";
import React, { useState } from 'react';
import "@/styles/modal.css";
import { IJobHireRequest, UserWorkerProfile } from '../../../../utils/interface';
import { hireServiceWorker } from '@/redux/action/jobs';
import { createErrorMessage } from '../../../../utils/errorInstance';
import moment from 'moment';

interface props {
  open: boolean;
  onCancel: () => void;
  worker: UserWorkerProfile;
  type: number;
}

const FormItem = Form.Item;
const BookRequest = ({ open, onCancel, worker, type }: props) => {
  const [form] = Form.useForm();
  const { modal, message } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  // const [ date, setDate ] = useState({
  //   start: "",
  //   end: ""
  // })
   const [date, setDate] = useState<string[]>([]);
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
        preferredStartDate: moment(date[0]).format("YYYY-MM-DD"),
        serviceWorkerId: worker.userId,
        proposedRate: parseFloat(time.amount),
        budget: parseFloat(time.amount),
        hireType: type,
        preferredEndDate: moment(date[date.length - 1]).format("YYYY-MM-DD"),
        description: value.description,
        timePreferenceEnd: time.end,
        timePreferenceStart:time.start,
        preferredDates: date
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
        {/* <DatePicker 
          style={{width: "100%", height: 42}} 
          // placeholder="Select Date"
          onChange={(date, dateString) => {
            setDate({
              start: dateString[0],
              end: dateString[1]
            })
          }}

        /> */}
        <DatePicker 
          value={date} 
           onChange={(dates) => {
            // dates is an array of DateObject
            const isoDates = dates.map(d =>
              d.toDate().toISOString()
            );

            setDate(isoDates);
          }} 
          multiple
          style={{width: "100%", height: 42, padding: "0 10px"}}
          containerStyle={{ width: "100%"}}
          placeholder='Select Date(s)'
          minDate={new DateObject()} 
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
          needConfirm={false}
          style={{width: "100%", height: 42}} 
          onChange={(dates, dateStrings) => {
            // setTime({
            //   start: dateString[0],
            //   end: dateString[1]
            // })
            if(date.length === 0) return message.error("Please select date(s) first");
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
              amount:(totalAmount * date.length).toFixed(2)
            });

            setNoOfHours(`${hours}h ${minutes}m`)
          }}
          format="HH:mm"
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
          className='md:w-32.25! h-12!' 
          style={{borderRadius: 50}}>
            Send Request
          </Button>
      </FormItem>
    </Form>
  </Modal>
  )
}

export default BookRequest