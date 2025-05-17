/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary palette
        'ink-blue': '#0D1B2A',
        'solar-yellow': '#FFD60A',
        'eco-leaf': '#28A745',
        'soft-lilac': '#C8A2C8',
        'sky-blue': '#4DA8DA',
        'coral-red': '#FF6F61',
        'carbon-black': '#2C2C2C',
        'gray-100': '#F5F5F5',
        
        // Add semantic color usage
        primary: '#0D1B2A',
        secondary: '#FFD60A',
        success: '#28A745',
        info: '#4DA8DA',
        warning: '#FFD60A',
        danger: '#FF6F61',
        light: '#F5F5F5',
        dark: '#2C2C2C',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D1B2A 0%, #4DA8DA 35%, #FFD60A 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      height: {
        'screen-80': '80vh',
        'screen-40': '40vh',
        'screen-60': '60vh',
      },
    },
  },
  plugins: [],
}; 