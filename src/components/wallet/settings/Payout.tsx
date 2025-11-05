import AddCard from '@/components/client/modal/AddCard';
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import { PlusOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react'
import { App, Button, Card, Form, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { createStripeAccount, getWorkerBankInfo, onBoardWorkerOnStripe } from '@/redux/action/transaction';

const FormItem = Form.Item;
const Option = Select.Option;
const Payout = () => {
    const [form] = Form.useForm();
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ openAdd, setOpenAdd ] = useState(false);
    const [ bankInfo, setBankInfo ] = useState<null>(null);

    const handleGetBankInfo= useCallback(() => {
        setLoading(true);
        getWorkerBankInfo()
        .then(res => {
            if(res.status === 200) {
            setLoading(false);
                console.log(res.data);
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

    const handleCreateStripeAccount = useCallback(() => {
        setLoading(true);
        createStripeAccount()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                console.log(res.data);
                window.open(res.data.data.url, "_blank");
                // setBankInfo(res.data.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to create stripe account",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, [modal]);

    const handleOnboardStripeAccount = useCallback(() => {
        setLoading(true);
        onBoardWorkerOnStripe()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                console.log(res.data);
                window.open(res.data.data.url, "_blank");
                // setBankInfo(res.data.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to onboard stripe account",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, [modal]);

    useEffect(() => {
        handleGetBankInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelection = () => {
        if(bankInfo) handleOnboardStripeAccount();
        else handleCreateStripeAccount();
    }

  return (
    
    <Card 
        title={<CardTitle title='Payout Settings' icon={<Icon icon="line-md:security" fontSize={18} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
         actions={[
        <div key={1} className='flex items-center justify-between px-6 py-4 !w-full'>
            <Button onClick={handleSelection} loading={loading} type="primary"  className='!w-full !h-[48px]' style={{borderRadius: 50}} >{bankInfo ? "Update Payout" : "Add Payout"}</Button>
        </div>]}
    >
        <Card className='!mt-4'>
            <div className='pb-6 pt-3 flex flex-col gap-4'>
                <Card 
                    title={
                    <CardTitle 
                        title='Connected Account' 
                        description="RBC Royal Bank - Account ending in 4567"
                        icon={<Icon icon="fluent:payment-48-regular" fontSize={18} className='mr-1' />}  
                    />}
                    extra={<RoundBtn title='Default' width={86} primary onClick={() => {}} />}
                    classNames={{body: "!p-0 !h-0"}}
                    className='!bg-[#FFF4F6] !border-[#FFD6DE]'
                />
                <Button onClick={() => setOpenAdd(true)} type="default" className='!w-full !h-[48px]' style={{borderRadius: 50}} icon={<PlusOutlined />} >{"Add Payment Method"}</Button>
            </div>

            <Form form={form} layout="vertical">
                <FormItem label="Payout Method" name="method">
                    <Select defaultValue="Card">
                        <Option>Card</Option>
                        <Option>Bank Account</Option>

                    </Select>
                </FormItem>

                <FormItem label="Payout Schedule" name="schedule">
                    <Select defaultValue="Weekly (Friday)">
                        <Option>Weekly (Friday)</Option>
                        <Option>Biweekly</Option>
                        <Option>Monthly</Option>

                    </Select>
                </FormItem>
            </Form>
        </Card>
       {openAdd && <AddCard onCancel={() => setOpenAdd(false)} onClick={() => {}} open={openAdd} selection="Bank Account" />}
    </Card>
  )
}

export default Payout