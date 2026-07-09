import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  //   ZoomIn,
  //   ZoomOut,
  //   RotateCw,
  BookOpen,
  Layers,
  GraduationCap,
} from "lucide-react";

// ─── PDF VIEWER COMPONENT (reused from ResumePage) ───
// function PDFViewer({ url, title }: { url: string; title: string }) {
//   const [scale, setScale] = useState(1.0);
//   const [rotate, setRotate] = useState(0);
//   const [loading, setLoading] = useState(true);

//   return (
//     <div className="relative w-full">
//       {/* Toolbar */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="flex items-center justify-between gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 bg-white/80 dark:bg-[#2A2A2A]/80 backdrop-blur-sm border border-[#E5E5E5] dark:border-[#333] rounded-t-2xl"
//       >
//         <div className="hidden sm:flex items-center gap-2 min-w-0">
//           <FileText
//             size={16}
//             className="text-[#888] dark:text-[#666] shrink-0"
//           />
//           <span className="text-xs font-medium text-[#555] dark:text-[#999] truncate max-w-[110px] sm:max-w-xs">
//             {title}
//           </span>
//         </div>
//         <div className="flex items-center gap-0.5 sm:gap-1.5 ml-auto">
//           <button
//             onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
//             className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
//             title="Zoom out"
//           >
//             <ZoomOut size={14} className="text-[#555] dark:text-[#999]" />
//           </button>
//           <span className="text-[10px] sm:text-xs font-mono text-[#888] dark:text-[#666] w-9 sm:w-12 text-center">
//             {Math.round(scale * 100)}%
//           </span>
//           <button
//             onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
//             className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
//             title="Zoom in"
//           >
//             <ZoomIn size={14} className="text-[#555] dark:text-[#999]" />
//           </button>
//           <div className="w-px h-4 bg-[#E5E5E5] dark:bg-[#333] mx-0.5 sm:mx-1" />
//           <button
//             onClick={() => setRotate((r) => (r + 90) % 360)}
//             className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
//             title="Rotate"
//           >
//             <RotateCw size={14} className="text-[#555] dark:text-[#999]" />
//           </button>
//           <a
//             href={url}
//             download={title}
//             className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
//             title="Download"
//           >
//             <Download size={14} className="text-[#555] dark:text-[#999]" />
//           </a>
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
//             title="Preview"
//           >
//             <Eye size={14} className="text-[#555] dark:text-[#999]" />
//           </a>
//         </div>
//       </motion.div>

//       {/* PDF Canvas Area */}
//       <div className="relative bg-[#E5E5E5] dark:bg-[#111] rounded-b-2xl overflow-hidden border-x border-b border-[#E5E5E5] dark:border-[#333]">
//         {loading && (
//           <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#E5E5E5] dark:bg-[#111]">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//               className="w-8 h-8 border-2 border-[#1A1A1A] dark:border-white border-t-transparent rounded-full"
//             />
//           </div>
//         )}
//         <div
//           className="relative w-full overflow-hidden h-[50vh] sm:h-[65vh] lg:h-[75vh]"
//           style={{ maxHeight: "1000px" }}
//         >
//           <iframe
//             src={`${url}#toolbar=0&navpanes=0`}
//             className="absolute inset-0 w-full h-full shadow-2xl"
//             style={{
//               border: "none",
//               background: "white",
//               transform: `rotate(${rotate}deg) scale(${scale})`,
//               transformOrigin: "center center",
//               transition: "transform 0.2s ease",
//             }}
//             onLoad={() => setLoading(false)}
//             title={title}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// ─── PDF CARD (compact grid view) ───
function PDFCard({
  url,
  title,
  description,
  index,
}: {
  url: string;
  title: string;
  description: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
    >
      {/* PDF Preview Thumbnail */}
      <div className="relative h-48 sm:h-56 bg-[#E5E5E5] dark:bg-[#111] overflow-hidden">
        <iframe
          src={`${url}#toolbar=0&navpanes=0&page=1&zoom=page-fit`}
          className="w-full h-full pointer-events-none"
          style={{ border: "none" }}
          title={title}
        />
        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-[#1A1A1A]/60 dark:bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            title="Preview"
          >
            <Eye size={18} className="text-white" />
          </a>
          <a
            href={url}
            download={title}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            title="Download"
          >
            <Download size={18} className="text-white" />
          </a>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <FileText size={14} className="text-[#888] dark:text-[#666]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888] dark:text-[#666]">
            PDF Document
          </span>
        </div>
        <h3 className="text-sm font-bold text-[#1A1A1A] dark:text-white mb-1 truncate">
          {title}
        </h3>
        <p className="text-xs text-[#888] dark:text-[#666] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── SECTION HEADER ───
function SectionHeader({
  //   icon: Icon,
  label,
  title,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full bg-[#1A1A1A] dark:bg-white" />
        <p className="text-xs font-semibold tracking-widest uppercase text-[#888] dark:text-[#666]">
          {label}
        </p>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] dark:text-white leading-[0.95]">
        {title}
      </h2>
      <motion.svg
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.15, scaleX: 1 }}
        transition={{ duration: 1, delay: delay + 0.3 }}
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
  );
}

// ─── HERO POSTER SECTION ───
function HeroPoster() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative bg-white dark:bg-[#2A2A2A] rounded-3xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden shadow-lg mb-12"
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
        {/* Poster Image */}
        <img
          src="/image/documentary-poster.png"
          alt="Documentary Poster"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image doesn't exist
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        {/* Fallback placeholder */}
        <div className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#333] dark:from-[#2A2A2A] dark:to-[#111]">
          <BookOpen size={48} className="text-white/30 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white/60 tracking-tight">
            Documentary Collection
          </h2>
          <p className="text-sm text-white/40 mt-2">
            Academic & Project Documentation
          </p>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />

        {/* Poster text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                Portfolio / Documentary
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-3">
              My Documentary
            </h1>
            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              A curated collection of academic reports, project documentation,
              and research papers showcasing my journey through electrical and
              electronic engineering.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN DOCUMENTARY PAGE ───
export default function DocumentaryPage() {
  // Section 1: Academic Reports (4 PDFs)
  const academicPdfs = [
    {
      url: "/docs/report-1.pdf",
      title: "Circuit Analysis Lab Report",
      description:
        "Comprehensive analysis of RLC circuits, including transient response and frequency domain analysis using MATLAB simulations.",
    },
    {
      url: "/docs/report-2.pdf",
      title: "Digital Logic Design Project",
      description:
        "Design and implementation of a 4-bit ALU using logic gates, multiplexers, and flip-flops with Verilog HDL simulation.",
    },
    {
      url: "/docs/report-3.pdf",
      title: "PCB Design Documentation",
      description:
        "Complete PCB design workflow from schematic capture to layout using KiCAD, including DRC checks and fabrication notes.",
    },
    {
      url: "/docs/report-4.pdf",
      title: "Signal Processing Research",
      description:
        "Fourier transform analysis and digital filter design for audio signal processing applications using MATLAB and Simulink.",
    },
  ];

  // Section 2: Project Documentation (2 PDFs)
  const projectPdfs = [
    {
      url: "/docs/project-1.pdf",
      title: "Robotics Project Report",
      description:
        "Autonomous line-following robot design with PID control, sensor integration, and obstacle avoidance algorithms.",
    },
    {
      url: "/docs/project-2.pdf",
      title: "IoT Home Automation",
      description:
        "Smart home system using Arduino and ESP8266 with mobile app control, sensor monitoring, and cloud data logging.",
    },
  ];

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

      {/* ═══════ HERO POSTER ═══════ */}
      <HeroPoster />

      {/* ═══════ SECTION 1: ACADEMIC REPORTS (4 PDFs) ═══════ */}
      <div className="mb-16">
        <SectionHeader
          icon={GraduationCap}
          label="Portfolio / Academic"
          title="Academic Reports"
          delay={0.2}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[#555] dark:text-[#999] text-sm md:text-base leading-relaxed max-w-2xl mb-8"
        >
          Detailed laboratory reports and research documentation from my
          coursework at AIUB. Each report covers theoretical analysis,
          simulation results, and practical implementation of core EEE concepts.
        </motion.p>

        {/* 4 PDF Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {academicPdfs.map((pdf, i) => (
            <PDFCard
              key={pdf.title}
              url={pdf.url}
              title={pdf.title}
              description={pdf.description}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ═══════ SECTION 2: PROJECT DOCUMENTATION (2 PDFs) ═══════ */}
      <div className="mb-16">
        <SectionHeader
          icon={Layers}
          label="Portfolio / Projects"
          title="Project Documentation"
          delay={0.4}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[#555] dark:text-[#999] text-sm md:text-base leading-relaxed max-w-2xl mb-8"
        >
          Comprehensive project reports documenting the design process,
          implementation challenges, and outcomes of hands-on engineering
          projects built during my academic journey.
        </motion.p>

        {/* 2 PDF Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {projectPdfs.map((pdf, i) => (
            <PDFCard
              key={pdf.title}
              url={pdf.url}
              title={pdf.title}
              description={pdf.description}
              index={i + 4}
            />
          ))}
        </div>
      </div>

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
