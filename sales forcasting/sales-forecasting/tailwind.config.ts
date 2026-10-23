import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Slate/Navy
        card: '#1e293b',
        border: '#334155',
        positive: '#10b981', // Emerald
        negative: '#f43f5e', // Rose
        accent: '#6366f1', // Indigo
      },
    },
  },
  plugins: [],
}

export default config
