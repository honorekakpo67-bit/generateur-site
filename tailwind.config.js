export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0B0D',
        surface: '#111317',
        elevated: '#171A20',
        line: '#242832',
        lineSoft: '#1B1F26',
        accent: '#A3E635',
        accentDim: '#7FB92A',
        ink: '#F3F5F8',
        inkMuted: '#98A0AE',
        inkFaint: '#5F6774',
        danger: '#F87171',
        info: '#7DD3FC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      keyframes: {
        caret: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        caret: 'caret 1s steps(1, end) infinite',
      },
    },
  },
}
