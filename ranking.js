const rankingData = localStorage.getItem("ranking");
if (rankingData) {
  const ranking = JSON.parse(rankingData);
  const tableBody = document.querySelector("#ranking-table tbody");

  // Limpa o conteúdo existente na tabela
  tableBody.innerHTML = "";

  // Percorre os dados do ranking e adiciona cada item na tabela
  ranking.forEach((player) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = player.nome;
    row.appendChild(nameCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = player.pontuacao;
    row.appendChild(scoreCell);

    tableBody.appendChild(row);
  });
}
