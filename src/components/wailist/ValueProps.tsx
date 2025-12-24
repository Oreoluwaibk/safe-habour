import { CheckCircleFilled, HomeFilled } from "@ant-design/icons";
import { Button, Card, Col, List, Row } from "antd";
import { BsBagFill } from "react-icons/bs";

const verifiedList = [
  {id: 1, title: "Verified Helpers", description: "Every caregiver is background-checked and verified"},
  {id: 2, title: "Personal Care + Home Support", description: "From bathing assistance to snow clearing—all in one place"},
  {id: 3, title: "Choose What Works", description: "Select helpers based on your needs, skills, and budget"},
  {id: 4, title: "FREE for First 200 Families", description: "No platform fees when you're among our first 200 Seekers"},
]

const verifiedList2 = [
  {id: 1, title: "Set Your Own Rate", description: "You decide what your time and skills are worth"},
  {id: 2, title: "Use All Your Skills", description: "Get paid for personal care, housekeeping, snow clearing, and more"},
  {id: 3, title: "Flexible Schedule", description: "Work when it suits your life"},
  {id: 4, title: "Keep 85%", description: "Simple 15% platform fee—you keep the rest"},
]
const ValueProp = () => {
  const handleScroll = () => {
    const el = document.getElementById("seeker-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondScroll = () => {
    const el = document.getElementById("helper-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="value-prop py-10 mt-5 px-8">
      <Row gutter={[15, 30]} className="m-0! p-0!">
        <Col lg={12} sm={24} xs={24}>
          <Card className="hover:scale-101 ease-in duration-300" classNames={{ header: "py-4!",body: "flex flex-col gap-5"}} title={<HomeFilled className="color-bg text-4xl" />}>
            <p className="text-4xl font-semibold text-[#1e1e1e]">Complete Support for Independent Living</p>

            <List 
              dataSource={verifiedList}
              itemLayout="vertical"
              renderItem={(item) => (
                <div className="mb-2">
                  <div className="flex items-start gap-2">
                    <CheckCircleFilled className="color-bg text-base mt-1" />
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-semibold color-bg">{item.title}</p>
                       <p className="text-[#343434]">{item.description}</p>
                    </div>
                  </div>
                </div>
              )}  
            />

            <p className="text-base mb-3">Whether you&rsquo;re a senior seeking to stay independent at home or a family member finding support for a loved one, SafeHarbour Care connects you with trusted, qualified Helpers who provide <span className="font-semibold">non-medical homecare services</span>—from personal care and housekeeping to snow clearing and home chores.</p>

            <p className="text-base p-7 px-6 bg-[#FFFAFB] border-l-4 border-l-[#670316] rounded-lg mb-6"><span className="font-semibold">Launch Special</span>: Be among the first 200 families in Winnipeg, Steinbach, Ottawa, or Mississauga to join and book care completely FREE—no booking fees, no platform charges, forever.</p>

            <Button className='w-full md:w-fit text-base! px-8!' onClick={handleScroll}>Claim Your Free Booking Spot</Button>
          </Card>
        </Col>

         <Col lg={12} sm={24} xs={24}>
          <Card className="hover:scale-101 ease-in duration-300" classNames={{ header: "py-4!", body: "flex flex-col gap-5"}} title={<BsBagFill className="color-bg text-4xl" />}>
            <p className="text-4xl font-semibold text-[#1e1e1e]">Meaningful Work. Your Way.</p>

            <List 
              dataSource={verifiedList2}
              itemLayout="vertical"
              renderItem={(item) => (
                <div className="mb-2">
                  <div className="flex items-start gap-2">
                    <CheckCircleFilled className="color-bg text-base mt-1" />
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-semibold color-bg">{item.title}</p>
                       <p className="text-[#343434]">{item.description}</p>
                    </div>
                  </div>
                </div>
              )}  
            />

            <p className="text-base mb-3">Join professional caregivers in Winnipeg, Steinbach, Ottawa, and Mississauga providing <span className="font-semibold">non-medical homecare and home support services.</span> Set your rates, choose your clients, work when you want.</p>

            <p className="text-base p-7 px-6 bg-[#FFFAFB] border-l-4 border-l-[#670316] rounded-lg mb-6"><span className="font-semibold">Transparent Pricing</span>: We charge 15% on bookings to maintain our platform, verify Helpers, and ensure safe transactions. You keep 85% of every dollar you earn.</p>

            <Button className='w-full md:w-fit text-base! px-8!' onClick={handleSecondScroll}>Register Now</Button>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ValueProp;
