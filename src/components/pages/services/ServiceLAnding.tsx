"use client"
import { serviceType } from '@/extras/questions';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useRouter } from 'next/navigation';

interface props {
    service?: serviceType;
}

const photoClass = "w-full rounded-xl object-cover";

const ServicePhoto = ({ src, alt, className }: { src: string | StaticImport; alt: string; className: string }) => (
    <Image src={src} alt={alt} className={`${photoClass} ${className}`} />
);

const ServiceCollage = ({ images, title }: { images: (string | StaticImport)[]; title: string }) => {
    if (images.length === 0) return null;

    if (images.length === 2) {
        return (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <ServicePhoto src={images[0]} alt={title} className="h-[220px] lg:h-[460px]" />
                <ServicePhoto src={images[1]} alt={title} className="h-[220px] lg:h-[460px]" />
            </div>
        );
    }

    if (images.length === 3) {
        return (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <ServicePhoto src={images[0]} alt={title} className="h-[250px] lg:h-[540px]" />
                <div className="flex flex-col gap-3 md:gap-4">
                    <ServicePhoto src={images[1]} alt={title} className="h-[119px] lg:h-[262px]" />
                    <ServicePhoto src={images[2]} alt={title} className="h-[119px] lg:h-[262px]" />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 items-start gap-3 md:gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
                <ServicePhoto src={images[0]} alt={title} className="h-[160px] lg:h-[280px]" />
                <ServicePhoto src={images[1]} alt={title} className="h-[130px] lg:h-[220px]" />
            </div>
            <div className="flex flex-col gap-3 pt-6 md:gap-4 md:pt-10">
                <ServicePhoto src={images[2]} alt={title} className="h-[130px] lg:h-[230px]" />
                <ServicePhoto src={images[3]} alt={title} className="h-[160px] lg:h-[290px]" />
            </div>
        </div>
    );
};

const ServiceLanding = ({ service }: props) => {
    const router = useRouter();

    return (
        <div className="dashbottom relative overflow-hidden bg-[#FFF8F9]">
            <Row gutter={[32, 24]} className="!mx-0 !items-start !px-6 !py-10 md:!px-20 md:!py-14 lg:!px-28">
                <Col lg={12} sm={24} xs={24} className="!flex !flex-col !justify-center gap-2">
                    <p className="w-fit rounded-xl bg-[#FFEFF2] px-3 py-2 text-center font-semibold text-[#670316]">Our Service</p>
                    <h1 className="text-[40px] font-semibold leading-tight text-[#1E1E1E] md:text-[56px]">
                        {service?.title}
                    </h1>
                    <p className="w-full text-lg text-[#1E1E1E] md:text-2xl">{service?.description}</p>
                    <div className="mt-4">
                        <Button type="primary" className="md:min-w-[220px]" onClick={() => router.push("/auth/choose-auth")}>Book Service Now</Button>
                    </div>
                </Col>

                <Col lg={12} sm={24} xs={24}>
                    <ServiceCollage images={service?.images ?? []} title={service?.title || "Service"} />
                </Col>
            </Row>
        </div>
    );
};

export default ServiceLanding;
