import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-sm border-b border-[#E5E5E5] px-6 md:px-12 py-2.5"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#888]">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-[#555] transition-colors duration-200 flex items-center gap-1"
              >
                {index === 0 && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                )}
                {item.label}
              </a>
            ) : (
              <span className="text-[#1A1A1A] font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
