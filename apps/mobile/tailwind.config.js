/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
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
        display: ["Fraunces", "Lora"],
        sans: ["Inter", "System"],
      },
    },
  },
  plugins: [],
}
