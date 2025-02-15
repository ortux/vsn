"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FadeInWhenVisible = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start hidden
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // Show on scroll down, hide on scroll up
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }} // Triggers when 20% is visible
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={() => setIsVisible(false)}
      className="transition-all duration-500"
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
