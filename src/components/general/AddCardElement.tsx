'use client'

import { createPaymentIntent, savePaymentMethods } from '@/redux/action/transaction'
import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { App, message } from 'antd'
import { useState } from 'react'
import RoundBtn from './RoundBtn'

export default function AddPaymentMethod({ refresh }: { refresh: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false);
  const { modal } = App.useApp();

  const handleSubmit = async () => {
    console.log("add", stripe, elements);
    
    if (!stripe || !elements) return

    setLoading(true)

    const res = await createPaymentIntent();
    const clientSecret = res.data.data.clientSecret;
    console.log("res", res.data.data.clientSecret);

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    })

    if (result.setupIntent?.payment_method) {
      const paymentMethodId = result.setupIntent.payment_method;

      const res = await savePaymentMethods({ 
        paymentMethodId: paymentMethodId as string
      });

      if(res.status === 200) {
        modal.success({
          title: res.data.message,
          onOk: () => refresh()
        })
      }
    }

    if (result.error) {
      message.error(result.error.message)
    } else {
      message.success('Payment method added successfully!')
    }

    setLoading(false)
  }

  return (
  <div className="flex flex-col gap-8 rounded-lg border border-[#d9d9d9] px-4 py-3 focus-within:border-[#1677ff] focus-within:shadow-sm transition">
    <CardElement
      options={{
        hidePostalCode: true,
        style: {
          base: {
            fontSize: '16px',
            fontFamily: 'Outfit, system-ui, sans-serif',
            color: '#000E10',
            '::placeholder': {
            color: '#828282',
            },
            iconColor: '#000E10',
          },
          invalid: {
            color: '#ef4444',
            iconColor: '#ef4444',
          },
        },
      }}
    />

    <RoundBtn 
      primary
      title='Add Payment Method'
      loading={loading}
      onClick={handleSubmit}
      width="100%"
    />
  </div>
  )
}
