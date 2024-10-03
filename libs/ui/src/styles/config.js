export const animationConfig = {
  "spin-reverse": "reverse-spin 1s linear infinite",
  "spin-slow": "spin 3s linear infinite",
  "spin-12": "spin 12s linear infinite",
  "spin-24": "spin 24s linear infinite",
  "spin-30": "spin 30s linear infinite",
  wiggle: "wiggle 1s ease-in-out infinite",
  "wiggle-fade": "wiggle-fade 1s ease-in-out infinite",
  slide: "slide 1s ease-in-out infinite",
  "slide-left": "slide-left 1s ease-in-out infinite",
  "park-car": "park-car 5s ease-in-out infinite",
  "slide-right": "slide-right 1s linear infinite",
  blink: "blink 2s linear infinite",
  breathe: "breathe 6s ease-in-out infinite",
  "move-right-12": "move-right 12s ease-in-out infinite",
  "move-right-24": "move-right 24s ease-in-out infinite",
  "move-right-36": "move-right 36s ease-in-out infinite",
  "move-right-48": "move-right 48s ease-in-out infinite",
  "move-right-60": "move-right 60s ease-in-out infinite",
};
export const keyframesConfig = {
  "reverse-spin": {
    from: {
      transform: "rotate(360deg)",
    },
  },
  wiggle: {
    "0%, 100%": { transform: "rotate(-3deg)" },
    "50%": { transform: "rotate(3deg)" },
  },
  "wiggle-fade": {
    "0%, 100%": { transform: "rotate(-3deg)", opacity: "0.4" },
    "50%": { transform: "rotate(3deg)", opacity: "0.9" },
  },
  blink: {
    "0%, 49%": { opacity: "1" },
    "50%, 100%": { opacity: "0" },
  },

  slide: {
    "0%": { opacity: "1" },
    "100%": { transform: "translateX(25%)" },
  },
  "move-right": {
    "0%": {
      left: "20%",
      opacity: "0",
    },
    "10%, 90%": {
      opacity: "1",
    },
    "100%": {
      left: "80%",
      opacity: "0",
    },
  },
  "park-car": {
    "0%": {
      transform: " translateX(-150%) translateY(150%) rotate(90deg)",
    },
    "30%": {
      transform: " translateY(-10%) rotate(0deg)",
    },
    "40%, 60%": {
      transform: " translateX(0%) rotate(0deg)",
    },
    "100%": {
      transform: " translateX(100%) translateY(150%)  rotate(-90deg)",
    },
  },
  "slide-right": {
    "40%,60%": {
      opacity: "1",
    },
    "46%": { transform: "translateX(25%)", opacity: "0" },
    "54%": {
      transform: "translateX(-25%)",
      opacity: "0",
    },
  },
  "slide-left": {
    "40%,60%": {
      opacity: "1",
    },
    "46%": { transform: "translateX(-25%)", opacity: "0" },
    "54%": {
      transform: "translateX(25%)",
      opacity: "0",
    },
  },
  breathe: {
    "0%, 100%": { transform: "scale(1)", opacity: "0.1" },
    "60%": {
      transform: "scale(1.5)",
      opacity: "1",
    },
  },
};
