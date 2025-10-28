/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    // diretórios das aulas
    "./aula_*/**/*.html",
    "./aula_*/**/*.js",
    "./aula_*/desafio_*/*.html",
    "./aula_*/desafio_*/*.js",
    // raíz
    "./*.html",
    "./*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
