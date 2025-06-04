/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': 'var(--bg-page)',
        'bg-card': 'var(--bg-card)',
        'text-body': 'var(--text-body)',
        'text-heading': 'var(--text-heading)',
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'danger': 'var(--color-danger)',
        'muted': 'var(--color-muted)'
      }
    }
  },
  plugins: [],
}
