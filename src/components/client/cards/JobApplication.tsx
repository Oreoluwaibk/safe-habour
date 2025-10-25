import { Col, Row } from 'antd'
import React from 'react'
import JobApplicationCard from './JobApplicationCard'

const JobApplication = () => {
  return (
    <Row gutter={[15, 15]}>
        <Col lg={24} sm={24} xs={24}>
          <JobApplicationCard />
        </Col>
    </Row>
  )
}

export default JobApplication