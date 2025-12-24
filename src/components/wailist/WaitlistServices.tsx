import { CheckOutlined, HomeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, List, Row } from "antd";

const personalService = [
  { id: 1, name: "Companionship & social engagement" },
  { id: 2, name: "Personal care assistance" },
  { id: 3, name: "Mobility assistance" },
  { id: 4, name: "Meal preparation" },
  { id: 5, name: "Medication reminders" },
  { id: 6, name: "Transportation & errands" },
  { id: 7, name: "Respite care" }
];

const householdServices = [
  { id: 1, name: "Housekeeping & cleaning" },
  { id: 2, name: "Laundry & linen changes" },
  { id: 3, name: "Light home chores" },
  { id: 4, name: "Yard work & garden maintenance" },
  { id: 5, name: "Pet care support" }
];

const winterServices = [
  { id: 1, name: "Snow Clearing" },
  { id: 2, name: "Ice salting for safety" },
  { id: 3, name: "Vechile snow clearing" }
];

const Services = () => {
  return (
    <section className="services bg-[#FFFAFB] py-12 px-8" id="services">
      <div className="flex flex-col gap-4">
        <h2 className="color-bg text-4xl text-center font-semibold">Non-Medical Homecare & Home Support Services</h2>

        <div className="flex flex-col items-center text-[#1e1e1e] text-lg">
          <p>SafeHarbour Care connects families with Helpers for everyday personal care</p>
          <p>AND home maintenance support—no medical services included.</p>
        </div>

        <Row gutter={[15, 25]} className="m-0! p-0! mt-10!">
       

          <Col lg={8} sm={12} xs={24}>
            <Card classNames={{ body: "flex flex-col gap-5", header: "px-6! py-8!"}} title={<HomeOutlined className="text-4xl text-[#BF021F]" />}>
              <p className="text-2xl font-semibold text-[#1e1e1e]">Home Maintenance</p>

              <List 
                dataSource={householdServices}
                itemLayout="vertical"
                renderItem={(item) => (
                  <div className="mb-2">
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="color-bg text-base mt-1" />
                      <div className="flex flex-col gap-1">
                        <p className="text-[#343434]">{item.name}</p>
                      </div>
                    </div>
                  </div>
                )}  
              />
            </Card>
          </Col>

          <Col lg={8} sm={12} xs={24}>
            <Card classNames={{ body: "flex flex-col gap-5", header: "px-6! py-8!"}} title={<StarOutlined className="text-[#BF021F]! text-4xl" />}>
              <p className="text-2xl font-semibold text-[#1e1e1e]">Winter Services</p>

              <List 
                dataSource={winterServices}
                itemLayout="vertical"
                renderItem={(item) => (
                  <div className="mb-2">
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="color-bg text-base mt-1" />
                      <div className="flex flex-col gap-1">
                        <p className="text-[#343434]">{item.name}</p>
                      </div>
                    </div>
                  </div>
                )}  
              />
            </Card>
          </Col>

             <Col lg={8} sm={12} xs={24}>
            <Card classNames={{ body: "flex flex-col gap-5", header: "px-6! py-8!"}} title={<UserOutlined className="text-[#BF021F]! text-4xl" />}>
              <p className="text-2xl font-semibold text-[#1e1e1e]">Personal Care & Daily Living</p>

              <List 
                dataSource={personalService}
                itemLayout="vertical"
                renderItem={(item) => (
                  <div className="mb-2">
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="color-bg text-base mt-1" />
                      <div className="flex flex-col gap-1">
                        <p className="text-[#343434]">{item.name}</p>
                      </div>
                    </div>
                  </div>
                )}  
              />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Services;
