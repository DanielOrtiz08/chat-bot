// Animation utility for future enhancement
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  transition: { type: 'spring', stiffness: 300, damping: 24 }
};

export const staggerChildren = {
  staggerChildren: 0.07
};