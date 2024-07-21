import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backgroundImg': "url('/assets/icons/loginsignup/First time.svg')",
      },
      height: {
        '7p': '7%',
      },
      width: {
        '20p': '20%',
        '30p': '30%',
        '8p': '8%'
      },
      colors: {
        textGreen: "#35BEB1",
        textGrey2: '#6B7E7D',
        textGrey1: '#A2A3A3',
        borderGrey: '#C4C4C4',
        verticalBar: '#393939',
        navBar: '#17181A',
        iconChangeColor: '#38F8E6',
        background: '#EDEDED',
        greenButton:'#35BEB1'
      },
      boxShadow: {
        'navBar': '0px 4px 6px 0px rgba(0, 0, 0, 0.20)',
        "left" : "-5px 0px 20px rgba(0, 0, 0, 0.20)",
        "top" : "0 -5px 20px rgba(0, 0, 0, 0.20)",
      },
      padding: {
        '2p': '2vw',
      },
    }
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
export default config
