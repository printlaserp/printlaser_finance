import type { Config } from "tailwindcss"

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Nunito', 'Inter', 'sans'],
      },
      screens: {
        'max-sm': {'max': '639px'}
      },
      height: {
        'transaction-container': 'calc(100vh - 96px)', // Adiciona uma classe customizada para altura
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
export default config
