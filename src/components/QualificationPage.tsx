import { motion } from "framer-motion";
import { useState } from "react";
import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  Award,
  MapPin,
  ChevronRight,
  Microscope,
  FlaskConical,
  Atom,
  Zap,
  CircuitBoard,
  ImageIcon,
} from "lucide-react";
import type { CSSProperties } from "react";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

// ─── EDUCATION DATA ───
const educationData = [
  {
    id: "bsc",
    level: "Bachelor of Science",
    degree: "BSc. in Electrical and Electronics Engineering",
    institution: "American International University of Bangladesh",
    shortName: "AIUB",
    year: "2024 – Present",
    semester: "7th Semester",
    group: "Engineering",
    gpa: null,
    status: "ongoing",
    icon: CircuitBoard,
    color: "#1A1A1A",
    accentIcon: Zap,
    image: "/image/aiub-campus.png",
    description:
      "Pursuing a comprehensive engineering degree focused on circuit analysis, logic design, electronics, and emerging technologies. Currently in the 7th semester with hands-on project experience in robotics and PCB design.",
    highlights: [
      "Circuit Analysis & Design",
      "Digital Logic Design",
      "PCB Design (KiCAD)",
      "Robotics & Automation",
      "MATLAB / Simulink",
      "Signal Processing",
    ],
  },
  {
    id: "hsc",
    level: "Higher Secondary Certificate",
    degree: "HSC – Science",
    institution: "Milestone College",
    shortName: "Milestone",
    year: "2022 – 2023",
    semester: null,
    group: "Science",
    gpa: "5.00",
    status: "completed",
    icon: FlaskConical,
    color: "#1A1A1A",
    accentIcon: Atom,
    image: "/image/milestone-college.png",
    description:
      "Completed Higher Secondary education in the Science group with a perfect GPA. Built a strong foundation in Physics, Chemistry, Mathematics, and Biology that prepared me for engineering studies.",
    highlights: [
      "Physics & Advanced Mathematics",
      "Chemistry & Lab Work",
      "Biology Fundamentals",
      "Perfect GPA Achievement",
      "Science Fair Participation",
      "Leadership in Study Groups",
    ],
  },
  {
    id: "ssc",
    level: "Secondary School Certificate",
    degree: "SSC – Science",
    institution: "Banani Bidyaniketan School & College",
    shortName: "Banani Bidyaniketan",
    year: "2019 – 2021",
    semester: null,
    group: "Science",
    gpa: "4.94",
    status: "completed",
    icon: BookOpen,
    color: "#1A1A1A",
    accentIcon: Microscope,
    image: "/image/banani-school.png",
    description:
      "Completed Secondary School education with outstanding academic performance in the Science group. Developed early interest in technology and problem-solving through science projects and extracurricular activities.",
    highlights: [
      "Science Group Excellence",
      "Mathematics Proficiency",
      "Computer Science Basics",
      "Science Project Awards",
      "Active in Tech Clubs",
      "Consistent Academic Performance",
    ],
  },
];

// ─── INSTITUTION IMAGE CARD ───
function InstitutionImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-[#E5E5E5] dark:bg-[#1A1A1A] mb-5 group">
      {!error ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-[#1A1A1A] dark:border-white border-t-transparent rounded-full"
              />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#888] dark:text-[#666]">
          <ImageIcon size={32} strokeWidth={1.5} className="mb-2 opacity-50" />
          <span className="text-xs font-medium">{alt}</span>
          <span className="text-[10px] opacity-50 mt-1">{src}</span>
        </div>
      )}

      {/* Corner circuit accent */}
      <svg
        viewBox="0 0 40 40"
        className="absolute top-2 right-2 w-6 h-6 text-white/30 pointer-events-none"
        fill="none"
      >
        <path d="M40 0 H28 V8" stroke="currentColor" strokeWidth="1" />
        <path d="M40 0 V12" stroke="currentColor" strokeWidth="1" />
        <circle cx="28" cy="8" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

// ─── TIMELINE CONNECTOR SVG ───
function TimelineConnector({ index }: { index: number }) {
  return (
    <div className="absolute left-6 md:left-8 top-16 bottom-0 w-px">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
        className="w-full h-full origin-top"
        style={{
          background:
            "linear-gradient(to bottom, #1A1A1A 0%, #1A1A1A 60%, transparent 100%)",
        }}
      />
      {/* Circuit nodes along the line */}
      {[0.25, 0.5, 0.75].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.2 + i * 0.15 }}
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1A1A1A] dark:bg-white border-2 border-[#F5F2ED] dark:border-[#1A1A1A]"
          style={{ top: `${pos * 100}%` }}
        />
      ))}
    </div>
  );
}

// ─── EDUCATION CARD ───
function EducationCard({
  data,
  index,
  isExpanded,
  onToggle,
}: {
  data: (typeof educationData)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = data.icon;
  const AccentIcon = data.accentIcon;
  const isOngoing = data.status === "ongoing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative pl-16 md:pl-20 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.2 + index * 0.15,
          type: "spring",
          stiffness: 200,
        }}
        className={`absolute left-3 md:left-5 top-2 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 ${
          isOngoing
            ? "bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A]"
            : "bg-[#F5F2ED] dark:bg-[#2A2A2A] border-2 border-[#1A1A1A] dark:border-white text-[#1A1A1A] dark:text-white"
        }`}
      >
        <Icon size={14} strokeWidth={2} />
      </motion.div>

      {/* Connector line (except last item) */}
      {index < educationData.length - 1 && <TimelineConnector index={index} />}

      {/* Card */}
      <motion.div
        layout
        className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Card Header */}
        <div className="p-5 md:p-6 cursor-pointer" onClick={onToggle}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Status badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                    isOngoing
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-[#F5F2ED] dark:bg-[#1A1A1A] text-[#555] dark:text-[#999]"
                  }`}
                >
                  {isOngoing ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Ongoing
                    </>
                  ) : (
                    <>
                      <Award size={10} />
                      Completed
                    </>
                  )}
                </span>
                {data.gpa && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                    <Award size={10} />
                    GPA {data.gpa}
                  </span>
                )}
              </div>

              {/* Degree */}
              <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] dark:text-white leading-tight mb-1">
                {data.degree}
              </h3>

              {/* Institution */}
              <div className="flex items-center gap-1.5 text-sm text-[#555] dark:text-[#999] mb-2">
                <School size={14} className="shrink-0" />
                <span className="font-medium">{data.institution}</span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#888] dark:text-[#666]">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {data.year}
                </span>
                {data.semester && (
                  <span className="flex items-center gap-1">
                    <GraduationCap size={12} />
                    {data.semester}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {data.group}
                </span>
              </div>
            </div>

            {/* Expand toggle */}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 w-8 h-8 rounded-full bg-[#F5F2ED] dark:bg-[#1A1A1A] flex items-center justify-center text-[#555] dark:text-[#999]"
            >
              <ChevronRight size={16} />
            </motion.div>
          </div>
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 border-t border-[#E5E5E5] dark:border-[#333]">
            {/* Institution Image */}
            <div className="pt-4">
              <InstitutionImage src={data.image} alt={data.institution} />
            </div>

            {/* Description */}
            <p className="text-sm text-[#555] dark:text-[#999] leading-relaxed mb-5">
              {data.description}
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.highlights.map((highlight, i) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F2ED] dark:bg-[#1A1A1A] text-xs text-[#1A1A1A] dark:text-[#E5E5E5] font-medium"
                >
                  <AccentIcon
                    size={12}
                    className="shrink-0 text-[#888] dark:text-[#666]"
                  />
                  {highlight}
                </motion.div>
              ))}
            </div>

            {/* Circuit accent at bottom */}
            <svg
              viewBox="0 0 200 12"
              className="w-full max-w-[160px] mt-5 text-[#1A1A1A] dark:text-white opacity-10"
              fill="none"
            >
              <path
                d="M0 6 H60 V2 H100 V10 H200"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="60" cy="6" r="2" fill="currentColor" />
              <circle cx="100" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── ACADEMIC SUMMARY STATS ───
function AcademicSummary() {
  const stats = [
    {
      label: "Institutions",
      value: "3",
      sub: "AIUB, Milestone, Banani",
      icon: School,
    },
    {
      label: "Years of Study",
      value: "6+",
      sub: "2019 – Present",
      icon: Calendar,
    },
    {
      label: "Current Semester",
      value: "7th",
      sub: "BSc. EEE at AIUB",
      icon: GraduationCap,
    },
    {
      label: "Best GPA",
      value: "5.00",
      sub: "HSC – Milestone College",
      icon: Award,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] p-4 md:p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#F5F2ED] dark:bg-[#1A1A1A] flex items-center justify-center">
                <Icon size={14} className="text-[#555] dark:text-[#999]" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888] dark:text-[#666]">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-black text-[#1A1A1A] dark:text-white mb-0.5">
              {stat.value}
            </p>
            <p className="text-[10px] text-[#888] dark:text-[#666] leading-tight">
              {stat.sub}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── DECORATIVE SIDE ELEMENTS ───
function SideDecorations() {
  return (
    <>
      {/* Left side circuit trace */}
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

      {/* Rotating gear */}
      <svg
        viewBox="0 0 80 80"
        className="absolute bottom-12 right-4 sm:bottom-16 sm:right-8 w-[30px] sm:w-[40px] md:w-[50px] opacity-[0.07] dark:opacity-[0.12] text-[#1A1A1A] dark:text-white pointer-events-none ta-spin"
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

      {/* Corner bracket top right */}
      <svg
        viewBox="0 0 60 60"
        className="absolute top-3 right-4 w-[30px] sm:w-[40px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white pointer-events-none"
        fill="none"
      >
        <path d="M60 0 H40 V10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M60 0 V20" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="40" cy="10" r="2.5" fill="currentColor" />
        <circle cx="60" cy="20" r="2.5" fill="currentColor" />
      </svg>

      {/* Corner bracket bottom left */}
      <svg
        viewBox="0 0 60 60"
        className="absolute bottom-3 left-4 w-[30px] sm:w-[40px] opacity-[0.08] dark:opacity-[0.14] text-[#1A1A1A] dark:text-white pointer-events-none hidden sm:block"
        fill="none"
      >
        <path d="M0 60 H20 V50" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0 60 V40" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="20" cy="50" r="2.5" fill="currentColor" />
        <circle cx="0" cy="40" r="2.5" fill="currentColor" />
      </svg>
    </>
  );
}

// ─── MAIN QUALIFICATION PAGE ───
export default function QualificationPage() {
  const [expandedId, setExpandedId] = useState<string | null>("bsc");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-20">
      <SideDecorations />

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
            Portfolio / Qualification
          </p>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#1A1A1A] dark:text-white leading-[0.95]">
          Qualification
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
        My academic journey reflects a consistent pursuit of excellence in
        science and engineering. From building a strong foundation at Banani
        Bidyaniketan, achieving a perfect GPA at Milestone College, to currently
        advancing my engineering expertise at AIUB — each step has shaped my
        passion for innovation and problem-solving.
      </motion.p>

      {/* Summary Stats */}
      <AcademicSummary />

      {/* Education Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] dark:bg-white flex items-center justify-center">
            <GraduationCap
              size={16}
              className="text-white dark:text-[#1A1A1A]"
            />
          </div>
          <h2 className="text-sm font-bold tracking-wide uppercase text-[#1A1A1A] dark:text-white">
            Education Timeline
          </h2>
        </div>

        {/* Timeline cards */}
        <div className="relative">
          {educationData.map((item, index) => (
            <EducationCard
              key={item.id}
              data={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={() => toggleExpand(item.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom circuit accent */}
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
