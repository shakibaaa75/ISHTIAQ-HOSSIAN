import { motion } from "framer-motion";
import { Cpu, CircuitBoard, BarChart3, DraftingCompass } from "lucide-react";
import { useState } from "react";

// ─── SKILL DATA ───
const skillsData = [
  {
    id: "arduino",
    title: "Arduino & Microcontroller-Based Projects",
    description:
      "Designing and developing embedded electronic systems using Arduino and microcontrollers by integrating various sensors, relay modules, and control components to build smart automation, monitoring, and energy management solutions. These projects involve circuit design, programming, and testing to ensure efficient system performance.",
    icon: Cpu,
    tag: "Embedded Systems",
    image: "/image/skills/arduino-microcontroller.jpg",
  },
  {
    id: "circuit",
    title: "Circuit Design & Simulation",
    description:
      "Creating, analyzing, and testing electronic circuits using simulation software such as NI Multisim or Proteus. Designing circuits virtually to verify functionality, identify potential issues, optimize performance, and ensure reliability before building physical prototypes. Covers analog and digital circuits, microcontroller interfacing, and power management systems.",
    icon: CircuitBoard,
    tag: "NI Multisim / Proteus",
    image: "/image/skills/circuit-design.jpg",
  },
  {
    id: "matlab",
    title: "MATLAB for Engineering Applications",
    description:
      "Performing numerical analysis, mathematical modeling, and simulation of engineering systems. Used to analyze data, design and test electrical circuits, simulate control systems, and visualize results to optimize performance. Enables accurate predictions, problem-solving, and validation of engineering designs before real-world implementation.",
    icon: BarChart3,
    tag: "Simulation & Modeling",
    image: "/image/skills/matlab-engineering.jpg",
  },
  {
    id: "autocad",
    title: "AutoCAD for Architectural Development",
    description:
      "A computer-aided design (CAD) software developed by Autodesk, widely used by engineers, architects, and designers to create accurate 2D drawings and 3D models. AutoCAD improves design precision, increases productivity, and simplifies the drafting process for engineering and architectural projects.",
    icon: DraftingCompass,
    tag: "2D / 3D CAD",
    image: "/image/skills/autocad-design.jpg",
  },
];

// ─── SKILL CARD ───
function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skillsData)[0];
  index: number;
}) {
  const Icon = skill.icon;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: "easeOut" }}
      className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image Area */}
      <div className="relative w-full h-52 sm:h-56 md:h-60 bg-[#E5E5E5] dark:bg-[#111] overflow-hidden">
        {!imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-[#1A1A1A] dark:border-white border-t-transparent rounded-full"
                />
              </div>
            )}
            <img
              src={skill.image}
              alt={skill.title}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#888] dark:text-[#666]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mb-3 opacity-40"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs font-medium opacity-50">
              Replace with your image
            </span>
            <span className="text-[10px] opacity-30 mt-1">{skill.image}</span>
          </div>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#F5F2ED] dark:bg-[#1A1A1A] flex items-center justify-center shrink-0">
            <Icon
              size={18}
              strokeWidth={1.8}
              className="text-[#1A1A1A] dark:text-white"
            />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] dark:text-white leading-tight">
            {skill.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#555] dark:text-[#999] leading-relaxed mb-4">
          {skill.description}
        </p>
        <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#F5F2ED] dark:bg-[#1A1A1A] text-[#888] dark:text-[#666] border border-[#E5E5E5] dark:border-[#333]">
          {skill.tag}
        </span>
      </div>
    </motion.div>
  );
}

// ─── MAIN SKILLS PAGE ───
export default function SkillsPage() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-20 overflow-x-hidden">
      {/* Background accents */}
      <svg
        viewBox="0 0 120 200"
        className="absolute top-4 left-2 sm:top-8 sm:left-4 w-[40px] sm:w-[60px] md:w-[80px] opacity-[0.06] dark:opacity-[0.10] text-[#1A1A1A] dark:text-white pointer-events-none"
        fill="none"
      >
        <path d="M60 0 V60 H20 V120" stroke="currentColor" strokeWidth="1.2" />
        <path d="M60 60 H100 V100" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="3" fill="currentColor" />
        <circle cx="20" cy="120" r="3" fill="currentColor" />
      </svg>

      <motion.svg
        viewBox="0 0 80 80"
        className="absolute bottom-12 right-4 sm:bottom-16 sm:right-8 w-[30px] sm:w-[40px] md:w-[50px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white pointer-events-none"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
      </motion.svg>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#1A1A1A] dark:bg-white" />
          <p className="text-xs font-semibold tracking-widest uppercase text-[#888] dark:text-[#666]">
            Portfolio / Skills
          </p>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#1A1A1A] dark:text-white leading-[0.95]">
          Technical Skills
        </h1>
        <motion.svg
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.15, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewBox="0 0 200 12"
          className="w-[120px] sm:w-[160px] mt-3 text-[#1A1A1A] dark:text-white"
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
      </motion.div>

      {/* Bio text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[#555] dark:text-[#999] text-sm md:text-base leading-relaxed max-w-2xl mb-10"
      >
        Core competencies in embedded systems, circuit design, and engineering
        software. Each skill represents hands-on experience with real-world
        applications in electrical and electronic engineering.
      </motion.p>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {skillsData.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>

      {/* Bottom accent */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewBox="0 0 300 20"
        className="w-full max-w-md mx-auto mt-12 text-[#1A1A1A] dark:text-white"
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
    </section>
  );
}
