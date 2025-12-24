"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { Logo } from "../../../../assets/logo";
import WorkerContainer from "@/components/dashboard/WorkerContainer";

export default function Loading() {
  return (
   <WorkerContainer active="">
   <div className="h-[90vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}   // start invisible and small
        animate={{ opacity: 1, scale: 1 }}     // animate to full size & visible
        transition={{ duration: 1, ease: "easeOut" }} // 1s smooth
      >
        <Image src={Logo} alt="Logo" className="md:w-[500px]!" />
      </motion.div>
    </div>
    
   </WorkerContainer>
  );
}
