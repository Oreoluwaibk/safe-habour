import { IWaitlist, submitWailtlistInfo } from "@/redux/action/waitlist";
import { App, Button, Col, Form, Input, Radio, Row, Select } from "antd";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import { createErrorMessage } from "../../../utils/errorInstance";


const FormItem = Form.Item;
const SeekerForm = () => {
  const { modal, message } = App.useApp();
  const [form] = Form.useForm();
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = () => {
    form.validateFields()
    .then(value => {

      const payload: IWaitlist = {
        ...value,
        name: `${value.firstName} ${value.lastName}`,
        userType: 1
      } 
      delete payload.firstName;
      delete payload.lastName;

      setLoading(true);
      submitWailtlistInfo(payload)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          message.success(res.data.message || "Details submitted successfully!");
          form.resetFields();
        }
      })
      .catch((err) => {
        setLoading(false);
        modal.error({
          title: "Error",
          content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
          onOk: () => setLoading(false),
        });
      });
    })  
  };

  return (
    <section className="bg-[#FFE4E9] py-12 px-2 lg:px-60" id="seeker-form">
      <div className="flex flex-col gap-10 items-center">
        
        <div className="">
          <h2 className="color-bg text-4xl text-center font-semibold mb-4">Claim Your FREE Booking Spot</h2>
          <p className="text-[#1e1e1e] text-2xl font-medium text-center">First 200 Families Only!</p>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} form={form} className="bg-white">
          <Row gutter={[15, 15]} className="m-0! px-6 py-8">
            <Col lg={12} sm={12} xs={24}>
              <FormItem label="First Name" name="firstName" rules={[{required: true}]} className="mb-1!">
                <Input placeholder="First Name" style={{  height:50,}} />
              </FormItem>
            </Col>

            <Col lg={12} sm={12} xs={24}>
              <FormItem label="Last Name" name="lastName" rules={[{required: true}]} className="mb-1!">
                <Input placeholder="Last Name" style={{  height:50,}} />
              </FormItem>
            </Col>

            <Col lg={12} sm={12} xs={24}>
              <FormItem label="Email" name="emailAddress" rules={[{required: true}]}>
                <Input placeholder="Email" type="email" style={{  height:50,}} />
              </FormItem>
            </Col>

            <Col lg={12} sm={12} xs={24}>
              <FormItem label="Phone" name="phoneNumber" rules={[{required: true}]}>
                <PhoneInput 
                  placeholder='09039476798'
                  inputStyle={{width: "100%", height:50, backgroundColor: "#fff"}}
                  country="ca"
                />
              </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
              <FormItem label="City" name="location" rules={[{required: true}]} >
                <Select placeholder="Select your city" style={{  height:50,}}>
                  <Select.Option value="Winnipeg, MB">Winnipeg, MB</Select.Option>
                  <Select.Option value="Steinbach, MB">Steinbach, MB</Select.Option>
                  <Select.Option value="Ottawa, ON">Ottawa, ON</Select.Option>
                  <Select.Option value="Mississauga, MB">Mississauga, MB</Select.Option>

                </Select>
              </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
              <FormItem label="Who are you registering for" name="registeringFor" rules={[{required: true}]}>
                <Radio.Group>
                  <Radio value={1}>A senior seeking care for myself</Radio>
                  <Radio value={2}>A family member seeking care for a loved one</Radio>
                </Radio.Group>
              </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
              <FormItem >
                <Button loading={loading} htmlType="submit" type="primary" className='w-full text-base! px-8!'>Claim Your Free Spot</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
};

export default SeekerForm;
