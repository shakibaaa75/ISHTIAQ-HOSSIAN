import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Cpu, Clock } from "lucide-react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  icon: React.ReactNode;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-black tabular-nums text-[#1A1A1A] dark:text-white transition-colors"
    >
      +{count}
      {suffix}
    </div>
  );
}

function StatItem({ value, suffix, label, delay = 0, icon }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="text-center lg:text-left"
    >
      <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
        {icon}
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-xs text-[#888] dark:text-[#666] max-w-[160px] leading-relaxed transition-colors">
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <div>
      <div className="flex justify-center lg:justify-start gap-10 md:gap-14 pt-6">
        <StatItem
          value={25}
          suffix=""
          label="Projects built with circuits and robotics"
          delay={1.0}
          icon={
            <Cpu
              size={18}
              strokeWidth={2}
              className="text-[#555] dark:text-[#888]"
            />
          }
        />
        <StatItem
          value={800}
          suffix="k"
          label="Hours spent designing and problem-solving"
          delay={1.2}
          icon={
            <Clock
              size={18}
              strokeWidth={2}
              className="text-[#555] dark:text-[#888]"
            />
          }
        />
      </div>

      {/* Circuit-trace divider */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        viewBox="0 0 300 20"
        className="w-full max-w-xs mx-auto lg:mx-0 mt-6 text-[#1A1A1A] dark:text-white"
        fill="none"
      >
        <path
          d="M0 10 H100 V4 H160 V16 H300"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="10" r="3" fill="currentColor" />
        <circle cx="160" cy="10" r="3" fill="currentColor" />
      </motion.svg>
    </div>
  );
}
