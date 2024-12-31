// Animation classes
export const animations = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  fadeInDown: "animate-fade-in-down",
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  stagger: (index: number) => `animate-delay-${index * 100}`
} as const;

// Named exports for convenience
export const { fadeIn, fadeInUp, fadeInDown, slideInLeft, slideInRight, stagger } = animations;