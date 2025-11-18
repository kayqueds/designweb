document.addEventListener('DOMContentLoaded', () => {
            const menuButtons = document.querySelectorAll('.menu-btn');
            const menuToggle = document.getElementById('menu-toggle');
            const menuCloseToggle = document.getElementById('menu-close-toggle'); // NOVO BOTÃO
            const sidebar = document.getElementById('sidebar');

            // --- Lógica para Submenus (Desktop e Mobile) ---
            menuButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const submenuId = button.getAttribute('aria-controls');
                    const submenu = document.getElementById(submenuId);
                    const isExpanded = button.getAttribute('aria-expanded') === 'true';
                    const icon = button.querySelector('svg:last-child'); // O ícone da seta

                    // Fecha todos os submenus, a menos que seja o que está sendo clicado
                    document.querySelectorAll('.submenu-content').forEach(content => {
                        if (content !== submenu && !content.classList.contains('hidden')) {
                            content.classList.add('hidden');
                            // Reseta o estado ARIA e a rotação do ícone
                            const otherButton = content.previousElementSibling;
                            otherButton.setAttribute('aria-expanded', 'false');
                            otherButton.querySelector('svg:last-child').style.transform = 'rotate(0deg)';
                        }
                    });

                    // Alterna o submenu clicado
                    if (isExpanded) {
                        submenu.classList.add('hidden');
                        button.setAttribute('aria-expanded', 'false');
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        submenu.classList.remove('hidden');
                        button.setAttribute('aria-expanded', 'true');
                        icon.style.transform = 'rotate(-180deg)'; // Gira a seta para cima
                    }
                });
            });

            // --- Lógica de Toggle da Sidebar (Apenas para Telas Pequenas) ---
            const toggleSidebar = () => {
                sidebar.classList.toggle('-translate-x-full');
            };

            // Por padrão, esconde a sidebar em telas menores que LG
            const setupMobileSidebar = () => {
                const isLargeScreen = window.innerWidth >= 1024;
                if (!isLargeScreen) {
                    // Adiciona classes para torná-lo móvel e escondido por padrão
                    sidebar.classList.add('transform', '-translate-x-full', 'absolute', 'z-20');
                } else {
                    // Remove classes móveis em desktop
                    sidebar.classList.remove('transform', '-translate-x-full', 'absolute', 'z-20');
                }
            };
            
            setupMobileSidebar(); // Configuração inicial

            // Adiciona o evento de clique ao botão de abrir (header)
            menuToggle.addEventListener('click', toggleSidebar);

            // Adiciona o evento de clique ao NOVO botão de fechar (sidebar)
            if (menuCloseToggle) {
                menuCloseToggle.addEventListener('click', toggleSidebar);
            }

            // Fecha a sidebar ao redimensionar (se for para desktop)
            window.addEventListener('resize', () => {
                setupMobileSidebar();
            });
        });
    // Lista de produtos (compartilhada entre as páginas)
const produtos = [
  { nome: 'Notebook Gamer', categoria: 'Eletrônicos', estoque: 12, min: 5, max: 15, previsao: 10 },
  { nome: 'Camiseta Dry Fit', categoria: 'Vestuário', estoque: 4, min: 10, max: 30, previsao: 20 },
  { nome: 'Tênis Esportivo', categoria: 'Calçados', estoque: 20, min: 10, max: 25, previsao: 18 },
  { nome: 'Fone Bluetooth', categoria: 'Eletrônicos', estoque: 8, min: 10, max: 20, previsao: 15 },
  { nome: 'Livro JavaScript', categoria: 'Livros', estoque: 5, min: 5, max: 10, previsao: 8 },
  { nome: 'Câmera Ação', categoria: 'Fotografia', estoque: 2, min: 5, max: 10, previsao: 6 },
  { nome: 'Mochila Executiva', categoria: 'Acessórios', estoque: 25, min: 10, max: 20, previsao: 12 },
  { nome: 'Relógio Smart', categoria: 'Tecnologia', estoque: 9, min: 10, max: 15, previsao: 13 },
  { nome: 'Cadeira Gamer', categoria: 'Móveis', estoque: 7, min: 3, max: 8, previsao: 6 },
  { nome: 'Garrafa Térmica', categoria: 'Utilidades', estoque: 18, min: 8, max: 20, previsao: 15 }
];

// ==========================================
// TABELA DE PRODUTOS - produtos.html
// ==========================================
const tabela = document.getElementById("tabelaProdutos");
const select = document.getElementById("filtroCategoria");

// Renderizar a tabela com base em uma lista
function renderizarTabela(lista) {
  tabela.innerHTML = "";
  lista.forEach(p => {
    let status = "";
    if (p.estoque < p.min) {
      status = '<span class="status baixo">Baixo</span>';
    } else if (p.estoque > p.max) {
      status = '<span class="status excedente">Excedente</span>';
    } else {
      status = '<span class="status normal">Normal</span>';
    }

    const row = `
      <tr>
        <td>${p.nome}</td>
        <td>${p.categoria}</td>
        <td>${p.estoque}</td>
        <td>${p.min}</td>
        <td>${p.max}</td>
        <td>${status}</td>
      </tr>
    `;
    tabela.innerHTML += row;
  });
}

// Filtro por categoria com combobox
function filtrarPorCategoria() {
  const categoriaSelecionada = select.value;
  if (categoriaSelecionada === "todas") {
    renderizarTabela(produtos);
  } else {
    const filtrados = produtos.filter(p => p.categoria === categoriaSelecionada);
    renderizarTabela(filtrados);
  }
}

// Inicializa a tabela na página de produtos
if (tabela) {
  renderizarTabela(produtos);
}