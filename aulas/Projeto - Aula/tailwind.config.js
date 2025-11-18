/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Olha todos os arquivos HTML na raiz
    "./src/**/*.{html,js}", // Olha todos os arquivos HTML e JS dentro de uma pasta 'src'
  ],
  theme: {
    extend: {      
      colors: {
        'primary': '#4F46E5', // Cor de destaque
        'primary-dark': '#4338CA',
        'sidebar-bg': '#1F2937', // Cor de fundo da sidebar (gray-800)
        'sidebar-text': '#D1D5DB', // Cor de texto da sidebar (gray-300)
      }
    },
  },
  plugins: [],
}

