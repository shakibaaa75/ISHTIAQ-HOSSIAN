import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
// ─── PDF VIEWER COMPONENT ───

function PDFViewer({ url }: { url: string }) {
  const [scale, setScale] = useState(1.0);
  const [rotate, setRotate] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 bg-white/80 dark:bg-[#2A2A2A]/80 backdrop-blur-sm border border-[#E5E5E5] dark:border-[#333] rounded-t-2xl"
      >
        <div className="hidden sm:flex items-center gap-2 min-w-0">
          <FileText
            size={16}
            className="text-[#888] dark:text-[#666] shrink-0"
          />
          <span className="text-xs font-medium text-[#555] dark:text-[#999] truncate max-w-[110px] sm:max-w-xs">
            Arnob&apos;s Resume.pdf
          </span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1.5 ml-auto">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={14} className="text-[#555] dark:text-[#999]" />
          </button>
          <span className="text-[10px] sm:text-xs font-mono text-[#888] dark:text-[#666] w-9 sm:w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
            title="Zoom in"
          >
            <ZoomIn size={14} className="text-[#555] dark:text-[#999]" />
          </button>
          <div className="w-px h-4 bg-[#E5E5E5] dark:bg-[#333] mx-0.5 sm:mx-1" />
          <button
            onClick={() => setRotate((r) => (r + 90) % 360)}
            className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
            title="Rotate"
          >
            <RotateCw size={14} className="text-[#555] dark:text-[#999]" />
          </button>
          <a
            href={url}
            download="Arnob_Resume.pdf"
            className="p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
            title="Download"
          >
            <Download size={14} className="text-[#555] dark:text-[#999]" />
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-1.5 rounded-lg hover:bg-[#F5F2ED] dark:hover:bg-[#333] transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={14} className="text-[#555] dark:text-[#999]" />
          </a>
        </div>
      </motion.div>

      {/* PDF Canvas Area */}
      <div className="relative bg-[#E5E5E5] dark:bg-[#111] rounded-b-2xl overflow-hidden border-x border-b border-[#E5E5E5] dark:border-[#333]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#E5E5E5] dark:bg-[#111]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-[#1A1A1A] dark:border-white border-t-transparent rounded-full"
            />
          </div>
        )}
        {/*
          Fix: previously this wrapper had `overflow-auto` AND the iframe's
          native browser PDF viewer scrolled internally too — that produced
          two visible scrollbars (one for the page, one inside the PDF).
          Now the wrapper is a fixed-height, `overflow-hidden` box, and the
          iframe fills it completely (h-full). The only scrollbar left is
          the PDF viewer's own internal one. Zoom/rotate are applied via a
          CSS transform on the iframe itself so they no longer need to
          resize/scroll the outer wrapper at all.
        */}
        <div
          className="relative w-full overflow-hidden h-[50vh] sm:h-[65vh] lg:h-[75vh]"
          style={{ maxHeight: "1000px" }}
        >
          <iframe
            src={`${url}#toolbar=0&navpanes=0`}
            className="absolute inset-0 w-full h-full shadow-2xl"
            style={{
              border: "none",
              background: "white",
              transform: `rotate(${rotate}deg) scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.2s ease",
            }}
            onLoad={() => setLoading(false)}
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
}

// ─── RESUME INFO CARD ───
function ResumeInfoCard() {
  const infoItems = [
    {
      label: "Name",
      value: "MD Ishtiaq Hossain Arnob",
    },
    {
      label: "Degree",
      value: "BSc in Electrical & Electronic Engineering",
    },
    {
      label: "University",
      value: "American International University of Bangladesh (AIUB)",
    },
    {
      label: "Expected Graduation",
      value: "June 2027",
    },
    {
      label: "Location",
      value: "Vatara, Dhaka, Bangladesh",
    },
    {
      label: "Contact",
      value: "01646770662",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] dark:bg-white flex items-center justify-center shrink-0">
          <FileText size={16} className="text-white dark:text-[#1A1A1A]" />
        </div>
        <h3 className="text-sm font-bold tracking-wide uppercase text-[#1A1A1A] dark:text-white">
          Resume Details
        </h3>
      </div>

      <div className="space-y-4">
        {infoItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#888] dark:text-[#666] mb-0.5">
              {item.label}
            </p>
            <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5] break-words">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Circuit accent */}
      <svg
        viewBox="0 0 200 20"
        className="w-full mt-6 text-[#1A1A1A] dark:text-white opacity-10"
        fill="none"
      >
        <path
          d="M0 10 H60 V4 H100 V16 H200"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="60" cy="10" r="2" fill="currentColor" />
        <circle cx="100" cy="10" r="2" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

// ─── SKILLS PREVIEW ───
function SkillsPreview() {
  const skills = [
    "Circuit Analysis",
    "Logic Design",
    "PCB Design (KiCAD)",
    "NI Multisim",
    "AutoCAD",
    "MATLAB / Simulink",
    "Robotics",
    "Microsoft Word",
    "Google Workspace",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#E5E5E5] dark:border-[#333] p-5 sm:p-6 shadow-sm"
    >
      <h3 className="text-sm font-bold tracking-wide uppercase text-[#1A1A1A] dark:text-white mb-4">
        Key Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="px-3 py-1.5 text-xs font-medium rounded-full border border-[#E5E5E5] dark:border-[#333] text-[#555] dark:text-[#999] bg-[#F5F2ED] dark:bg-[#1A1A1A] hover:border-[#1A1A1A] dark:hover:border-white transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN RESUME PAGE ───
export default function ResumePage() {
  const pdfUrl = "/image/Arnob's Resume.pdf";

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-20 overflow-x-hidden">
      {/* Background accents matching HeroSection style */}
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
            Portfolio / Resume
          </p>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#1A1A1A] dark:text-white leading-[0.95]">
          My Resume
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
        I am an aspiring Electrical and Electronic Engineering (EEE) student
        with a strong foundation in circuit analysis, logic design, and basic
        electronics. Currently pursuing a BSc in Electrical and Electronic
        Engineering, I am passionate about building real-world engineering
        solutions and exploring emerging technologies. With developing technical
        skills and a strong motivation to learn, I aim to contribute
        meaningfully to the engineering and technology industry.
      </motion.p>

      {/* Main Grid: PDF + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {/* PDF Viewer - takes 2 columns */}
        <div className="lg:col-span-2">
          <PDFViewer url={pdfUrl} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ResumeInfoCard />
          <SkillsPreview />

          {/* Download CTA */}
          <motion.a
            href={pdfUrl}
            download="Arnob_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] rounded-2xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            <Download size={16} />
            Download Resume PDF
          </motion.a>
        </div>
      </div>
    </section>
  );
}
