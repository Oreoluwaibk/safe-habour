import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        tablet: "700px"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty:{
        'max-height': 'max-height'
      },
      colors: {
        pBlue: "#003E8F",
        pGrey: "#667085",
        pHead: "#1E1E1E",
        pList: "#424242",
        primary: "#670316",
        topMenuHead: "#0E0E0E",
        dashHeadText: "#050505",
        dashParagraphText: "#616161",
        cardText: "#858585",
        cardNum: "#0E0B0A",
        graphHead: "#101828",
        graphText: "#667085",
        bggrey: "#F6F6F6",
        bgcolor: "#C598A1",
        footerBg: "#250007"
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        opensans: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
