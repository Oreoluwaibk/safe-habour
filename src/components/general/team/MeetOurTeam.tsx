import { Col, Row } from 'antd'
import React from 'react'
import TeamCard from './TeamCard';
import "@/styles/team.css";
import { Team1, Team2, Team3, Team4 } from '../../../../assets/image';

const MeetOurTeam = () => {
  return (
    <div className='team_div'>
      <p className='tttile'>Meet our team</p>
      <p className='tedes'>Behind every successful staffing solution is a team of dedicated professionals committed to excellence. At SEO Safeharbour, our team is comprised of experienced recruiters, healthcare consultants, and support staff who are passionate about making a difference in the healthcare industry.</p>

      <Row gutter={[15, 30]}>
        <Col lg={6} sm={12} xs={24}>
          <TeamCard 
            image={Team1}
            name='Olivia Rhye'
            description='Former co-founder of Opendoor. Early staff at Spotify and Clearbit.'
            position='Founder & CEO'
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <TeamCard 
            image={Team2}
            name='Phoenix Baker'
            description='Lead engineering teams at Figma, Pitch, and Protocol Labs.'
            position='Engineering Manager'
          />
        </Col>

        <Col lg={6} sm={12} xs={24}>
          <TeamCard 
            image={Team3}
            name='Lana Steiner'
            description='Former PM for Linear, Lambda School, and On Deck.'
            position='Product Manager'
          />
        </Col>

        <Col lg={6} sm={12} xs={24}>
          <TeamCard 
            image={Team4}
            name='Demi Wilkinson'
            description='Former frontend dev for Linear, Coinbase, and Postscript.'
            position='Frontend Developer'
          />
        </Col>

      </Row>
    </div>
  )
}

export default MeetOurTeam