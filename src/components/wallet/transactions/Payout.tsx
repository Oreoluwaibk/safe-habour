import TransactionCard from '@/components/client/cards/TransactionCard';
import CardTitle from '@/components/general/CardTitle';
import { getWorkerBankInfo, getWorkerPayouts } from '@/redux/action/transaction';
// import { PlusOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { App, Button, Card, Col, Form, Row, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { PaymentTransaction } from '../../../../utils/interface';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { useRouter } from 'next/navigation';

const FormItem = Form.Item;
const Option = Select.Option;
const Payout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { modal } = App.useApp();
  const [ loading, setLoading ] = useState(false); 
  const [ transactions, setTransactions ] = useState<PaymentTransaction[]>([]);
  const [ bankInfo, setBankInfo ] = useState({});

  const handleGetPayouts = useCallback(() => {
    setLoading(true);
    getWorkerPayouts()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setTransactions(res.data);
      }
    })
    .catch(err => {
      modal.error({
      title: "Unable to get transactions",
      content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
        onOk: () => setLoading(false)
      });
    })
  }, [modal]);

  const handleGetBankInfo= useCallback(() => {
    setLoading(true);
    getWorkerBankInfo()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setBankInfo(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
      title: "Unable to get bank info",
      content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
        onOk: () => setLoading(false)
      });
    })
  }, [modal]);

  useEffect(() => {
    handleGetPayouts();
    handleGetBankInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <Row className='my-6' gutter={[15, 15]}>
      <Col lg={14} sm={24} xs={24} className='mb-6'>
        <Card 
          title={<p className='text-lg text-[#1e1e1e]'>Payout Settings</p>}
          styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
          actions={[<div key={1} className='flex items-center justify-between px-6 font-medium'>
            <Button type="primary" onClick={() => router.push("/dashboard/worker/settings")} className='md:!w-full !h-[48px]' style={{borderRadius: 50}}>Update Settings</Button>
        </div>]}
        >
        <Form form={form} layout="vertical">
        <FormItem label="Payout Schedule" name="schdule">
          <Select placeholder="Weekly (friday)"></Select>
        </FormItem>

        <FormItem label="Payout Method" name="paymentMethod" initialValue="bank">
          <Select disabled defaultValue="bank" placeholder="Bank">
            <Option value="bank">Bank</Option>
          </Select>
        </FormItem>
        </Form>

        {bankInfo && <div className='flex items-center justify-between bg-[#FFF4F6] border-[#FFD6DE] rounded-[5px] p-4'>
          <CardTitle 
            title='Connected Account' 
            description="RBC Royal Bank - Account ending in 4567" 
            icon={<Icon icon="fluent:payment-48-regular" fontSize={18} />}
          />

          {/* <div className='flex flex-col gap-0'>
            <Button type="primary" className='md:!min-w-[129px] !h-[48px]' style={{borderRadius: 50}}>Defaults</Button>
          </div> */}
        </div>}

        {/* <div className='flex items-center justify-between font-medium'>
          <Button onClick={() => router.push("/dashboard/worker/settings")} type="default" className='md:!w-full !h-[48px]' icon={<PlusOutlined />} style={{borderRadius: 50}}>Add Payment Method</Button>
        </div> */}

        </Card>
      </Col>

      <Col lg={10} sm={24} xs={24} className='mb-6'>
        <Card 
          title={<p className='text-lg text-[#1e1e1e]'>Payout History</p>}
          styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
          loading={loading}
        >
          {transactions.map((transaction: PaymentTransaction, i: number) => (
            <TransactionCard key={i} isTransaction payout transaction={transaction} />
          ))}

          {transactions.length === 0 && (
            <p className='text-center text-[#121212]'>You have no payout history</p>
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default Payout