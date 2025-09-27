"use client"
import Container from "@/components/dashboard/Container";
import { Button, Checkbox, Col, Form, Input, InputNumber, Row } from "antd";
import Image from "next/image";
import { Contact } from "../../../assets/image";
import "@/app/styles/form.css"
import Link from "next/link";


const FormItem = Form.Item;
export default function Home() {
  const [form] = Form.useForm();
  return (
    <Container active="Contact">
      <Row className="contact" gutter={[0, 15]}>
        <Col lg={12} sm={24} xs={24} className="mt-6 md:mt-0">
          <Image src={Contact} alt="Contact Us" />
        </Col>

        <Col lg={12} sm={24} xs={24} className="!flex !flex-col !justify-center gap-4">
          <p className="touch">Get in touch</p>
          <p className="friend">Our friendly team would love to hear from you.</p>

          <Form form={form} layout="vertical">
          <Row className="" gutter={[15, 0]}>
            <Col lg={12} sm={24} xs={24}>
               <FormItem label="First name">
                <Input placeholder="First name" />
              </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <FormItem label="Last name">
                <Input placeholder="Last name" />
              </FormItem>
            </Col>
          </Row>

          <FormItem label="Email">
            <Input placeholder="you@company.com" />
          </FormItem>

          <FormItem label="Phone number">
            <InputNumber placeholder="+1 (555) 000-0000" className="!w-full" />
          </FormItem>

          <FormItem label="Message">
            <Input.TextArea placeholder="" rows={7} />
          </FormItem>

          <FormItem label="" className="flex items-center gap-3">
            <Checkbox title="You agree to our friendly privacy policy." className="!mr-4"  />
            <span className="agree">You agree to our friendly <Link className="form-link" href="/privacy-policy">privacy policy.</Link> </span>
          </FormItem>

          <FormItem label="">
            <Button className="button_form" type="primary">Send message</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </Container>
  );
}
