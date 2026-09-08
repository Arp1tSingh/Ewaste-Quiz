/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0B3D2E',
          light: '#145C43',
          dark: '#062A1F',
        },
        emerald: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        mint: {
          DEFAULT: '#A7F3D0',
          light: '#D1FAE5',
        },
        offwhite: '#F7F7F2',
        charcoal: {
          DEFAULT: '#1F2937',
          light: '#374151',
        },
        amber: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(11, 61, 46, 0.12)',
        'card-lg': '0 12px 40px -8px rgba(11, 61, 46, 0.18)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-up': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'pop': { '0%': { transform: 'scale(0.9)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
        'toast-in': { '0%': { opacity: 0, transform: 'translateY(-8px) translateX(-50%)' }, '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' } },
        'glow': { '0%,100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(16,185,129,0)' } },
        'count-up': { '0%': { opacity: 0.4 }, '100%': { opacity: 1 } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.45s ease-out',
        'pop': 'pop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'toast-in': 'toast-in 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
