import { Col, List, Row } from "antd";

const onboardingSteps = [
  {
    id: 1,
    step: 1,
    title: "Join the Waitlist",
    description: "Secure one of the first 200 FREE booking spots"
  },
  {
    id: 2,
    step: 2,
    title: "Launch Day (Feb 1st)",
    description: "Receive your early access link"
  },
  {
    id: 3,
    step: 3,
    title: "Browse Verified Helpers",
    description: "All Helpers are background-checked"
  },
  {
    id: 4,
    step: 4,
    title: "Book Care",
    description: "Pay only Helper rate—no platform fees"
  }
];

const helperOnboarding = [
  {
    id: 1,
    step: 1,
    title: "Register Interest",
    description: "Takes 5 minutes"
  },
  {
    id: 2,
    step: 2,
    title: "We’ll Contact You",
    description: "Before Feb 1st with next steps"
  },
  {
    id: 3,
    step: 3,
    title: "Complete Application",
    description: "Upload background checks after Feb 1st"
  },
  {
    id: 4,
    step: 4,
    title: "Start Earning",
    description: "Accept bookings and get paid"
  }
];


const HowItWorks = () => {
  return (
    <section className="py-12 px-2 lg:px-60 bg-[#F9FAFB]" id="how-it-works">
      <div className="">
        <h2 className="color-bg text-4xl text-center font-semibold mb-10">How It Works</h2>

        <Row gutter={[25, 25]} className="m-0! p-0!">
          <Col lg={12} sm={24} xs={24}>
            <h2 className="color-bg text-2xl text-left font-semibold mb-4">For Seekers</h2>

            <List 
              dataSource={onboardingSteps}
              renderItem={( item ) => (
                <div className="flex items-start gap-4 mb-2">
                  <span className="h-6 w-6 flex items-center justify-center font-medium text-[#670318] mt-0.5 text-sm bg-[#FFE4E9] rounded-full">{item.id}</span>

                  <div className="flex flex-col gap-1">
                    <p className="text-[#670318] font-semibold text-lg">{item.title}</p>
                    <p className="text-[#343434] text-base">{item.description}</p>
                  </div>
                </div>
              )}
            />
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <h2 className="color-bg text-2xl text-left font-semibold mb-4">For Helpers</h2>

            <List 
              dataSource={helperOnboarding}
              renderItem={( item ) => (
                <div className="flex items-start gap-4 mb-2">
                  <span className="h-6 w-6 flex items-center justify-center font-medium text-[#670318] mt-0.5 text-sm bg-[#FFE4E9] rounded-full">{item.id}</span>

                  <div className="flex flex-col gap-1">
                    <p className="text-[#670318] font-semibold text-lg">{item.title}</p>
                    <p className="text-[#343434] text-base">{item.description}</p>
                  </div>
                </div>
              )}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HowItWorks;
