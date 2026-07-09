import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import TechBackground from "./components/TechBackground";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ResumePage from "./components/ResumePage";
import QualificationPage from "./components/QualificationPage";

function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isResume = location.pathname === "/resume";
  const isQualification = location.pathname === "/qualification";
  const hideBadge = isResume || isQualification;

  return (
    <div className="relative min-h-screen bg-[#F5F2ED] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-white font-sans selection:bg-[#1A1A1A] selection:text-white dark:selection:bg-white dark:selection:text-[#1A1A1A] transition-colors duration-300">
      <TechBackground />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/qualification" element={<QualificationPage />} />
      </Routes>

      {/* Floating name badge — hidden on resume/qualification pages for cleaner look */}
      {!hideBadge && (
        <div className="fixed bottom-6 left-6 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] px-5 py-3 rounded-full text-xs font-bold tracking-wider shadow-2xl z-50 hidden sm:block transition-colors duration-300">
          MD ISHTIAQ HOSSAIN ARNOB
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
