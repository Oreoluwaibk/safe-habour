import Container from "@/components/dashboard/Container";
import BlogCard from "@/components/general/BlogCard";
import CustomLanding from "@/components/general/CustomLanding";
import { Button, Col, Input, Row, Tabs, TabsProps } from "antd";
import { Left } from "../../../assets/image";

export default function Home() {
  const tabItems: TabsProps["items"] = [
      {
        key: "1",
        label: <p>View all</p>,
        children: (
          <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
            
          </Row>
        )
      },
      {
        key: "2",
        label: <p>Design</p>,
        children: (
          <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
            
          </Row>
        )
  
      },
      {
        key: "3",
        label: <p>Software Development</p>,
        children: (
          <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
            
          </Row>
        )
      },
      {
        key: "5",
        label: <p>Product</p>,
        children: (
          <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
           
          </Row>
        )
      },
      {
        key: "6",
        label: <p>Customer Success</p>,
        children: (
          <Row gutter={[40, 0]} className='mt-6 md:!mt-8'>
           
          </Row>
        )
      },
    ]
  return (
    <Container active="Blogs">
      <div className="">
        <CustomLanding 
          title="Resources and Insights"
          description="The latest industry news, interviews, technologies, and resources"
          colorText="Our Blog"
          input={
            <Input 
              placeholder="Enter your email"
              className="input"
            /> 
          }
          button={<Button type="primary" className="!h-12 !w-[150px] md:w-[220px]">Subscribe</Button>}
        />

        <div className="md:!px-[100px] !px-[20px] !pt-16 !m-0">
          <Tabs 
            items={tabItems}
          />
        </div>

        <Row gutter={[15,30]} className="md:!px-[100px] !px-[20px] !pb-16 !m-0">
          <Col lg={8} sm={12} xs={24}>
            <BlogCard 
              image={Left}
              title="UX review presentations"
              description="How do you create compelling presentations that wow your collegues and impress managers?"
              poster="Olivia Rhye"
              date="20 Jan 2022"
              category="Design"
            />
          </Col>
          <Col lg={8} sm={12} xs={24}>
            <BlogCard 
              image={Left}
              title="Building your API Stack"
              description="The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them."
              poster="Lana Steiner"
              date="20 Jan 2022"
              category="Design"
            />
          </Col>
          <Col lg={8} sm={12} xs={24}>
            <BlogCard 
              image={Left}
              title="Migrating to Linear 101s"
              description="Linear helps streamline software projects, sprints,links, and bugbtracking. Here’s here how to get started"
              poster="Phoenix Baker"
              date="20 Jan 2022"
              category="Design"
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
