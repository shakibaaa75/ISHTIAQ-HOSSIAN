import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import SocialIcons from "./SocialIcons";
import Stats from "./Stats";
import HeroImageCard from "./HeroImageCard";

// Small helper so TS is happy about custom CSS properties (--ta-op-a, etc.)
// Defined in tech-animations.css — make sure that file is imported globally.
const vars = (v: Record<string, string | number>) => v as CSSProperties;

export default function HeroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-20">
      {/* ═══════ EXISTING ACCENTS — visible on all screens (static, no change) ═══════ */}
      <svg
        viewBox="0 0 120 200"
        className="absolute top-4 left-2 sm:top-8 sm:left-4 w-[40px] sm:w-[60px] md:w-[80px] lg:w-[100px] opacity-[0.06] dark:opacity-[0.10] text-[#1A1A1A] dark:text-white pointer-events-none"
        fill="none"
      >
        <path d="M60 0 V60 H20 V120" stroke="currentColor" strokeWidth="1.2" />
        <path d="M60 60 H100 V100" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="3" fill="currentColor" />
        <circle cx="20" cy="120" r="3" fill="currentColor" />
        <circle cx="100" cy="100" r="2" fill="currentColor" />
        <rect
          x="12"
          y="112"
          width="16"
          height="8"
          rx="1"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      </svg>

      {/* Rotating gear — now CSS-driven */}
      <svg
        viewBox="0 0 80 80"
        className="absolute bottom-12 left-4 sm:bottom-16 sm:left-8 w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white pointer-events-none ta-spin"
        fill="none"
        style={vars({ animationDuration: "20s", transformOrigin: "50% 50%" })}
      >
        <circle
          cx="40"
          cy="40"
          r="18"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="40"
            y1="22"
            x2="40"
            y2="16"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${i * 45} 40 40)`}
          />
        ))}
        <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="40" cy="40" r="3" fill="currentColor" />
      </svg>

      <svg
        viewBox="0 0 60 60"
        className="absolute top-2 right-3 sm:top-4 sm:right-6 w-[20px] sm:w-[30px] md:w-[40px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white pointer-events-none"
        fill="none"
      >
        <path d="M60 0 H40 V10" stroke="currentColor" strokeWidth="1" />
        <path d="M60 0 V20" stroke="currentColor" strokeWidth="1" />
        <circle cx="40" cy="10" r="2" fill="currentColor" />
        <circle cx="60" cy="20" r="2" fill="currentColor" />
      </svg>

      {/* ═══════ VOLTAGE ARC / ZIGZAG — now CSS-driven (opacity flicker instead of JS path-draw loop) ═══════ */}
      <svg
        viewBox="0 0 80 120"
        className="absolute top-[15%] right-[5%] sm:top-[20%] sm:right-[12%] w-[25px] sm:w-[35px] md:w-[45px] lg:w-[55px] text-[#1A1A1A] dark:text-white pointer-events-none ta-flicker"
        fill="none"
        style={vars({ "--ta-op-b": 0.14, animationDuration: "2.5s" })}
      >
        <path
          d="M40 0 L25 30 L55 50 L30 80 L50 100 L40 120"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 0 L35 25 L45 45 L35 75 L45 95 L40 120"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <circle cx="40" cy="0" r="2" fill="currentColor" />
        <circle cx="40" cy="120" r="2" fill="currentColor" />
      </svg>

      {/* ═══════ SCANNING LINE — now CSS-driven ═══════ */}
      <div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1A1A1A]/15 dark:via-white/15 to-transparent pointer-events-none ta-scan"
        style={vars({ animationDuration: "6s" })}
      />

      {/* ═══════ BATTERY LEVEL INDICATOR — now CSS-driven ═══════ */}
      <div className="absolute top-[50%] right-[2%] sm:top-[55%] sm:right-[4%]">
        <svg
          viewBox="0 0 30 80"
          className="w-[16px] sm:w-[20px] md:w-[25px] opacity-[0.10] dark:opacity-[0.18] text-[#1A1A1A] dark:text-white"
          fill="none"
        >
          <rect
            x="5"
            y="8"
            width="20"
            height="64"
            rx="3"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="10"
            y="2"
            width="10"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="9"
              y={60 - i * 12}
              width="12"
              height="8"
              rx="1"
              fill="currentColor"
              className="ta-pulse"
              style={vars({
                "--ta-op-a": 0.15,
                "--ta-op-b": 0.7,
                animationDuration: "2s",
                animationDelay: `${i * 0.4}s`,
              })}
            />
          ))}
          <text
            x="15"
            y="78"
            fill="currentColor"
            fontSize="5"
            fontFamily="monospace"
            textAnchor="middle"
            opacity="0.5"
          >
            %
          </text>
        </svg>
      </div>

      {/* ═══════ FREQUENCY SPECTRUM BARS — now CSS-driven ═══════ */}
      <div className="absolute bottom-[5%] left-[8%] sm:bottom-[8%] sm:left-[15%]">
        <svg
          viewBox="0 0 120 60"
          className="w-[60px] sm:w-[80px] md:w-[100px] opacity-[0.10] dark:opacity-[0.18] text-[#1A1A1A] dark:text-white"
          fill="none"
        >
          <line
            x1="0"
            y1="55"
            x2="120"
            y2="55"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
          {[10, 25, 40, 55, 70, 85, 100].map((x, i) => {
            const heights = [20, 35, 15, 40, 25, 30, 18];
            const h = heights[i];
            return (
              <rect
                key={i}
                x={x - 4}
                y={55 - h}
                width="8"
                height={h}
                rx="2"
                fill="currentColor"
                className="ta-bar"
                style={vars({
                  animationDuration: `${1.5 + i * 0.2}s`,
                  transformOrigin: `${x}px 55px`,
                })}
              />
            );
          })}
        </svg>
      </div>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:items-start">
        {/* ===== TITLE ===== */}
        <div className="order-1 text-center lg:text-left w-full relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black leading-[0.88] tracking-tighter text-[#1A1A1A] dark:text-white transition-colors"
          >
            visual
            <br />
            engineer
          </motion.h1>

          {/* Circuit underline */}
          <motion.svg
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.15, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            viewBox="0 0 200 12"
            className="w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px] mt-3 mx-auto lg:mx-0 text-[#1A1A1A] dark:text-white"
            fill="none"
            style={{ originX: 0 }}
          >
            <path
              d="M0 6 H60 V2 H100 V10 H200"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="60" cy="6" r="2" fill="currentColor" />
            <circle cx="100" cy="6" r="2" fill="currentColor" />
          </motion.svg>
        </div>

        {/* ===== IMAGE ===== */}
        <div className="order-2 w-full flex justify-center lg:justify-end lg:row-span-2">
          <HeroImageCard />
        </div>

        {/* ===== SUBTITLE/BIO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="order-3 text-center lg:text-left w-full max-w-lg mx-auto lg:mx-0"
        >
          <p className="text-sm font-semibold tracking-wide uppercase text-[#666] dark:text-[#888] mb-2 transition-colors">
            Hi, I'm Ishtiaq Hossain
          </p>
          <p className="text-[#333] dark:text-[#ccc] text-base md:text-lg leading-relaxed mb-3 transition-colors">
            An upcoming Engineer!! I'm{" "}
            <strong className="text-[#1A1A1A] dark:text-white transition-colors">
              MD Ishtiaq Hossain Arnob
            </strong>
            , a passionate Electrical and Electronic Engineering (EEE) student
            with a strong interest in electronics, engineering design, and
            practical problem-solving.
          </p>
          <p className="text-[#555] dark:text-[#999] text-sm md:text-base leading-relaxed transition-colors">
            I specialize in circuit analysis, logic design, and robotics, and I
            enjoy applying theoretical knowledge to real-world applications.
            With a curiosity for emerging technologies and a drive to grow, I'm
            on a journey to become a skilled and adaptable engineer ready to
            make a meaningful impact.
          </p>

          <SocialIcons />
          <Stats />
        </motion.div>
      </div>
    </section>
  );
}
