import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage:  theme => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "close-menu":"url('/assets/icon-close.svg')",
          "open-menu":"url('/assets/hamburgerwhite.svg')",
          "custom-image": "url('/assets/logoCocinero2.png')",
        }),
        keyframes: {
          rotateY: {
            from: {
              transform: 'rotateY(180deg)',
            },
            to: {
              transform: 'rotateY(-180deg)',
            },
          },
          },
      animation: {
        'rotate-y': 'rotateY 5s linear infinite', 
      },
      transform: {
        'rotate-x-90': 'rotateX(90deg)',
      },
      borderRadius:{
        '50': '50%',
      },
      colors:{
        'red2': '#ef4444',
         'gray-500-50': 'rgba(107, 114, 128, 0.1)',
         'white-500-50': 'rgba(255, 255, 255, 0.1)',
         'black-smoked':'#0b0909f0',
         'softGray':'#e6e6e680',
          'lightGray':'#3e3e3ee0',
          'global-color':'#0b0909f0',
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
       /*  inter: ['Inter', 'sans-serif'], */
        sacramento: ['Sacramento', 'cursive'],
      },

      height:{
        43:"43%",
        230:"230px",
        400:"400px",
      },
      width:{
        73:"73%",
        50:"50vw",
        300:"300px",
        500:"500px",
      },
      perspective: {
          '500': '500px',
        },
        dropShadow:{
          'custom':'0px 7px 21px rgba(230, 230, 230, 0.5)'
        },
        boxShadow: {
          'inset-custom': 'inset 0px 0px 10px 10px rgba(11, 9, 9, 0.75)', 
        },
        filter: {
          'blur-30': 'blur(30px)',
        },
       
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.perspective-none': {
          perspective: 'none',
        },
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.rotate-x-143': {
          transform: 'rotateX(143deg)',
        },
        '.before\\:-bottom-0::before': {
          content: 'var(--tw-content)',
          position: 'absolute',
          bottom: '0px', 
        },
        '.input-autofill:-webkit-autofill': {
          backgroundColor: 'rgba(255, 0, 0, 0)!important', 
          '-webkit-box-shadow': '0 0 0 30px #1e293b inset !important', 
          '-webkit-text-fill-color': '#E8f0fe  !important',
          },
         
      });
    }),
    require("flowbite/plugin"), flowbite.plugin()
  ],
};
export default config;
