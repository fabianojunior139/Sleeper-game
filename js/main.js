//selecionando os itens que para serem alterados no código
const timerElement = document.getElementById("stopwatch");
const startButton = document.getElementById("button-start");
const targetName = document.getElementById("target-name");
const divButtons = document.getElementById("buttons");
const buttonsContainer = document.getElementById("buttonsContainer");
const currentLevel = document.getElementById("level");
const description = document.getElementById("description");
const rankingForm = document.getElementById("ranking-form");
const rankingButton = document.getElementById("ranking-button");
//inicializando a variável score, que vai ter a pontuação do usuário ao longo do jogo.
let score = 0;
//variável level que controlará os níveis do jogo.
let level = 1;
//inicializando o array buttons como vazio. posteriormente este será utilizado para criar os botões que o usuário irá clicar para jogar.
let buttons = [];
//essa variável recebe a cor que a palavra alvo receberá, ela será utilizada para comparar se o usuário clicou no botão de cor igual a cor da palavra alvo.
let targetNameColor;
//no jogo temos duas situações que o usuário perde: quando acaba o tempo, e quando o usuário erra a cor do botão em que a palavra aparece.
//eu utulizo essa variável para indicar ao resto do código que o motivo de perca do usuário foi o erro de clique, para o programa não chamar a função endGame() duas vezes.
let userMissedClick = false;
//variável que vai controlar o tempo do cronômetro em milissegundos
let timeLeft;
//variável que controla o loop do cronômetro
let timerInterval;

//função que será responsável por iniciar o jogo
function startGame() {
  //ao iniciar o jogo, seto a variável userMissedClick como false, caso o usuário tenha errado o clique na rodada passada
  userMissedClick = false;
  //Desabilitando o botão de iniciar o jogo enquanto o jogo estiver rolando
  startButton.disabled = true;
  //Inicializando o timer
  timerStart();
  //Inicializando a palavra alvo com a cor selecionada aleatoriamente e guardando o valor na variável targetNameColor para futuras comparações
  targetNameColor = raffleTargetName();
  //Criando os botões que o usuário clicará para jogar
  createButtons();
}

//Função que inicializar o timer
function timerStart() {
  //a variável timeLeft receberá um valor em milissegundos de acordo com o level, os números podem ser encontrados na função verifylevel
  timeLeft = verifyLevel();
  //em todo início de jogo eu chamo essa função timerStart. utilizando o clearInterval aqui eu consigo resetar o intervalo que foi rodado anteriormente
  //e o cronômetro rodar de acordo com o valor que receber na variável timeLeft.
  clearInterval(timerInterval);
  //Neste bloco de código utilizo o setInterval para rodar a função timerUpdate() a cada 10 milissegundos, assim fazendo o efeito de timer
  timerInterval = setInterval(() => {
    //Verificando se o tempo restante chega a 0
    if (timeLeft >= 0) {
      //essa função é responsável por atualizar o valor em tela do timer
      timerUpdate();
      //Reduzindo o valor inicial (o que vier da variável timeLeft) de 10 em 10.
      timeLeft -= 10;
    } else {
      //Quando o clearInterval é chamado, o bloco de código referente ao setInterval
      //é parado, nesse caso é parado quando o tempo restante alcança 0
      clearInterval(timerInterval);
      //habilitando novamente o botão para iniciar o jogo
      startButton.disabled = false;
      //resetando o level para o 1
      level = 1;
      //aqui é onde uso a variável userMissedClick para verificar se o usuário errou no clique, caso não, ele roda a função endGame() aqui, para que ela não rode duas vezes.
      if (!userMissedClick) {
        //função que mostra as informações quando o usuário perde.
        endGame();
      }
    }
  }, 10); // o 10 representa o intervalo em que a função será executada.
}

//Função que atualiza o timer do jogo
function timerUpdate() {
  //atualizando o valor dos segundos e milissegundos conforme a variável timeLeft
  const segundos = Math.floor((timeLeft % 60000) / 1000);
  const milissegundos = timeLeft % 1000;

  //Montando o timer que é mostrado no HTML
  //A função padStart é responsável por colocar os "0" à esquerda
  let timer =
    "0:" +
    segundos.toString().padStart(2, "0") +
    "." +
    milissegundos.toString().padStart(2, "0");
  //Mostrando o timer na tela montado anteriormente
  timerElement.innerHTML = timer;
}

//Função que verifica o level atual conforme o usuário for jogando, e define o tempo do cronômetro em milissegundos
function verifyLevel() {
  if (level == 1) {
    timeLeft = 3000;
  } else if (level == 2) {
    timeLeft = 2000;
  } else if (level == 3) {
    timeLeft = 1700;
  } else if (level == 4) {
    timeLeft = 1500;
  } else if (level == 5) {
    timeLeft = 1000;
  } else if (level == 6) {
    timeLeft = 500;
  } else if (level == 7) {
    timeLeft = 250;
  }

  //retorno do tempo restante para quem chamar a função
  return timeLeft;
}

//Função para sortear as cores e retornar um array com as mesmas
function raffleColors() {
  const colors = [
    "rgb(0, 0, 0)",
    "rgb(255, 255, 255)",
    "rgb(0, 209, 0)",
    "rgb(245, 23, 32)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
    "rgb(255, 105, 180)",
    "rgb(253, 127, 32)",
    "rgb(101, 0, 176)",
  ];

  //Array que vai comportar as cores que forem sorteadas futuramente
  const drawnColors = [];

  //While que roda até o array drawnColors ficar com o mesmo tamanho do array de colors
  while (drawnColors.length < colors.length) {
    //capturando um número aleatório utilizando o math.floor para arredondar o resultado da multiplicação de um número que é gerado a partir do
    //math.random (algum número entre 0 e 1) e 9
    const index = Math.floor(Math.random() * 9);
    //Utilizando o número anterior para capturar uma cor do array de cores
    const color = colors[index];

    //Verifica se no array drawnColors existe a cor que foi capturada anteriormente, caso não, ele utiliza o método push para acrescentar ao array drawnColors a
    //cor que foi selecionada aleatoriamente
    if (!drawnColors.includes(color)) {
      drawnColors.push(color);
    }
  }
  //Retorno o array de cores aleatórias para quem chamar a função.
  return drawnColors;
}

//Sorteio dos nomes das cores e sua cor
function raffleTargetName() {
  const colorsName = [
    "PRETO",
    "BRANCO",
    "VERDE",
    "VERMELHO",
    "AZUL",
    "AMARELO",
    "LARANJA",
    "ROSA",
    "ROXO",
  ];

  //Seleciona um número aleatório entre 0 e 8
  const index = Math.floor(Math.random() * 9);
  //Atribuindo a variável name ao índice do array dos numeros do array colorsName que foi pegado anteriormente de forma aleatória
  const name = colorsName[index];

  //a variável color recebe um array de cores que foram selecionadas de forma aleatória
  const color = raffleColors();

  //Colocando em tela uma descrição para o usuário visualizar o alvo
  description.innerHTML = "Seu alvo é";
  //pegando a div com id target-name e expondo na interface pro usuário tirando a classe .hidden que está setada no css como display: none;
  targetName.classList.remove("hidden");
  //Mostrando em tela o nome da cor que foi selecionado anteriormente
  targetName.innerHTML = name;
  //atribuindo a cor para o texto, definindo para a primeira cor do array de cores que foi resgatado anteriormente de forma aleatória
  targetName.style.color = color[0];

  //retornando a cor da fonte do texto para fazer a comparação com a cor do botão que o usuário clicar
  return color[0];
}

//Função que cria os botões com cores de forma aleatória
function createButtons() {
  //Carregando dentro da variável colors um array com cores aleatórias
  const colors = raffleColors();

  //Laço de repetição que percorre todo o array de cores
  for (let i = 0; i < colors.length; i++) {
    //para cada posição do array que percorrer, crio um botão
    let button = document.createElement("button");
    //adiciono a classe 'target-name'
    button.className = "target-button";
    //pinto o botão com a cor que estiver no index correspondente a variável de controle do for, no caso a variável 'i'
    button.style.backgroundColor = colors[i];
    //quando clicar em algum dos botões, chamo a função handleButtonClick() para fazer a validação se o usuário acertou ou não a cor
    button.onclick = handleButtonClick;
    //buttonsContainer é a div que comportará todos os botões criados, esses botões são adicionados como filhos através da função appendChild().
    buttonsContainer.appendChild(button);
    //adiciono para o array buttons criado no começo do código todos os botões criados
    buttons.push(button);
  }
}

//Verificando o click do botão com a cor do nome sorteado anteriormente
function handleButtonClick(event) {
  //resgatando a cor do botão que foi clicado pelo usuário
  let clickedColor = event.target.style.backgroundColor;

  //verificando se a cor clicada pelo o usuário é igual ao nome que foi sorteado
  if (clickedColor === targetNameColor) {
    //incrementando os pontos do usuário a cada acerto
    score++;
    //a cada 5 pontos do usuário, o sistema aumenta um level, dificultando o jogo
    if (score % 5 === 0) {
      level++;
    }
    //atualizando o level em tempo real na tela do usuário o level em que ele está
    currentLevel.innerHTML = level;
    //a função clearButtons exclui todos os botões a cada rodada, os botões são gerados novamente quando roda a função startGame() na linha abaixo
    clearButtons();
    startGame();
  } else {
    //chama a função endGame() caso o usuário erre a cor do botão correspondendo a cor da palavra alvo
    endGame();
  }
}

//função que exclui os botões
function clearButtons() {
  //utilizo o foreach para passar pelo array buttons que foi preenchido anteriormente para criar os botões, mas dessa vez eu utilizo o removeChild para remover todos
  //os filhos da div buttonContainer, assim excluindo os botões da tela
  buttons.forEach((button) => {
    buttonsContainer.removeChild(button);
  });
  //fazendo o array buttons receber um array vazio, seu valor original
  buttons = [];
}

//Essa função é chamada quando o jogo acaba
function endGame() {
  //chamo a função para limpar os botões da tela
  clearButtons();
  //escondo da visão do usuário a palavra alvo
  targetName.classList.add("hidden");
  //adiciono a mensagem de pontos que o usuário fez durante a sua rodada
  description.innerHTML =
    "OOOOPS! <br> Você fez <strong class='accent-color'>" +
    score +
    " pontos </strong>";
  //Mostrando pro usuário o formulário caso ele deseje salvar sua pontuação no ranking
  rankingForm.classList.remove("hidden");
  //Indico ao resto do código que o motivo da perca do usuário foi por ter errado o clique do botão, e não pelo tempo ter acabado
  userMissedClick = true;
  //reseto o level para 1 para que o usuário possa começar uma nova rodada
  level = 1;
}

//Adicionando o evento de clique no botão iniciar para começar o jogo
startButton.addEventListener("click", () => {
  //tiro o level da rodada anterior, e inicio com o level 1
  currentLevel.innerHTML = level;
  //escondendo o formulário para o usuário salvar seu score
  rankingForm.classList.add("hidden");
  //resetando o score
  score = 0;
  //chamando a função startGame para iniciar o jogo
  startGame();
});

//escutando o evento de submit do formulário de ranking
rankingForm.addEventListener("submit", (event) => {
  //utilizando o preventDefault para que o formulário não tenha seu comportamento padrão ao ser enviado (ele recarrega a página)
  event.preventDefault();

  //capturando o input que o usuário digitar o seu nome
  const inputName = document.getElementById("name");
  //carregando o valor do input capturado anteriormente para a variável userName
  const userName = inputName.value;
  //monstando o objeto na variável player, que comportará o nome do usuário que digitar no form, e sua pontuação
  const player = { nome: userName, score: score };
  //resgatando o array de objetos do local storage, caso nenhum dado tenha sido cadastrado, ele atribui a variável ranking um array vazio
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  //utilizo o método push para adicionar ao array ranking o player montado anteriormente
  ranking.push(player);
  //utilizo a função de ordenação sort para comparar a pontução atual do usuário com as que já estiverem cadastradas no array de objetos e assim ordenar o array de acordo com
  //a pontuação dos usuários
  ranking.sort((a, b) => b.score - a.score);
  //aqui eu salvo o array atualizado utilizando a função JSON.stringify que transforme um objeto em uma string JSON
  localStorage.setItem("ranking", JSON.stringify(ranking));
  //escondo o formulário para que o usuário consiga enviar a sua pontuação ao ranking somente uma vez
  rankingForm.classList.add("hidden");
  //redireciono o usuário para visualizar o ranking
  window.location.href = "ranking.html";
});
