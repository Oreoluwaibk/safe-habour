import { Col, Row } from 'antd'
import Image from 'next/image';
import React from 'react'

interface props {
    image: any;
    title: string;
    description: string;
    reverse?: boolean;
}
const ImageText = ({
    image,
    title,
    description,
    reverse
}: props) => {
  return (
    <Row className={`${!reverse ? "md:!flex-row-reverse" : ""} md:!px-[100px] !px-[20px] md:py-12 mt-12 md:mt-0`} gutter={[0, 15]}>
        <Col lg={12} sm={24} xs={24} className={`${reverse ? "" : "!flex !justify-end"}`}>
            <Image src={image} alt={title} />
        </Col>
        <Col lg={12} sm={24} xs={24} className='!flex !flex-col !justify-center !gap-4'>
            <p className='visionHead'>{title}</p>
            <p className='visionp'>{description}</p>
        </Col>
    </Row>
  )
}

export default ImageText