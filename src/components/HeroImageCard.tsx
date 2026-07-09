import { motion } from "framer-motion";
import { Globe, Monitor, Star, ArrowUpRight, Cog } from "lucide-react";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";

// Small helper so TS is happy about custom CSS properties (--ta-op-a, etc.)
// Defined in tech-animations.css — make sure that file is imported globally.
const vars = (v: Record<string, string | number>) => v as CSSProperties;

export default function HeroImageCard() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/image/IMG_0729.JPG";
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgError(true);
  }, []);

  const showImage = imgLoaded && !imgError;
  const showFallback = imgError || !imgLoaded;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative flex justify-center lg:justify-end w-full"
    >
      {/* ═══════ CIRCUIT BORDER TRACES — one-time draw-in, kept on Framer Motion (cheap, runs once) ═══════ */}
      <svg
        viewBox="0 0 340 460"
        className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-[calc(100%+16px)] sm:w-[calc(100%+24px)] h-[calc(100%+16px)] sm:h-[calc(100%+24px)] opacity-[0.10] dark:opacity-[0.18] text-[#1A1A1A] dark:text-white pointer-events-none"
        fill="none"
        style={{ maxWidth: "calc(680px + 24px)" }}
      >
        <motion.path
          d="M20 2 H100 V8 H180 V2 H260 V8 H320"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M338 20 V120 H332 V200 H338 V280 H332 V360 H338 V440"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M320 458 H240 V452 H160 V458 H80 V452 H20"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M2 440 V340 H8 V260 H2 V180 H8 V100 H2 V20"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 3, ease: "easeInOut" }}
        />
        <motion.circle
          cx="20"
          cy="2"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        />
        <motion.circle
          cx="320"
          cy="2"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7 }}
        />
        <motion.circle
          cx="338"
          cy="20"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9 }}
        />
        <motion.circle
          cx="338"
          cy="440"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.1 }}
        />
        <motion.circle
          cx="320"
          cy="458"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3 }}
        />
        <motion.circle
          cx="20"
          cy="458"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        />
        <motion.circle
          cx="2"
          cy="440"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.7 }}
        />
        <motion.circle
          cx="2"
          cy="20"
          r="2.5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.9 }}
        />
        <rect
          x="150"
          y="0"
          width="20"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />
        <rect
          x="150"
          y="454"
          width="20"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      {/* ═══════ BLINKING LED STATUS DOTS — now CSS-driven ═══════ */}
      <div className="absolute -top-1 -right-1">
        <div
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/60 dark:bg-green-400/60 ta-pulse"
          style={vars({
            "--ta-op-a": 0.3,
            "--ta-op-b": 1,
            animationDuration: "1.5s",
          })}
        />
      </div>
      <div className="absolute -bottom-1 -left-1">
        <div
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500/60 dark:bg-amber-400/60 ta-pulse"
          style={vars({
            "--ta-op-a": 0.2,
            "--ta-op-b": 0.8,
            animationDuration: "2s",
            animationDelay: "0.5s",
          })}
        />
      </div>
      <div className="absolute top-1/2 -right-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full bg-red-500/50 dark:bg-red-400/50 ta-pulse"
          style={vars({
            "--ta-op-a": 0.2,
            "--ta-op-b": 0.7,
            animationDuration: "1.2s",
            animationDelay: "1s",
          })}
        />
      </div>

      {/* ═══════ FLOATING SCHEMATIC CAPACITOR — now CSS-driven ═══════ */}
      <svg
        viewBox="0 0 40 60"
        className="absolute -top-6 -left-3 sm:-top-8 sm:-left-4 w-[22px] sm:w-[30px] md:w-[40px] opacity-[0.10] dark:opacity-[0.18] text-[#1A1A1A] dark:text-white pointer-events-none ta-float"
        fill="none"
        style={vars({ animationDuration: "5s" })}
      >
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="25"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="30"
          y1="0"
          x2="30"
          y2="25"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="25"
          x2="40"
          y2="25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="35"
          x2="40"
          y2="35"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="35"
          x2="10"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="30"
          y1="35"
          x2="30"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="10" cy="60" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="60" r="2" fill="currentColor" opacity="0.5" />
      </svg>

      {/* ═══════ ROTATING GAUGE / DIAL — now CSS-driven ═══════ */}
      <div
        className="absolute -bottom-8 right-0 sm:-bottom-10 sm:right-0 lg:-right-4 w-[40px] sm:w-[50px] md:w-[65px] lg:w-[80px] opacity-[0.10] dark:opacity-[0.18] pointer-events-none ta-sway"
        style={vars({ animationDuration: "6s" })}
      >
        <svg
          viewBox="0 0 100 60"
          fill="none"
          className="w-full text-[#1A1A1A] dark:text-white"
        >
          <path
            d="M10 55 A45 45 0 0 1 90 55"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {[0, 15, 30, 45, 60, 75, 90].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 50 - 40 * Math.cos(rad);
            const y1 = 55 - 40 * Math.sin(rad);
            const x2 = 50 - 35 * Math.cos(rad);
            const y2 = 55 - 35 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.8"
              />
            );
          })}
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="20"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="ta-needle"
            style={vars({
              animationDuration: "4s",
              transformOrigin: "50px 55px",
              transformBox: "view-box",
            })}
          />
          <circle cx="50" cy="55" r="4" fill="currentColor" opacity="0.6" />
          <text
            x="8"
            y="58"
            fill="currentColor"
            fontSize="6"
            fontFamily="monospace"
            opacity="0.5"
          >
            0
          </text>
          <text
            x="86"
            y="58"
            fill="currentColor"
            fontSize="6"
            fontFamily="monospace"
            opacity="0.5"
          >
            100
          </text>
        </svg>
      </div>

      {/* ===== MAIN GRAY CARD ===== */}
      <div className="relative bg-[#4A4A4A] dark:bg-[#333] rounded-[28px] sm:rounded-[32px] md:rounded-[36px] lg:rounded-[40px] overflow-hidden w-full max-w-[300px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[540px] xl:max-w-[620px] 2xl:max-w-[680px] shadow-2xl aspect-[4/5]">
        {/* Signature SVG */}
        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 md:top-7 md:left-7 lg:top-8 lg:left-8 z-10 pointer-events-none w-[100px] sm:w-[120px] md:w-[135px] lg:w-[150px]">
          <svg viewBox="0 0 150 75" fill="none" className="w-full h-auto">
            <path
              d="M10 60 Q40 15 65 38 T120 28 Q135 22 145 33"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M25 55 Q55 28 80 43 T130 32"
              stroke="white"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Globe Icon — hover-only animation, kept on Framer Motion (no cost while idle) */}
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.6 }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-[#1A1A1A] dark:bg-[#111] rounded-full flex items-center justify-center cursor-pointer"
        >
          <Globe
            size={18}
            strokeWidth={1.5}
            className="text-white sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
          />
        </motion.div>

        {/* ===== PHOTO AREA ===== */}
        <div className="absolute inset-0 flex items-center justify-center pt-14 pb-6 px-5 sm:pt-16 sm:pb-8 sm:px-6 md:pt-18 md:pb-9 md:px-7 lg:pt-20 lg:pb-10 lg:px-8">
          <div
            className="relative w-[88%] h-[92%] rounded-[22px] sm:rounded-[26px] md:rounded-[28px] lg:rounded-[32px] overflow-hidden shadow-xl"
            style={{
              background: showImage
                ? "transparent"
                : "linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {showImage && (
              <img
                src="/image/IMG_0729.JPG"
                alt="MD Ishtiaq Hossain Arnob"
                className="absolute inset-0 w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
            )}

            {showFallback && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4 border-2 border-dashed border-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="text-white/60 text-xs sm:text-sm font-medium">
                  Photo
                </p>
                <p className="text-white/30 text-[10px] sm:text-xs mt-1">
                  /image/IMG_0729.JPG
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 bg-gradient-to-t from-[#333] to-transparent dark:from-[#1a1a1a] pointer-events-none" />
      </div>

      {/* ===== ROTATING GEAR ACCENT — now CSS-driven ===== */}
      <div
        className="absolute -left-4 sm:-left-6 lg:-left-9 bottom-3 text-[#1A1A1A]/10 dark:text-white/20 pointer-events-none ta-spin"
        style={vars({ animationDuration: "12s", transformOrigin: "50% 50%" })}
      >
        <Cog
          size={32}
          strokeWidth={1}
          className="sm:w-10 sm:h-10 md:w-11 md:h-11"
        />
      </div>

      {/* ===== FLOATING THUMBNAILS (existing) — one-time entrance, kept on Framer Motion ===== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute left-0 sm:-left-2 lg:-left-5 bottom-24 sm:bottom-28 md:bottom-32 flex flex-col gap-2.5 sm:gap-3"
      >
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-[#4A4A4A] dark:bg-[#555] rounded-2xl border-4 border-[#F5F2ED] dark:border-[#2a2a2a] flex items-center justify-center shadow-lg cursor-pointer"
        >
          <Monitor
            size={18}
            strokeWidth={2}
            className="text-white sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.15, rotate: -5 }}
          className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-[#4A4A4A] dark:bg-[#555] rounded-full border-4 border-[#F5F2ED] dark:border-[#2a2a2a] flex items-center justify-center shadow-lg cursor-pointer overflow-hidden"
        >
          <div className="w-full h-full bg-[#333] dark:bg-[#222] flex items-center justify-center">
            <Star
              size={16}
              fill="white"
              stroke="none"
              className="text-white sm:w-[18px] sm:h-[18px]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ===== ARROW BUTTON (existing) — one-time entrance + hover, kept on Framer Motion ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="absolute left-1.5 sm:left-2 lg:-left-3 bottom-7 sm:bottom-8 md:bottom-10"
      >
        <motion.a
          href="#portfolio"
          whileHover={{ scale: 1.15, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#1A1A1A] dark:bg-white rounded-full flex items-center justify-center shadow-xl block"
        >
          <ArrowUpRight
            size={16}
            strokeWidth={2.5}
            className="text-white dark:text-[#1A1A1A] sm:w-[18px] sm:h-[18px]"
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
