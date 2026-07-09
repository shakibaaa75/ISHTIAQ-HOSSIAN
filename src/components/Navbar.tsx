import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X, Menu, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";

const leftNavLinks = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
];

const rightNavLinks = [
  { label: "Qualification", href: "/qualification" },
  { label: "Documentary", href: "/documentary" },
  { label: "Projects", href: "#projects" },
];

const skillsDropdown = [
  { label: "Technical", href: "#technical" },
  { label: "Creative", href: "#creative" },
  { label: "Soft Skills", href: "#soft-skills" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [mobileSkillsOpen, setMobileSkillsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const mobileNavLinks = [
    { label: "Home", href: "/" },
    { label: "Resume", href: "/resume" },
    { label: "Skills", children: skillsDropdown },
    { label: "Qualification", href: "/qualification" },
    { label: "Documentary", href: "/documentary" },
    { label: "Projects", href: "#projects" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSkillsOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-[#F5F2ED]/85 dark:bg-[#1A1A1A]/85 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-[#1A1A1A] dark:bg-white rounded-full transition-colors duration-300" />
            <div className="w-2.5 h-2.5 bg-[#1A1A1A] dark:bg-white rounded-full transition-colors duration-300" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {leftNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-[#1A1A1A] dark:text-white"
                    : "text-[#1A1A1A]/70 dark:text-[#E5E5E5]/70 hover:text-[#555] dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Skills Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSkillsOpen(true)}
              onMouseLeave={() => setSkillsOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-[#1A1A1A] dark:text-[#E5E5E5] hover:text-[#555] dark:hover:text-white transition-colors duration-300">
                Skills
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    skillsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {skillsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                  >
                    <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-lg border border-[#E5E5E5] dark:border-[#333] py-2 px-1 min-w-[140px]">
                      {skillsDropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#F5F2ED] dark:hover:bg-[#333] rounded-md transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {rightNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-[#1A1A1A] dark:text-white"
                    : "text-[#1A1A1A]/70 dark:text-[#E5E5E5]/70 hover:text-[#555] dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Dark toggle + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-[#1A1A1A] dark:border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#1A1A1A] transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#1A1A1A] dark:text-[#E5E5E5]"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 bg-[#F5F2ED] dark:bg-[#1A1A1A] z-50 flex flex-col items-center justify-center gap-5 overflow-y-auto py-16"
          >
            {mobileNavLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center"
              >
                {link.children ? (
                  <>
                    <button
                      onClick={() => setMobileSkillsOpen((v) => !v)}
                      className="flex items-center gap-1.5 text-2xl font-bold text-[#1A1A1A] dark:text-white hover:text-[#555] dark:hover:text-[#888] transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          mobileSkillsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileSkillsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="flex flex-col items-center gap-3 overflow-hidden mt-3"
                        >
                          {link.children.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="text-base font-medium text-[#1A1A1A]/70 dark:text-white/70 hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : link.href!.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-2xl font-bold text-[#1A1A1A] dark:text-white hover:text-[#555] dark:hover:text-[#888] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href!}
                    onClick={closeMobileMenu}
                    className={`text-2xl font-bold transition-colors ${
                      isActive(link.href!)
                        ? "text-[#1A1A1A] dark:text-white"
                        : "text-[#1A1A1A]/60 dark:text-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <button
              onClick={closeMobileMenu}
              className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center text-[#1A1A1A] dark:text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
