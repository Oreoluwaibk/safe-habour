"use client"
import { Button, Col, Form, Input, InputNumber, Modal, Row, Segmented } from 'antd'
import React, { useEffect, useState } from 'react';
import "@/styles/modal.css";
import { Icon } from '@iconify/react';

interface props {
  open: boolean;
  onCancel: () => void;
  selection?: string;
  onClick?: () => void;
}

const FormItem = Form.Item;
const AddCard = ({ open, onCancel, selection, onClick }: props) => {
    const [form] = Form.useForm();
    const [selected, setSelected ] = useState("Card");

    useEffect(() => {
        if(selection) setSelected(selection)
        else setSelected("Card")
    }, [selection])
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        title={
            <Segmented 
                options={[
                    {label: "Card",icon: <Icon icon="solar:card-bold" fontSize={22} />, value: "Card", className: `${selection && selection !=="Card" ? "hidden": "flex"}` },
                    {label: "Bank Account",icon: <Icon icon="ri:bank-fill" fontSize={22} />, value: "Bank Account", className: `${selection && selection !=="Bank Account" ? "hidden": "flex"}` },
                ]}
                defaultValue={selected}
                value={selected}
                onChange={(value) => setSelected(value)}
            />
        }
        width={700}
        styles={{body: { padding: "20px 0" }}}
    >
        <Form layout="vertical" form={form} className=''>
            {selected === "Card" && <Row gutter={[15, 15]}>
                <Col lg={24} sm={24} xs={24}>
                    <FormItem label="Card Number" name="number" rules={[{required: true}]}>
                        <Input style={{width: "100%", height: 52}} placeholder="1234 5678 9012 3456" />
                    </FormItem>
                </Col>

                <Col lg={12} sm={12} xs={24}>
                    <FormItem label="Expiry Date" name="number" rules={[{required: true}]}>
                        <Input style={{height: 52}} placeholder="MM/YY" />
                    </FormItem>
                </Col>

                <Col lg={12} sm={12} xs={24}>
                    <FormItem label="CCV" name="number" rules={[{required: true}]}>
                        <Input.Password style={{width: "100%", height: 52}} placeholder="***" />
                    </FormItem>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <FormItem label="Card Name" name="number" rules={[{required: true}]}>
                        <Input style={{width: "100%", height: 52}} placeholder="Jon Don" />
                    </FormItem>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <Button type="primary" onClick={() => {
                        if(onClick) onClick();
                        onCancel();
                    }} className='!w-full !h-[48px]' style={{borderRadius: 50}}>Add Card</Button>
                </Col>
            </Row>}
           
            {selected === "Bank Account" && <Row gutter={[15, 15]}>
                <Col lg={24} sm={24} xs={24}>
                    <FormItem label="Bank Name" name="number" rules={[{required: true}]}>
                        <Input style={{width: "100%", height: 52}} placeholder="John Don" />
                    </FormItem>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <FormItem label="Account Number" name="number" rules={[{required: true}]}>
                        <InputNumber style={{width: "100%", height: 52}} placeholder="1234567890" />
                    </FormItem>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <FormItem label="Account Name" name="number" rules={[{required: true}]}>
                        <Input style={{width: "100%", height: 52}} placeholder="John Don" />
                    </FormItem>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <Button type="primary" className='!w-full !h-[48px]' style={{borderRadius: 50}}>Add Bank Account</Button>    
                </Col>
            </Row>}
    
            
        </Form>
    </Modal>
  )
}

export default AddCard