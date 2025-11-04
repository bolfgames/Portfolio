/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bolf-black': '#000000',
        'bolf-white': '#FFFFFF',
        'bolf-gray': '#CCCCCC',
        'bolf-neon-blue': '#00BFFF',
        'bolf-orange': '#FFA500',
        'role-developer': '#00BFFF',
        'role-3d-artist': '#FFA500',
        'role-2d-artist': '#FFD700',
        'role-designer': '#9B59B6',
        'role-level-designer': '#2ECC71',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, rgba(0, 191, 255, 0.05) 0%, rgba(0, 0, 0, 1) 50%, rgba(255, 165, 0, 0.05) 100%)',
      },
      fontFamily: {
        sans: ['Montserrat', 'Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

