import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        lexend:["Lexend Tera", "sans-serif"],
        julius:["Julius Sans One","sans-serif"],
        irish:["Irish Grover","system-ui"]
      },
      colors:{
        "border-orange":"#E0AD28",
        "inputdivcolor":"#966919"
      },
      letterSpacing:{
        "widest":"0.7em"
      }
    },
  },
  plugins: [],
}
export default config
