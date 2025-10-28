// darkmode.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  const html = document.documentElement;

  // Define tema salvo no localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }

  toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  });
});
