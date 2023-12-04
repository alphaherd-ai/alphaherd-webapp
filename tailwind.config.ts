import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "structure-page-bg": "#ededed",
        "structure-general": "#fff",
        "item-grey-icon-text-stroke05": "#a2a3a3",
        "divisionline-onwhite": "#c4c4c4",
        "item-main-text": "#6b7e7d",
        "accent-red": "#ff3030",
        "accent-orange": "#fc6e20",
        "accent-green": "#0f9d58",
        "accent-yellow": "#ffbf1a",
        "accent-blue": "#3c50ff",
        "light-red": "#ffeaea",
        "light-green": "#e7f5ee",
        "structure-bg": "#f4f5f7",
        "light-blue": "#ebedff",
        "light-orange": "#fff0e9",
        "primary-green": "#35beb1",
        "primary-black": "#17181a",
      },
      spacing: {},
      fontFamily: {
        "selected-14": "Satoshi",
        inherit: "inherit",
      },
      borderRadius: {
        "3xs": "10px",
        "8xs": "5px",
        "1147xl-7": "1166.7px",
        "3xl": "22px",
        "981xl": "1000px",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      xs: "12px",
      xl: "20px",
      "9xl": "28px",
      "base-5": "15.5px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
export default config
