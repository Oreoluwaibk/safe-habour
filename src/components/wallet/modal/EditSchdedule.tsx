import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Modal, Row, Switch } from 'antd'
import React, { useState } from 'react'

interface props {
    open: boolean;
    onCancel: () => void;
}
const FormItem = Form.Item;
const EditSchdedule = ({ open, onCancel }: props) => {
    const [form] = Form.useForm();
    const [ isAvailable, setIsAvailable ] = useState(false)
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title="Edit Monday Schedule"
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' onClick={onCancel} width={86} height={40}  />
            <RoundBtn title='Save Changes' primary onClick={() => {}} width={138} height={40}  />
        </div>}
        width={700}
    >
        <div>
            <div className='flex items-center gap-2 mt-4'>
                <Switch checked={isAvailable} onChange={(e) => setIsAvailable(e)} title='Available on Monday' />
                <p className='text-lg text-[#151F32]'>Available on Monday</p>
            </div>
                
            {/* </Switch> */}
            {isAvailable && <div className='flex flex-col gap-4 mt-6'>
                <p className='text-[#3E3E3E]'>Add Time Slot</p>

                <div>
                    <Form form={form} layout="vertical">
                        <Row gutter={[10, 0]}>
                            <Col lg={12} sm={12} xs={24}>
                                <FormItem label="From">
                                    <DatePicker style={{width: "100%"}} />
                                </FormItem> 
                            </Col>

                            <Col lg={12} sm={12} xs={24}>
                                <FormItem label="To">
                                    <DatePicker style={{width: "100%"}} />
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