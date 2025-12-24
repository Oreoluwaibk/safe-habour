"use client"
import Container from "@/components/dashboard/Container";
import Image from "next/image";
import { Logo } from "../../assets/logo";
import { motion } from "framer-motion";

export default function Loading() {
  return (
   <Container active="">
   <div className="h-[90vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}   // start invisible and small
        animate={{ opacity: 1, scale: 1 }}     // animate to full size & visible
        transition={{ duration: 1, ease: "easeOut" }} // 1s smooth
      >
        <Image src={Logo} alt="Logo" className="md:w-[500px]!" />
      </motion.div>
    </div>
    
   </Container>
  );
}
