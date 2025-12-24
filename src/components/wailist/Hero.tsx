import { HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import { FaHandshake } from "react-icons/fa";

const Hero = () => {
  const handleScroll = () => {
    const el = document.getElementById("seeker-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondScroll = () => {
    const el = document.getElementById("helper-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="bg-white py-10">
      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="glass-burgundy">
            <span>Now Serving: Winnipeg | Steinbach | Ottawa | Mississauga</span>
          </div>

          <h2 className="text-3xl md:text-5xl color-bg font-bold">Trusted Care. On Your Terms.</h2>

          <p className="t-pri text-lg md:text-2xl">
            Launching February 1st, 2026
          </p>

            <div className="t-pri text-sm md:text-lg">
                <p className="">
                    SafeHarbour Care connects families with trusted, verified helpers
                    for flexible non-medical home care.
                </p>

                <p>families, seniors, and professional caregivers across Manitoba and Ontario.</p>

            </div>
            <div className='flex items-center justify-center gap-8 mt-6'>
                <Button onClick={handleScroll} icon={<HeartFilled className="color-bg" />} className='md:min-w-[220px] text-base!'>Find a Care Worker</Button>
                <Button onClick={handleSecondScroll} icon={<FaHandshake color="#fff" />} type="primary" className='md:min-w-[220px] text-base!' >Apply as a Helper</Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
