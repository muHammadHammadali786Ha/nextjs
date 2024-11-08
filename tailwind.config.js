/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#28A745', // Green color
        secondary: '#343A40', // Dark Gray color, optional
      },
      screens: {
        'xs': '480px', // Custom extra small breakpoint
        'xmd': '900px', // Custom extra-large breakpoint
        'ultra': '1920px', // Ultra-wide breakpoint
      },
    },
  },
  plugins: [],
};
