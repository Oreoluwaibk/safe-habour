import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { Card, Col, DatePicker, Form, Modal, Row } from 'antd';
import React from 'react'


interface props {
    open: boolean;
    onCancel: () => void;
}
const FormItem = Form.Item;
const ApplyTemplate = ({ open, onCancel }: props) => {
    const [form] = Form.useForm();
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
            <RoundBtn title='Apply Template' primary onClick={() => {}} width={138} height={40}  />
        </div>}
        width={700}
    >
        <Form form={form} layout="vertical">
            <Row gutter={[10, 0]}>
                <Col lg={12} sm={12} xs={24}>
                    <FormItem label="Start Date">
                        <DatePicker style={{width: "100%"}} />
                    </FormItem> 
                </Col>

                <Col lg={12} sm={12} xs={24}>
                    <FormItem label="End Date">
                        <DatePicker style={{width: "100%"}} />
                    </FormItem> 
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <Card title="Current Template Review">
                        <Card classNames={{ body: "text-[#3E3E3E] flex flex-col gap-4 !py-1"}}>
                            <div className='flex items-center justify-between'>
                                <p>Monday</p>
                                <p>8AM - 12PM</p>
                            </div>

                            <div className='flex items-center justify-between'>
                                <p>Tuesday</p>
                                <p>8AM - 12PM</p>
                            </div>

                            <div className='flex items-center justify-between'>
                                <p>Wednesday</p>
                                <p>8AM - 12PM</p>
                            </div>

                            <div className='flex items-center justify-between'>
                                <p>Thursday</p>
                                <p>8AM - 12PM</p>
                            </div>

                            <div className='flex items-center justify-between'>
                                <p>Friday</p>
                                <p>8AM - 12PM</p>
                            </div>
                        </Card>
                    </Card>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default ApplyTemplate