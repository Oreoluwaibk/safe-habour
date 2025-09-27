import Container from "@/components/dashboard/Container";
import FaqComponent from "@/components/general/Faqs";
import StillHave from "@/components/general/Stillhave";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function Home() {
  return (
    <Container active="FAQs">
      <div className="">
        <div className="flex flex-col items-center gap-3 text-center md:text-left md:!py-[80px] bg-[#FFF8F9]">
          <p className="text-[#670316] text-base font-semibold">FAQs</p>
          <p className="text-2xl md:text-[48px] text-[#1E1E1E] font-bold">
            Frequently Asked Questions
          </p>
          <p className="text-[#424242] text-xl mt-3 mb-8">
            Have questions? We’re here to help.
          </p>
          <Input 
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="input"
          />
        </div>
        <FaqComponent />
        <StillHave />
      </div>
    </Container>
  );
}
