import React from 'react';
import { motion } from 'motion/react';

interface MotionSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const MotionSection: React.FC<MotionSectionProps> = ({ id, className = '', children }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
