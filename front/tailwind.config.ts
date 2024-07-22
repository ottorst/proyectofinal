import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "close-menu":"url('/assets/icon-close.svg')",
          "open-menu":"url('/assets/hamburgerwhite.svg')"
      },
      colors:{
         'gray-500-50': 'rgba(107, 114, 128, 0.1)',
         'black-smoked':' #0b0909f0',
         
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
