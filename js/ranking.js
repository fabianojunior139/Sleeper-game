//resgatando do localStorage os dados do ranking cadastrados anteriormente
const rankingData = localStorage.getItem("ranking");

if (rankingData) {
  //passando os dados do ranking de string JSON para um objeto
  const ranking = JSON.parse(rankingData);
  //selecionando o corpo da tabela para incrementar as linhas e colunas
  const tableBody = document.querySelector("#ranking-table tbody");

  // Limpa o conteúdo existente na tabela
  tableBody.innerHTML = "";

  // Percorre os dados do ranking e adiciona cada item (usuários) na tabela
  ranking.forEach((player) => {
    //crio uma linha para cada player que existir no ranking
    const row = document.createElement("tr");

    //crio uma coluna que terá o nome do player
    const nameCell = document.createElement("td");
    //falo que o valor é o nome do usuário cadastrado no ranking
    nameCell.textContent = player.nome;
    //incluo como filho da linha a coluna de nome
    row.appendChild(nameCell);

    //crio uma coluna que terá a pontuação do player
    const scoreCell = document.createElement("td");
    //falo que o valor é o score do usuário cadastrado no ranking
    scoreCell.textContent = player.score;
    //incluo como filho da linha a coluna de pontuação
    row.appendChild(scoreCell);

    //incluo como filho da tabela cada linha criada
    tableBody.appendChild(row);
  });
}
