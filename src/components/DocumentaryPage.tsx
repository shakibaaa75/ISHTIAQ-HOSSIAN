import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  X,
  BookOpen,
  Layers,
  GraduationCap,
  CircuitBoard,
  Cpu,
  Droplets,
} from "lucide-react";

// ─── BOTTOM SHEET PDF VIEWER ───
function PDFSheet({
  url,
  title,
  isOpen,
  onClose,
}: {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      setLoading(true);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
          style={{ touchAction: "none" }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel — full height, no header bar, PDF fills everything */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full sm:h-[90vh] sm:max-w-4xl
                       bg-white/70 dark:bg-[#1A1A1A]/70 backdrop-blur-xl
                       border border-white/40 dark:border-white/10
                       rounded-t-3xl sm:rounded-3xl shadow-2xl
                       overflow-hidden"
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-[#1A1A1A] dark:border-white border-t-transparent rounded-full"
                />
              </div>
            )}

            <iframe
              key={url}
              src={`${url}#toolbar=1&navpanes=0&view=FitH`}
              className="w-full h-full"
              style={{ border: "none" }}
              onLoad={() => setLoading(false)}
              title={title}
            />

            {/* Floating close button — overlays the PDF, doesn't take its own bar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full
                         bg-white/70 dark:bg-black/50 backdrop-blur-md
                         border border-white/40 dark:border-white/10
                         flex items-center justify-center shadow-md
                         hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors group"
              title="Close"
            >
              <X
                size={16}
                className="text-[#555] dark:text-[#999] group-hover:text-red-500 transition-colors"
              />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── PDF CARD (clickable, opens bottom sheet) ───
function PDFCard({
  url,
  title,
  description,
  index,
  icon: Icon = FileText,
  tag = "PDF Document",
}: {
  url: string;
  title: string;
  description: string;
  index: number;
  icon?: React.ElementType;
  tag?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setIsSheetOpen(true)}
        className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
      >
        {/* Thumbnail */}
        <div className="relative h-48 sm:h-56 bg-[#E5E5E5] dark:bg-[#111] overflow-hidden">
          <iframe
            src={`${url}#toolbar=0&navpanes=0&page=1&zoom=page-fit`}
            className="w-full h-full pointer-events-none"
            style={{ border: "none" }}
            title={title}
          />
          <div
            className={`absolute inset-0 bg-[#1A1A1A]/60 dark:bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
              <Eye size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon size={14} className="text-[#888] dark:text-[#666]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#888] dark:text-[#666]">
              {tag}
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

      <PDFSheet
        url={url}
        title={title}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </>
  );
}

// ─── SECTION HEADER ───
function SectionHeader({
  icon: Icon,
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

// ─── HERO POSTER ───
function HeroPoster() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative bg-white dark:bg-[#2A2A2A] rounded-3xl border border-[#E5E5E5] dark:border-[#333] overflow-hidden shadow-lg mb-12"
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
        <img
          src="/image/documentary-poster.png"
          alt="Documentary Poster"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#333] dark:from-[#2A2A2A] dark:to-[#111]">
          <BookOpen size={48} className="text-white/30 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white/60 tracking-tight">
            Documentary Collection
          </h2>
          <p className="text-sm text-white/40 mt-2">
            Academic & Project Documentation
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
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

// ─── MAIN PAGE ───
export default function DocumentaryPage() {
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

  const hardwarePdfs = [
    {
      url: "/docs/",
      title: "Digital Code Lock System",
      description:
        "Secure 5-digit code lock using CD4017 decade counters, 555 timer IC, and logic gates for sequential password-based access control.",
      icon: Cpu,
      tag: "Hardware Project",
    },
    {
      url: "/docs/Water-Tank-Water-Level-Indicator (2).pptx.pdf",
      title: "Water Tank Water Level Indicator",
      description:
        "Water level monitoring using BC547 transistors and LED indicators to prevent overflow and conserve energy in residential applications.",
      icon: Droplets,
      tag: "Hardware Project",
    },
  ];

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

      <HeroPoster />

      {/* ═══════ ACADEMIC REPORTS ═══════ */}
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

      {/* ═══════ HARDWARE PROJECTS (YOUR NEW ONES) ═══════ */}
      <div className="mb-16">
        <SectionHeader
          icon={CircuitBoard}
          label="Portfolio / Hardware"
          title="Hardware Projects"
          delay={0.4}
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[#555] dark:text-[#999] text-sm md:text-base leading-relaxed max-w-2xl mb-8"
        >
          Hands-on circuit design and hardware implementation projects built
          using discrete components, ICs, and breadboard prototyping. These
          projects demonstrate practical digital and analog electronics skills.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {hardwarePdfs.map((pdf, i) => (
            <PDFCard
              key={pdf.title}
              url={pdf.url}
              title={pdf.title}
              description={pdf.description}
              index={i + 4}
              icon={pdf.icon}
              tag={pdf.tag}
            />
          ))}
        </div>
      </div>

      {/* ═══════ PROJECT DOCUMENTATION ═══════ */}
      <div className="mb-16">
        <SectionHeader
          icon={Layers}
          label="Portfolio / Projects"
          title="Project Documentation"
          delay={0.6}
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-[#555] dark:text-[#999] text-sm md:text-base leading-relaxed max-w-2xl mb-8"
        >
          Comprehensive project reports documenting the design process,
          implementation challenges, and outcomes of hands-on engineering
          projects built during my academic journey.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
          {projectPdfs.map((pdf, i) => (
            <PDFCard
              key={pdf.title}
              url={pdf.url}
              title={pdf.title}
              description={pdf.description}
              index={i + 6}
            />
          ))}
        </div>
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
