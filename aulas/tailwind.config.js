/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // diretórios das aulas
    "./aula_*/**/*.html",
    "./aula_*/**/*.js",
    // raíz
    "./*.html",
    "./*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}