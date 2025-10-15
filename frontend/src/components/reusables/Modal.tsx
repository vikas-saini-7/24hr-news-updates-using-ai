"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={clsx(
              "bg-[#151515] rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto",
              className
            )}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-500/10 transition cursor-pointer"
            >
              <IconX size={20} className="text-white/70" />
            </button>

            {/* Title */}
            {title && (
              <h2 className="text-xl mb-4 text-white font-black">{title}</h2>
            )}

            {/* Body */}
            <div className="text-white/80">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
