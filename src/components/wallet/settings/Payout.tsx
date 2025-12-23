import AddCard from '@/components/client/modal/AddCard';
import CardTitle from '@/components/general/CardTitle'
import { Icon } from '@iconify/react'
import { App, Button, Card, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { createStripeAccount, getWorkerBankInfo, onBoardWorkerOnStripe } from '@/redux/action/transaction';
import { IBankInfoDetails } from '../../../../utils/interface';
import RoundBtn from '@/components/general/RoundBtn';
import moment from 'moment';

const Option = Select.Option;
const Payout = () => {
    // const [form] = Form.useForm();
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ openAdd, setOpenAdd ] = useState(false);
    const [ bankInfo, setBankInfo ] = useState<IBankInfoDetails>({
        bankAccount: null,
        payoutSchedule: {
            interval: "daily",
            intervalDescription: "Daily automatic payouts",
            weeklyAnchor: null,
            monthlyAnchor: 0,
            delayDays: 7,
            nextPayoutDate: "2025-12-24T16:00:00Z",
            payoutTime: "11:00 AM EST",
        },
        additionalInfo: {
            instantPayoutsAvailable: true,
            statementDescriptor: null,
            debitNegativeBalances: true,
        },
    });

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

    const handleCreateStripeAccount = useCallback(() => {
        setLoading(true);
        createStripeAccount()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                window.open(res.data.data, "_blank");
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
                window.open(res.data.data, "_blank");
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
        <Card className='!mt-4' classNames={{ body: "py-2!", actions: "border-t-0! "}}>
            {bankInfo && bankInfo.bankAccount && <div className='pb-6 pt-3 flex flex-col gap-4'>
                <Card 
                    title={
                    <CardTitle 
                        title={bankInfo.bankAccount.accountHolderName} 
                        description={`${bankInfo.bankAccount.bankName} - Account ending in ${bankInfo.bankAccount.last4}`}
                        icon={<Icon icon="fluent:payment-48-regular" fontSize={18} className='mr-1' />}  
                    />}
                    extra={<RoundBtn title='Default' width={86} primary onClick={() => {}} />}
                    classNames={{body: "!p-0 !h-0"}}
                    className='!bg-[#FFF4F6] !border-[#FFD6DE]'
                />
                {/* <Button onClick={() => setOpenAdd(true)} type="default" className='!w-full !h-[48px]' style={{borderRadius: 50}} icon={<PlusOutlined />} >{"Add Payment Method"}</Button> */}
            </div>}

            {bankInfo && bankInfo.payoutSchedule && <div className='flex flex-col gap-4 pb-3'>
                <Select disabled value={`${moment(bankInfo.payoutSchedule.nextPayoutDate).format("YYYY-MM-DD")} at ${bankInfo.payoutSchedule.payoutTime}`}>
                    <Option value={`${moment(bankInfo.payoutSchedule.nextPayoutDate).format("YYYY-MM-DD")} at ${bankInfo.payoutSchedule.payoutTime}`}>{`${moment(bankInfo.payoutSchedule.nextPayoutDate).format("YYYY-MM-DD")} at ${bankInfo.payoutSchedule.payoutTime}`}</Option>
                </Select>
                <Select defaultValue="Weekly (Friday)" disabled value={bankInfo.payoutSchedule.interval}>
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="bi-weekly">Bi-Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                </Select>
            </div>}
        </Card>
       {openAdd && <AddCard onCancel={() => setOpenAdd(false)} onClick={() => {}} open={openAdd} selection="Bank Account" />}
    </Card>
  )
}

export default Payout