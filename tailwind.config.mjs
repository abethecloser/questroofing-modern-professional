/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0A0B0D',
          900: '#111318',
          850: '#171A20',
          800: '#1D2028',
          750: '#242836',
          700: '#2A3144',
          600: '#3A4460'
        },
        slateDark: {
          900: '#0E1117',
          800: '#141A24',
          700: '#1B2434'
        },
        constructionAmber: {
          500: '#F6B43B',
          400: '#FFD07A'
        }
      },
      boxShadow: {
        glowAmber: '0 0 0 1px rgba(246,180,59,0.35), 0 18px 55px rgba(246,180,59,0.18)'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};

