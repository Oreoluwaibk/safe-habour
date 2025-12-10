"use client"
import AdminContainer from '@/components/dashboard/AdminContainer'
import { useAuthentication } from '@/hooks/useAuthentication'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, DatePicker, Form, Image, Input, Row, Select, Upload } from 'antd'
import React, { useState } from 'react'
import { pictureUrl } from '../../../../../utils/axiosConfig'
import { RcFile } from 'antd/es/upload'
import { Icon } from '@iconify/react'
import RoundBtn from '@/components/general/RoundBtn'
import PhoneInput from 'react-phone-input-2'
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;
const Page = () => {
  const [form] = Form.useForm();
  const [ loading ] = useState(false);
  const { authentication } = useAuthentication();
  const [ isEdit, setIsEdit ] = useState(false);
  const [ uploading ] = useState(false);
  const [ initialCode ] = useState("ca");

  const handleUploadPicture = (file: RcFile) => {
    console.log(file);
    
          // const payload = {
          //     ProfilePicture: file,
          //     userId: authentication?.id 
          // }
  
          // const formData = toFormData(payload) as FormData;
          // setUploading(true);
          // updateServiceWorkerProfile(formData)
          // .then(res => {
          //     if(res.status === 200) {
          //         message.success("Profile picture uploaded successfully!")
          //         setUploading(false);
          //         handleGetAuthentication();
          //         setIsEdit(false);
          //     }
          // })
          // .catch(err => {
          //     modal.error({
          //         title: "Unable to update profile picture",
          //         content: err?.response
          //             ? createErrorMessage(err.response.data)
          //             : err.message,
          //         onOk: () => setUploading(false)
          //     });
          // })
      }
  
  // const handleFinish = () => {}

  const handleSubmit = () => {
    // console.log("Dddd");
    
  }
  return (
  <AdminContainer active='Profile'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
    <div>
      <h1 className='t-pri !font-semibold text-[32px]'>Profile</h1>
      <p className='t-pri mb-6'>Manage your professional profile and settings</p>
    </div>

    <Card
      classNames={{
        header: "",
        body: "flex flex-col gap-6"
      }}
      className=""
      loading={loading}
    >
      <Card
        title={
        <div className='flex items-center gap-2'>
          <div className='relative'>
            {authentication?.profilePicturePath && <Image src={`${pictureUrl}${authentication?.profilePicturePath}`} height={84} width={84} alt='' className='h-[84px] w-[84px] rounded-full object-cover' />}
            {!authentication?.profilePicturePath && 
              <Avatar 
                icon={<UserOutlined className='text-2xl' />} 
                alt=''
                size={84} 
                className='h-[84px] w-[84px] rounded-full object-cover' 
              />}
            {isEdit && (uploading ? <LoadingOutlined spin /> :<Upload
              className='absolute bottom-2 right-0'
              accept=".jpg, .png, .jpeg"
              beforeUpload={handleUploadPicture}
              showUploadList={false}
            >
            <div className='cursor-pointer bg-[#003E8F] w-[27px] h-[27px] rounded-full flex items-center justify-center'>
              <Icon icon="mdi:edit" color='#fff' />
            </div>
            </Upload>)}
          </div>
        </div>
        }
        classNames={{ header: "!py-4", body: "", }}
        className='!mt-0'
      >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={[15, 0]} >
          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="First Name" 
              className="font-semibold" 
              name="firstName"
            >
              <Input 
                placeholder='Enter First Name' 
                size='large' 
                style={{fontWeight: 400}}
                className='border-none'
                disabled={!isEdit}
              />
            </FormItem>
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="Last Name" 
              className="font-semibold" 
              name="lastName"
            >
              <Input 
                placeholder='Enter Last Name' 
                size='large' 
                style={{fontWeight: 400}}
                className='border-none'
                disabled={!isEdit}
              />
            </FormItem>
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="Email" 
              className="font-semibold" 
              name="email"
            >
              <Input 
                placeholder='Enter Email' 
                size='large' 
                style={{fontWeight: 400}}
                className='border-none'
                disabled={!isEdit}
              />
            </FormItem>
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="Date of Birth" 
              className="font-semibold" 
              name="dateOfBirth"
            >
              <DatePicker 
                size="large"
                className='w-full border-none'
                placeholder={authentication?.dateOfBirth ? moment(authentication.dateOfBirth).format("DD/MM/YYYY") : 'Select Date of Birth'}
                style={{width: "100%", border: "none", height:50, backgroundColor: "#f6f6f6"}}
                disabled={!isEdit}
              /> 
            </FormItem>
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="Gender" 
              className="font-semibold" 
              name="gender"
            >
              <Select size="large" style={{fontWeight: 400, height: 50}} className='border-none' disabled={!isEdit} placeholder='Female' >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </FormItem>
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="Phone Number" 
              className="font-semibold" 
              name="phoneNumber"
            >
              <PhoneInput 
                placeholder='09039476798'
                // onChange={(value, count:any) => {
                //     setCountry(count && count.countryCode.toUpperCase())
                // }}
                // inputClass='phone_input2'
                inputStyle={{width: "100%", border: "none", height:50, backgroundColor: "#f6f6f6"}}
                disabled={!isEdit}
                country={initialCode}
              />
            </FormItem>
          </Col>
          
          <Col lg={12} sm={24} xs={24}>
            <FormItem 
              label="Role" 
              className="font-semibold" 
              name="role"
            >
              <Input 
                placeholder='Super Admin' 
                size='large' 
                style={{fontWeight: 400}}
                className='border-none'
                disabled={!isEdit}
              />
            </FormItem>
          </Col>

          
          <Col lg={24} sm={24} xs={24}>
            <div key={1} className='flex items-center gap-4 justify-end'>
              <RoundBtn title={isEdit ? "Cancel" : "Edit"} primary={!isEdit} width={87} onClick={() => setIsEdit(!isEdit)} />
              {isEdit && <FormItem className='flex items-center justify-end m-0! p-0!'>
                <Button loading={loading} htmlType="submit" type="primary" className='!w-[150px] !h-[40px] !rounded-[100px]'>Save Changes</Button>              
              </FormItem>}
            </div>
            
          </Col>
        </Row>
        </Form>     
      </Card> 
    </Card>
  </Card>
  </AdminContainer>
  )
}

export default Page