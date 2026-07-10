/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marketClay: "#C6602E",
        deepPalm: "#1F3D2B",
        harmattanSand: "#F2E9DC",
        ripePepper: "#A32F2F",
        beverageTeal: "#2E6B63",
        charcoalInk: "#2B2320",
      },
      fontFamily: {
        display: ["Fraunces", "Lora", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'warm': '10px',
      },
      backgroundImage: {
        'woven-pattern': "url('/src/assets/woven-pattern.svg')",
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
