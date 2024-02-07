/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        '--bg-color': '#f3f4f6',
        '--text-700': '#374151',
        '--text-400': '#94a3b8',
        '--text-500': '#64748b',
        '--text-100': '#f1f5f9',
        '--text-300': '#d1d5db',
        '--white ': '#fff',
        '--primary-700': '#4338ca',
        '--primary-600': '#4f46e5',
        '--primary-100': '#e0e7ff',
        '--rose-500': '#f43f5e',
        '--violet-700': '#6d28d9',
        '--red': '#CC2D4A',
        '--light-green': '#E2F1E8',
        '--light-gray': '#F2F0F2',
        '--dark-green': '#064749',
      },
      fontFamily: {
        sans: ['Vazir', ...fontFamily.sans],
      },
    },
    screens: {
      mobile: '390px',
      tablet: '768px',
      laptop: '1024px',
      // desktop: '1280px',
    },
  },
  plugins: [],
};
