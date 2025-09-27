import { ClockCircleOutlined, HeartOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tabs, TabsProps } from 'antd'
import Image from 'next/image';
import React from 'react'
import { C1, C1c, C2, C2c, C3, H1, H2, H3, P1, P2, P3, P4, S1, S1s, S2, S2s, S3, S4 } from '../../../assets/image';
import { LuChefHat } from 'react-icons/lu';
import { useRouter } from 'next/navigation';


export const ListItem = ({ label }: { label: string }) => (
  <div className='flex items-center gap-4'>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
      <path d="M9 0.5L18 9.5L9 18.5L0 9.5L9 0.5Z" fill="#820116"/>
    </svg>
    <p className='tablist'>{label}</p>
  </div>
);

const ServicesTabs = () => {
  const router = useRouter();

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: <p>Care Workers</p>,
      children: (
        <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
          <Col lg={12} sm={24} xs={24}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='lovelayout'>
                  <HeartOutlined className='text-[#670316] ' />
                </div>
                <p className='care_p'>Care Workers</p>
              </div>

              <p className='p_p'>Professional personal care and support for seniors and individuals with disabilities.</p>
              <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5'>
                <ListItem label="Personal care assistance" />
                <ListItem label="Medication reminders" />
                <ListItem label="Companionship" />
                <ListItem label="Mobility support" />
              </div>
              <Button className='w-full !h-[58px]' onClick={() => router.push("/services/care-workers")}>Learn More</Button>
            </div>
          </Col>

          <Col lg={12} sm={24} xs={24} className='mt-6 md:mt-0'>
            <Row gutter={[15, 15]}>
              <Col lg={12} sm={12} xs={12}>
                <Image src={C1} alt='c 1' className='col_img' />
              </Col>

              <Col lg={12} sm={12} xs={12} className='!flex !flex-col justify-between'>
                <Image src={C2} alt='c 1' className='col_img2' />
                <Image src={C3} alt='c 1' className='col_img2' />
              </Col>
            </Row>
          </Col>
        </Row>
      )
    },
    {
      key: "2",
      label: <p>Snow Plowing</p>,
      children: (
        <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
          <Col lg={12} sm={24} xs={24}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='lovelayout'>
                  <HeartOutlined className='text-[#670316] ' />
                </div>
                <p className='care_p'>Snow Plowing</p>
              </div>

              <p className='p_p'>Reliable snow removal experts for your comfort and safety.</p>
              <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5'>
                <ListItem label="Evening snow plowing" />
                <ListItem label="After-school snow removal" />
                <ListItem label="After-school snow removal" />
                <ListItem label="Emergency snow plowing" />
              </div>
              <Button className='w-full !h-[58px]' onClick={() => router.push("/services/snow-plowings")}>Learn More</Button>
            </div>
          </Col>

          <Col lg={12} sm={24} xs={24} className='mt-6 md:mt-0'>
            <Row gutter={[15, 15]}>
              <Col lg={12} sm={12} xs={12} className='!flex !flex-col justify-between gap-4'>
                <Image src={S2} alt='c 1' className='col_img2' />
                <Image src={S1} alt='c 1' className='col_img2' />
              </Col>

              <Col lg={12} sm={12} xs={12} className='!flex !flex-col justify-between'>
                <Image src={S3} alt='c 1' className='col_img2' />
                <Image src={S4} alt='c 1' className='col_img2' />
              </Col>
            </Row>
          </Col>
        </Row>
      )

    },
    {
      key: "3",
      label: <p>Personal Cooks</p>,
      children: (
        <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
          <Col lg={12} sm={24} xs={24}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='lovelayout'>
                  <LuChefHat className='text-[#670316] ' />
                </div>
                <p className='care_p'>Personal Cooks</p>
              </div>

              <p className='p_p'>Professional meal preparation and cooking services</p>
              <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5'>
                <ListItem label="Meal planning" />
                <ListItem label="Special diets" />
                <ListItem label="Grocery shopping" />
                <ListItem label="Kitchen cleanup" />
              </div>
              <Button className='w-full !h-[58px]'  onClick={() => router.push("/services/personal-cooks")}>Learn More</Button>
            </div>
          </Col>

          <Col lg={12} sm={24} xs={24} className='mt-6 md:mt-0'>
            <Row gutter={[15, 15]}>
              <Col lg={14} sm={12} xs={12}className='col_image'>
                <Image src={P1} alt='c 1' className='object-cover col_image' />
              </Col>
              <Col lg={10} sm={12} xs={12}className='md:!h-[186px]'>
                <Image src={P2} alt='c 1' className='!h-[186px] object-cover rounded-[12px]' />
              </Col>

              <Col lg={12} sm={12} xs={12}>
                <Image src={P3} alt='c 1'className='col_image2 object-cover' />
              </Col>
              <Col lg={12} sm={12} xs={12}>
                <Image src={P4} alt='c 1'className='col_image2 object-cover' />
              </Col>
            </Row>
          </Col>
        </Row>
      )

    },
    {
      key: "4",
      label: <p>House Chores & Cleaning</p>,
      children: (
        <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
          <Col lg={12} sm={12} xs={24}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='lovelayout'>
                  <HomeOutlined className='text-[#670316] ' />
                </div>
                <p className='care_p'>House Chores & Cleaning</p>
              </div>

              <p className='p_p'>Comprehensive home maintenance and cleaning services</p>
              <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5'>
                <ListItem label="Deep cleaning" />
                <ListItem label="Regular maintenance" />
                <ListItem label="Regular maintenance" />
                <ListItem label="Organization" />
              </div>
              <Button className='w-full !h-[58px]'  onClick={() => router.push("/services/house-chores")}>Learn More</Button>
            </div>
          </Col>

          <Col lg={12} sm={12} xs={24} className='mt-6 md:mt-0'>
            <Row gutter={[15, 15]}>
              
              <Col lg={12} sm={12} xs={12} className='!flex !flex-col justify-between gap-2'>
                <Image src={H1} alt='c 1' className='col_img2' />
                <Image src={H2} alt='c 1' className='col_img2' />
              </Col>

              <Col lg={12} sm={12} xs={12}>
                <Image src={H3} alt='c 1' className='col_img' />
              </Col>
            </Row>
          </Col>
        </Row>
      )
    },
    {
      key: "5",
      label: <p>Support Workers</p>,
      children: (
        <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
          <Col lg={12} sm={12} xs={24}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='lovelayout'>
                  <UsergroupAddOutlined className='text-[#670316] ' />
                </div>
                <p className='care_p'>Support Workers</p>
              </div>

              <p className='p_p'>Specialized support for daily living and independence</p>
              <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5'>
                <ListItem label="Daily living skills" />
                <ListItem label="Community integration" />
                <ListItem label="Transportation" />
                <ListItem label="Advocacy support" />
              </div>
              <Button className='w-full !h-[58px]'  onClick={() => router.push("/services/support-workers")}>Learn More</Button>
            </div>
          </Col>

          <Col lg={12} sm={12} xs={24} className='mt-6 md:mt-0'>
            <Row gutter={[15, 15]}>
              
              <Col lg={14} sm={12} xs={12} >
                <Image src={S1s} alt='c 1' className='col_img' />
              </Col>

              <Col lg={10} sm={12} xs={12}>
                <Image src={S2s} alt='c 1' className='col_img' />
              </Col>
            </Row>
          </Col>
        </Row>
      )
    },
    {
      key: "6",
      label: <p>Companion Workers</p>,
      children: (
        <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
          <Col lg={12} sm={24} xs={24}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='lovelayout'>
                  <ClockCircleOutlined className='text-[#670316] ' />
                </div>
                <p className='care_p'>Companion Workers</p>
              </div>

              <p className='p_p'>Social companionship and emotional support services</p>
              <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5'>
                <ListItem label="Social activities" />
                <ListItem label="Conversation" />
                <ListItem label="Light housework" />
                <ListItem label="Errands & appointments" />
              </div>
              <Button className='w-full !h-[58px]'  onClick={() => router.push("/services/companion-workers")}>Learn More</Button>
            </div>
          </Col>

          <Col lg={12} sm={24} xs={24} className='mt-6 md:mt-0'>
            <Row gutter={[15, 15]}>
              <Col lg={10} sm={12} xs={12}>
                <Image src={C1c} alt='c 1' className='col_img' />
              </Col>

              <Col lg={14} sm={12} xs={12} >
                <Image src={C2c} alt='c 1' className='col_img' />
              </Col>
            </Row>
          </Col>
        </Row>
      )
    },
  ]
  return (
    <div>
        <Tabs 
          items={tabItems}
          
        />
    </div>
  )
}

export default ServicesTabs