import { Col, Row } from "antd";

const cities = [
  {
    id: 1,
    name: "Winnipeg, Manitoba",
    description: "Manitoba's capital and largest city."
  },
  {
    id: 2,
    name: "Steinbach, Manitoba",
    description: "Southeast Manitoba's growing community."
  },
  {
    id: 3,
    name: "Ottawa, Ontario",
    description: "Canada's capital."
  },
  {
    id: 4,
    name: "Mississauga, Ontario",
    description: "Greater Toronto Area."
  }
];

const Cities = () => {
  return (
    <section className="cities py-12 px-8 lg:px-40" id="cities">
      <div className="flex flex-col gap-4">
        <h2 className="color-bg text-4xl text-center font-semibold">Launching in Four Great Communities</h2>

        <div className="flex flex-col items-center text-[#1e1e1e] text-lg">
          <p>February 1st, 2026</p>
        </div>

        <Row className="m-0! p-0! mt-6!" gutter={[25, 25]}>
          {cities.map((city, i) => (
            <Col lg={8} sm={12} xs={24} key={i} className="">
              <div className="flex flex-col gap-4 items-center mx-0! py-8 h-[300px] justify-center bg-[#FFFAFB] border-[#670318] border rounded-xl hover_effect">
                <span className="text-5xl">🍁</span>
                <div className="flex flex-col items-center gap-1 mt-3">
                  <p className="color-bg text-xl font-semibold">{city.name}</p>
                  <p className="text-[#343434] text-base font-medium">{city.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Cities;
