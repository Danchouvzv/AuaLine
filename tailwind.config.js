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
        'ink-blue': '#1D3A29',
        'solar-yellow': '#FFD60A',
        'eco-leaf': '#28A745',
        'soft-lilac': '#C8A2C8',
        'sky-blue': '#4DA8DA',
        'coral-red': '#FF6F61',
        'carbon-black': '#2C2C2C',
        'gray-100': '#F5F5F5',
        
        // Add semantic color usage
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: '#28A745',
        info: '#4DA8DA',
        warning: '#FFD60A',
        danger: '#FF6F61',
        light: '#F5F5F5',
        dark: '#2C2C2C',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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