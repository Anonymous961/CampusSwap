/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tada: {
          '0%': { transform: 'scale(1)' },
          '10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
          '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
        slideIn: {
          from: {
            right: '100%',
          },
          to: {
            right: '4rem', // Adjust the distance from the right edge as needed
          },
        },
      },
      animation: {
        tada: 'tada 1s ease-in-out infinite',
        slideIn: 'slideIn 0.5s forwards',
      },
    },
  },
  plugins: [],
}

