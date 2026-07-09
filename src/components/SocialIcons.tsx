import { motion } from "framer-motion";

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2Z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7.4 8.5L23.3 22h-6.8l-5.3-6.9L5 22H1.9l7.9-9.1L1 2h7l4.8 6.3Zm-1.2 18h1.9L7.4 4h-2Z" />
  </svg>
);

const socials = [
  { Icon: YoutubeIcon, href: "#", label: "YouTube" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
  { Icon: XIcon, href: "#", label: "X" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300 },
  },
};

export default function SocialIcons() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex items-center justify-center lg:justify-start gap-3 pt-5"
    >
      {socials.map(({ Icon, href, label }) => (
        <motion.a
          key={label}
          variants={itemVariants}
          href={href}
          aria-label={label}
          whileHover={{
            scale: 1.1,
            backgroundColor: "#1A1A1A",
            color: "#ffffff",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full border border-[#1A1A1A] dark:border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#1A1A1A] transition-all duration-300"
        >
          <Icon />
        </motion.a>
      ))}
    </motion.div>
  );
}
