import Container from "@/components/dashboard/Container";
import CustomLanding from "@/components/general/CustomLanding";
import FaqComponent from "@/components/general/Faqs";
import ImageText from "@/components/general/ImageText";
import OurVision from "@/components/general/OurVision";
import StillHave from "@/components/general/Stillhave";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Left, Right } from "../../../assets/image";
import MeetOurTeam from "@/components/general/team/MeetOurTeam";

export default function Home() {
  return (
    <Container active="About Us">
      <div className="">
        <CustomLanding 
          title="Revolutionizing Healthcare Staffing in Canada"
          description="SEO Safeharbour, your trusted partner in healthcare staffing solutions across Canada. Founded on the principles of excellence, integrity, and innovation, SEO Safeharbour is committed to transforming the healthcare industry by seamlessly connecting healthcare facilities with highly skilled professionals."
          colorText="About us"
        />
        <ImageText 
          title="Our Vision"
          description="Our vision at SEO Safeharbour is to become the premier healthcare staffing agency in Canada, renowned for our unwavering commitment to quality, reliability, and professionalism.We envision a future where every healthcare facility has access to the best talent, enabling them to deliver exceptional care to their patients."
          image={Left}
        />
        <ImageText 
          title="Our Mission"
          description="At SEO Safeharbour, our mission is clear to revolutionize healthcare staffing in Canada by providing exceptional professionals who deliver out standing patient care. We strive to bridge the gap between healthcare facilities and talented individuals, ensuring access to top-tier healthcare services nationwide."
          image={Right}
          reverse
        />
        <OurVision />
        <MeetOurTeam />
      </div>
    </Container>
  );
}
