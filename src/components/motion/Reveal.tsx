"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

function motionProps(delay: number, immediate: boolean) {
  return {
    initial: { opacity: 0, y: 18 },
    transition: { duration: 0.45, ease: "easeOut" as const, delay },
    ...(immediate
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
        }),
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: RevealProps) {
  return (
    <motion.div className={className} {...motionProps(delay, immediate)}>
      {children}
    </motion.div>
  );
}

export function RevealText({
  children,
  className,
  delay = 0,
  immediate = false,
}: RevealProps) {
  return (
    <motion.p className={className} {...motionProps(delay, immediate)}>
      {children}
    </motion.p>
  );
}
