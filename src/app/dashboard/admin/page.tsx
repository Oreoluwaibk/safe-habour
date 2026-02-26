"use client"
import AdminContainer from '@/components/dashboard/AdminContainer'
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { IActivityLog, IDashboardMetrics } from '../../../../utils/interface'
import { Icon } from '@iconify/react'
// import { UpOutlined, UpSquareFilled } from '@ant-design/icons'
import RecentActivity from '@/components/admin/cards/RecentActivity'
import { createErrorMessage } from '../../../../utils/errorInstance'
import { getActivityLogs, getDashboardAdminStats } from '@/redux/action/admin'
import { motion } from "framer-motion";

const Page = () => {
  const { modal } = App.useApp();
  const [ showMore, setShowMore ] = useState(false);
  const [ metrics, setMetric ] = useState<IDashboardMetrics>({ 
    "totalUsers": {
        "value": 7,
        "changePercent": 100
    },
    "activeJobs": {
        "value": 3,
        "pendingVerification": 0
    },
    "totalRevenue": {
        "value": 0,
        "changePercent": 0
    },
    "avgCompletionRate": {
        "value": 0,
        "changePercent": 0
    },
    "pendingKyc": {
        "value": 1
    },
    "successRate": {
        "value": 0,
        "label": "Needs improvement"
    }
  });
  const [ activities, setActivities ] = useState<IActivityLog[]>([]);
  const [ loading, setLoading ] = useState(false);

  const handleGetFeesMetrics = useCallback(() => {
    setLoading(true);
    getDashboardAdminStats()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setMetric(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get admin stats",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);

  const handleGetActivities = useCallback(() => {
    setLoading(true);
    getActivityLogs()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        const activities = res.data.data.list;
        setActivities(activities.slice(-3));
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get activity logs",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);

  useEffect(() => {
    handleGetFeesMetrics();
    handleGetActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminContainer active='Overview'>
    <Card classNames={{ body: "bg-[#f6f6f6]!"}} loading={loading}>
      <div>
        <h1 className='t-pri font-semibold! text-[32px]'>Dashboard Overview</h1>
        <p className='t-pri mb-6'>Monitor your platform&apos;s key metrics and activities</p>
      </div>

      <Row className='mt-6 mb-4' gutter={[15, 15]}>
        <Col lg={8} sm={12} xs={24}>
          <InfoWalletCards 
            title='Total Users'
            amount={metrics.totalUsers.value}
            isWallet
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>{metrics.totalUsers.changePercent}%</span>  vs last month</p>}
            icon={<Icon icon="bx:dollar" color='#670316' />}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <InfoWalletCards 
            title='Active jobs'
            amount={metrics.activeJobs.value}
            isWallet
            info={`${metrics.activeJobs.pendingVerification} pending verification`}
            icon={<Icon icon="iconoir:piggy-bank"  color='#670316' />}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <InfoWalletCards 
            title='Total Revenue'
            amount={`$${metrics.totalRevenue.value.toFixed(2)}`}
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>{metrics.totalRevenue.changePercent}%</span>  vs last month</p>}
            icon={<Icon icon="mingcute:time-line" color='#670316' />}
            isWallet
          />
        </Col>

        {showMore && <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
      style={{
        backgroundSize: 'cover', backgroundPosition: 'center' 
      }}
    >
            <Row className='mt-6 mb-4' gutter={[15, 15]}>
        <Col lg={8} sm={12} xs={24}>
          <InfoWalletCards 
            title='Avg. Completion Rate'
            amount={`${metrics.avgCompletionRate.value}%`}
            isWallet 
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>{metrics.avgCompletionRate.changePercent}%</span>  vs last month</p>}
            icon={<Icon icon="carbon:analytics" color='#670316' />}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <InfoWalletCards 
            title='Pending KYC'
            amount={metrics.pendingKyc.value}
            isWallet
            info="Requires Review"
            icon={<Icon icon="carbon:analytics" color='#670316' />}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <InfoWalletCards 
            title='Success Rate'
            amount={`${metrics.successRate.value}%`}
            isWallet
            info={metrics.successRate.label}
            icon={<Icon icon="carbon:analytics" color='#670316' />}
          />
        </Col>
        </Row>
        </motion.div>}

        <Col lg={24} sm={24} xs={24} className=''>
          <div className='flex items-center justify-center' >
            <span className='bg-[#ededed] h-6 w-6 flex items-center justify-center cursor-pointer' onClick={() => setShowMore(!showMore)}>
              <Icon icon={showMore ? "iconamoon:arrow-up-2-duotone" :"iconamoon:arrow-down-2-duotone"} color="#1e1e1e" fontSize={16}  />
            </span>
          </div>
        </Col>
        
      </Row>
      
      <Card title={<p className='text-[#1e1e1e] font-semibold text-lg'>Recent Activity</p>}>
        <Row className='' gutter={[15, 15]}>
          {activities.map((activity, i: number) => (
            <Col lg={24} sm={24} xs={24} key={i}>
              <RecentActivity activity={activity} />
            </Col>
          ))}

          {activities.length === 0 && (
            <Col lg={24} sm={24} xs={24} className='text-center'>
              <p className='t-sec text-[#1e1e1e]'>No recent activity found.</p>
            </Col>
          )}
        </Row>
      </Card>
    </Card>
    </AdminContainer>
  )
}

export default Page