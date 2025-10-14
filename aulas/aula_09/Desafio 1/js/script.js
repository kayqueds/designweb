const btnBuscar = document.getElementById("btnBuscar");
const btnExportarCSV = document.getElementById("btnExportarCSV");
const btnExportarXLSX = document.getElementById("btnExportarXLSX");
const tabela = document.getElementById("tabelaDistritos");
const tbody = tabela.querySelector("tbody");
const msg = document.getElementById("mensagem");
let ultimoResultado = [];

// Buscar dados
btnBuscar.addEventListener("click", async () => {
  const codigo = document.getElementById("codigoMunicipio").value.trim();
  tbody.innerHTML = "";
  tabela.style.display = "none";
  msg.textContent = "";
  btnExportarCSV.disabled = true;
  btnExportarXLSX.disabled = true;
  ultimoResultado = [];

  if (!codigo) {
    msg.textContent = "⚠️ Informe um código de município.";
    return;
  }

  try {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${codigo}/distritos`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Erro ao consultar API.");

    const data = await response.json();

    if (data.length === 0) {
      msg.textContent = "Nenhum distrito encontrado para este município.";
      return;
    }

    ultimoResultado = data;
    btnExportarCSV.disabled = false;
    btnExportarXLSX.disabled = false;
    tabela.style.display = "table";

    // Preencher tbody
    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.municipio.nome}</td>
        <td>${item.municipio.microrregiao.nome}</td>
        <td>${item.municipio.microrregiao.mesorregiao.nome}</td>
        <td>${item.municipio.microrregiao.mesorregiao.UF.sigla} - ${item.municipio.microrregiao.mesorregiao.UF.nome}</td>
        <td>${item.municipio.microrregiao.mesorregiao.UF.regiao.nome}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error(error);
    msg.textContent = "❌ Erro ao buscar dados. Tente novamente.";
  }
});

// Exportar CSV
btnExportarCSV.addEventListener("click", () => {
  if (ultimoResultado.length === 0) return;

  let csv = "ID Distrito;Nome Distrito;Município;Microrregião;Mesorregião;UF;Região\n";

  ultimoResultado.forEach(item => {
    csv += `${item.id};${item.nome};${item.municipio.nome};${item.municipio.microrregiao.nome};${item.municipio.microrregiao.mesorregiao.nome};${item.municipio.microrregiao.mesorregiao.UF.sigla} - ${item.municipio.microrregiao.mesorregiao.UF.nome};${item.municipio.microrregiao.mesorregiao.UF.regiao.nome}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "distritos_ibge.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Exportar Excel
btnExportarXLSX.addEventListener("click", () => {
  if (ultimoResultado.length === 0) return;

  const dadosPlanilha = ultimoResultado.map(item => ({
    "ID Distrito": item.id,
    "Nome Distrito": item.nome,
    "Município": item.municipio.nome,
    "Microrregião": item.municipio.microrregiao.nome,
    "Mesorregião": item.municipio.microrregiao.mesorregiao.nome,
    "UF": `${item.municipio.microrregiao.mesorregiao.UF.sigla} - ${item.municipio.microrregiao.mesorregiao.UF.nome}`,
    "Região": item.municipio.microrregiao.mesorregiao.UF.regiao.nome
  }));

  const ws = XLSX.utils.json_to_sheet(dadosPlanilha);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Distritos");
  XLSX.writeFile(wb, "distritos_ibge.xlsx");
});
