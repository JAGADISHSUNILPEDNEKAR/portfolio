import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        serif: ['var(--font-serif)'],
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glitch-1': 'glitch-1 2.5s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glitch-1': {
          '0%': { clipPath: 'inset(20% 0 30% 0)' },
          '20%': { clipPath: 'inset(60% 0 10% 0)' },
          '40%': { clipPath: 'inset(40% 0 50% 0)' },
          '60%': { clipPath: 'inset(80% 0 5% 0)' },
          '80%': { clipPath: 'inset(10% 0 70% 0)' },
          '100%': { clipPath: 'inset(30% 0 20% 0)' },
        },
        'glitch-2': {
          '0%': { clipPath: 'inset(25% 0 58% 0)' },
          '20%': { clipPath: 'inset(75% 0 5% 0)' },
          '40%': { clipPath: 'inset(43% 0 38% 0)' },
          '60%': { clipPath: 'inset(5% 0 85% 0)' },
          '80%': { clipPath: 'inset(92% 0 2% 0)' },
          '100%': { clipPath: 'inset(2% 0 95% 0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config