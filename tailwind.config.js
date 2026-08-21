/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand-spec navy #1E2461 (primary anchor)
        navy: {
          50: '#eef0f8',
          100: '#d8dcef',
          200: '#b3bbdd',
          300: '#8a92c4',
          400: '#5f6aa6',
          500: '#3f4a87',
          600: '#2d3870',
          700: '#23295e',
          800: '#1e2461',
          900: '#181d4f',
          950: '#0F1535',
          975: '#0a0e26',
        },
        // Brand-spec orange #E85A2A (energy & action)
        orange: {
          50: '#fef3ec',
          100: '#fde2d0',
          200: '#fbc2a2',
          300: '#f89a6b',
          400: '#f47644',
          500: '#E85A2A',
          600: '#cf4a17',
          700: '#ac3914',
          800: '#892e15',
          900: '#702714',
        },
        // Brand-spec gold #C8820A (premium signal)
        gold: {
          50: '#fef8e7',
          100: '#fcebbf',
          200: '#f9d57f',
          300: '#f4ba3f',
          400: '#e29c17',
          500: '#C8820A',
          600: '#a36608',
          700: '#7d4d0a',
          800: '#5f3b0b',
        },
        // Brand-spec teal #006D77 (BETs identity)
        teal: {
          50: '#e6f4f5',
          100: '#bee0e3',
          200: '#7fc1c8',
          300: '#3fa1ac',
          400: '#198494',
          500: '#006D77',
          600: '#005a63',
          700: '#00484f',
          800: '#00363b',
        },
        // Near-pure white range — section surfaces stay clean & quiet
        cream: {
          50: '#FFFFFF',
          100: '#FCFCFD',
          200: '#F7F8FA',
          300: '#E4E7EB',
          400: '#CBD0D6',
          500: '#A8AEB6',
        },
        // Charcoal #2E2E2E body text (never pure black)
        charcoal: {
          DEFAULT: '#2E2E2E',
          light: '#666677',
        },
        slate: {
          soft: '#F7F8FA',
          mute: '#666677',
        },
      },
      fontFamily: {
        // Sora for display/headlines/numbers per brand spec
        display: ['Sora', 'Outfit', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
        // Outfit primary for body & details — modern, friendly, pairs well with Sora
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        'extra-tight': '-0.035em',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(102, 102, 119, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(102, 102, 119, 0.07) 1px, transparent 1px)',
        'grid-pattern-light':
          'linear-gradient(to right, rgba(30, 36, 97, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 36, 97, 0.04) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(circle at 50% 0%, rgba(232, 93, 38, 0.12), transparent 60%)',
      },
      boxShadow: {
        'enterprise': '0 10px 40px -10px rgba(30, 36, 97, 0.25)',
        'enterprise-lg': '0 30px 80px -20px rgba(30, 36, 97, 0.35)',
        'glow-orange': '0 0 40px -5px rgba(232, 93, 38, 0.45)',
        'glow-gold': '0 0 40px -5px rgba(200, 130, 10, 0.4)',
        'glow-teal': '0 0 40px -5px rgba(0, 109, 119, 0.35)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      animation: {
        'float': 'float 9s ease-in-out infinite',
        'float-slow': 'float 13s ease-in-out infinite',
        'pulse-slow': 'pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 60s linear infinite',
        'shimmer': 'shimmer 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'whatsapp-pulse': 'whatsapp-pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sheen': 'sheen 7s linear infinite',
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'spin-slow': 'spin 28s linear infinite',
        'spin-reverse-slow': 'spin-reverse 32s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: 0.8 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
        'whatsapp-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(37, 211, 102, 0)' },
        },
        sheen: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(200%)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
