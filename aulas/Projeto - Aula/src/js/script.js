document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const menuCloseToggle = document.getElementById('menu-close-toggle');
    const sidebar = document.getElementById('sidebar');

    // --- Lógica para Submenus (Desktop e Mobile) ---
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const submenuId = button.getAttribute('aria-controls');
            const submenu = document.getElementById(submenuId);
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const icon = button.querySelector('svg:last-child');

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
                icon.style.transform = 'rotate(-180deg)';
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
    
    setupMobileSidebar();

    // Adiciona o evento de clique ao botão de abrir (header)
    menuToggle.addEventListener('click', toggleSidebar);

    // Adiciona o evento de clique ao botão de fechar (sidebar)
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
// (Parte mantida do script anterior)
// ==========================================
const tabela = document.getElementById("tabelaProdutos");
const select = document.getElementById("filtroCategoria");

function renderizarTabela(lista) {
  // ... (código mantido)
}

function filtrarPorCategoria() {
  // ... (código mantido)
}

if (tabela) {
  // renderizarTabela(produtos);
}

// ==========================================
// NOVAS FUNÇÕES E DADOS PARA USUÁRIOS
// ==========================================

const usuarios = [
  { id: 101, nome: 'Ana Souza', email: 'ana@exemplo.com', perfil: 'Admin', status: 'Ativo' },
  { id: 102, nome: 'Bruno Costa', email: 'bruno@exemplo.com', perfil: 'Editor', status: 'Pendente' },
  { id: 103, nome: 'Carla Lima', email: 'carla@exemplo.com', perfil: 'Leitor', status: 'Ativo' },
  { id: 104, nome: 'David Alves', email: 'david@exemplo.com', perfil: 'Editor', status: 'Inativo' },
  { id: 105, nome: 'Elisa Ferreira', email: 'elisa@exemplo.com', perfil: 'Admin', status: 'Ativo' }
];

function renderizarTabelaUsuarios(lista) {
  const tabelaUsuarios = document.getElementById("tabelaUsuarios");
  if (!tabelaUsuarios) return;

  tabelaUsuarios.innerHTML = "";
  lista.forEach(u => {
    let statusClass = '';
    let statusText = u.status;
    
    if (u.status === 'Ativo') {
      statusClass = 'bg-green-100 text-green-800';
    } else if (u.status === 'Inativo') {
      statusClass = 'bg-red-100 text-red-800';
    } else {
      statusClass = 'bg-yellow-100 text-yellow-800';
    }

    const row = `
      <tr class="border-b hover:bg-gray-50">
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${u.id}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap font-medium">${u.nome}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${u.email}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${u.perfil}</td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span class="p-1.5 text-xs font-medium uppercase tracking-wider ${statusClass} rounded-lg bg-opacity-50">
            ${statusText}
          </span>
        </td>
        <td class="p-3 text-sm text-gray-700 whitespace-nowrap space-x-2">
          <button class="text-blue-500 hover:text-blue-700 transition" title="Editar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7 1l4-4m-7 4L9 8m-2 7a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4z"></path></svg>
          </button>
          <button class="text-green-500 hover:text-green-700 transition" title="Duplicar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v4a2 2 0 002 2h4a2 2 0 002-2V7m-5 8v2m-3 0h6m4-5H4m16 0V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-3"></path></svg>
          </button>
          <button class="text-red-500 hover:text-red-700 transition" title="Excluir">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </td>
      </tr>
    `;
    tabelaUsuarios.innerHTML += row;
  });
}

const tabelaUsuariosElement = document.getElementById("tabelaUsuarios");
if (tabelaUsuariosElement) {
    renderizarTabelaUsuarios(usuarios);

    const filtroInput = document.getElementById("filtroBusca");
    if(filtroInput) {
        filtroInput.addEventListener('keyup', (e) => {
            const termo = e.target.value.toLowerCase();
            const filtrados = usuarios.filter(u => 
                u.nome.toLowerCase().includes(termo) || 
                u.email.toLowerCase().includes(termo) ||
                u.perfil.toLowerCase().includes(termo)
            );
            renderizarTabelaUsuarios(filtrados);
        });
    }
}


// ==========================================
// NOVA FUNÇÃO DE CONSULTA CEP VIA API (Viacep)
// ==========================================
async function consultarCEP(cepParam = null) {
  const cepInput = document.getElementById("cep");
  const cep = cepParam || (cepInput ? cepInput.value.trim() : null);
  const resultado = document.getElementById("resultado");
  const mapa = document.getElementById("mapa");
  
  // Limpar resultados e mostrar loading
  if (resultado) resultado.innerHTML = `<p class="text-blue-500 animate-pulse">Buscando CEP...</p>`;
  if (mapa) mapa.innerHTML = '';
  
  if (!cep) {
    if (resultado) resultado.innerHTML = `<p class="p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg">Por favor, digite um CEP.</p>`;
    return;
  }

  // Remove formatação (hífen)
  const cepLimpo = cep.replace(/\D/g, '');

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();

    if (data.erro) {
      if (resultado) {
        resultado.style.display = "block";
        // Aplicação de classes Tailwind para erro
        resultado.innerHTML = `<p class="p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg">CEP não encontrado. Por favor, preencha o endereço manualmente.</p>`;
      }
      if (mapa) mapa.style.display = "none";
      return;
    }

    if (resultado) {
      resultado.style.display = "block";
      // Aplicação de classes Tailwind para sucesso
      resultado.innerHTML = `
        <div class="mt-2 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
          <h4 class="text-lg font-semibold text-blue-800 mb-2">Endereço Encontrado</h4>
          <p class="text-sm text-gray-700"><strong>CEP:</strong> ${data.cep}</p>
          <p class="text-sm text-gray-700"><strong>Logradouro:</strong> ${data.logradouro}</p>
          <p class="text-sm text-gray-700"><strong>Complemento:</strong> ${data.complemento || "—"}</p>
          <p class="text-sm text-gray-700"><strong>Bairro:</strong> ${data.bairro}</p>
          <p class="text-sm text-gray-700"><strong>Cidade/UF:</strong> ${data.localidade}/${data.uf}</p>
        </div>
      `;
    }

    // Monta o endereço para usar no mapa (corrigido e adaptado)
    const endereco = `${data.logradouro || ""}, ${data.bairro || ""}, ${data.localidade}, ${data.uf}`;
    const enderecoEncoded = encodeURIComponent(endereco);

    if (mapa) {
      mapa.style.display = "block";
      mapa.innerHTML = `
        <div class="mt-4 h-64 w-full bg-gray-200 rounded-lg overflow-hidden">
            <iframe
            class="w-full h-full border-0"
            loading="lazy"
            allowfullscreen
            src="https://maps.google.com/maps?q=${enderecoEncoded}&z=15&output=embed">
            </iframe>
        </div>
      `;
    }

    // Preencher campos automaticamente (se existirem)
    if (document.getElementById('logradouro')) document.getElementById('logradouro').value = data.logradouro || '';
    if (document.getElementById('bairro')) document.getElementById('bairro').value = data.bairro || '';
    if (document.getElementById('cidade')) document.getElementById('cidade').value = data.localidade || '';
    if (document.getElementById('uf')) document.getElementById('uf').value = data.uf || '';

  } catch (error) {
    console.error("Erro na consulta de CEP:", error);
    if (resultado) {
      resultado.style.display = "block";
      resultado.innerHTML = `<p class="p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg">Erro ao consultar o CEP. Tente novamente.</p>`;
    }
    if (mapa) mapa.style.display = "none";
  }
}

// ------------------------------------------
// Desenho de Gráficos com Chart.js 
// ------------------------------------------
let vendasChartInstance = null;
let categoriaChartInstance = null;
const PRIMARY_COLOR = '#29e361'; // A cor da identidade visual

function desenharGraficos() {
	// Verifica e destrói instâncias anteriores para evitar duplicatas ao navegar
	if (vendasChartInstance) vendasChartInstance.destroy();
	if (categoriaChartInstance) categoriaChartInstance.destroy();

	// --- GRÁFICO 1: Vendas Mensais (Linha) ---
	const ctxVendas = document.getElementById('vendasChart');
	if (ctxVendas) {
		vendasChartInstance = new Chart(ctxVendas, {
			type: 'line',
			data: {
				labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
				datasets: [{
					label: 'Vendas (Mil R$)',
					data: [10, 12, 9, 15, 14, 18],
					borderColor: PRIMARY_COLOR,
					backgroundColor: PRIMARY_COLOR + '33',
					tension: 0.3,
					fill: true,
					pointBackgroundColor: PRIMARY_COLOR
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false, // CRUCIAL para respeitar a altura definida no CSS
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Vendas (Mil R$)'
						}
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
	}

	// --- GRÁFICO 2: Distribuição por Categoria (Pizza/Rosca) ---
	const ctxCategoria = document.getElementById('categoriaChart');

	if (ctxCategoria) {
		categoriaChartInstance = new Chart(ctxCategoria, {
			type: 'doughnut',
			data: {
				labels: ['Notebooks', 'Smartphones', 'Periféricos', 'Acessórios'],
				datasets: [{
					label: 'Distribuição de Vendas',
					data: [45, 35, 15, 5],
					backgroundColor: [
						PRIMARY_COLOR,
						'#3498db',
						'#f39c12',
						'#e74c3c'
					],
					hoverOffset: 4
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false, // CRUCIAL para respeitar a altura definida no CSS
				plugins: {
					legend: {
						position: 'top',
					}
				}
			}
		});
	}
}

// Busca automática do CEP 01001000 ao carregar a página de cadastro (se o elemento existir)
window.onload = () => {
  if (document.getElementById("cep")) {
    // Adiciona o evento de keyup para busca automática após 8 dígitos
    const cepInput = document.getElementById("cep");
    cepInput.addEventListener('keyup', () => {
        if (cepInput.value.replace(/\D/g, '').length === 8) {
            consultarCEP(cepInput.value);
        }
    });

    // Inicia a busca com o CEP de exemplo
    consultarCEP("01001000");
  }
};
// Desenha os gráficos quando a página é carregada e os elementos existem
document.addEventListener("DOMContentLoaded", () => {
  desenharGraficos();
});