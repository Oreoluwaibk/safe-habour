"use client"
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import "@/styles/howworks.css"

interface props {
  icon: ReactNode;
  title: string;
  p1: string;
  p2: string;
}
const WorkList = ({
  icon,
  title,
  p1,
  p2
}: props) => {
  return (
    <motion.div
      className='list'
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className='icon'>{icon}</div>
      <p className='title'>{title}</p>
      <p className='paragraph mb-4'>{p1}</p>
      <p className='paragraph'>{p2}</p>
    </motion.div>
  )
}

export default WorkList