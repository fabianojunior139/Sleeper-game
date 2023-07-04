const timerElement = document.getElementById("stopwatch");
const startButton = document.getElementById("button-start");
const targetName = document.getElementById("target-name");
const divButtons = document.getElementById("buttons");
const buttonsContainer = document.getElementById("buttonsContainer");
const currentLevel = document.getElementById("level");
const description = document.getElementById("description");
const rankingForm = document.getElementById("ranking-form");
const rankingButton = document.getElementById("ranking-button");
let score = 0;
let level = 1;
let buttons = [];
let targetNameColor;
let userMissedClick = false;
let tempoRestante;
let timerInterval;

function startGame() {
  userMissedClick = false;
  //Desabilitando o botão de iniciar o jogo enquanto o timer estiver rolando
  startButton.disabled = true;
  //Inicializando o timer
  timerStart();
  //Inicializando a palavra com a cor selecionada aleatória
  targetNameColor = raffleTargetName();
  //Criando os botões
  createButtons();
}

//Função que inicializar o timer
function timerStart() {
  tempoRestante = verificaLevel();

  clearInterval(timerInterval);
  //Neste bloco de código utilizo o setInterval para rodar a função timerUpdate()
  //a cada 10 milissegundos, assim fazendo o efeito de timer
  timerInterval = setInterval(() => {
    //Reduzindo o valor inicial (3000 milissegundos) de 10 em 10

    //Verificando se o tempo restante chega a 0
    if (tempoRestante >= 0) {
      timerUpdate();
      tempoRestante -= 10;
    } else {
      //Quando o clearInterval é chamado, o bloco de código referente ao setInterval
      //é parado, nesse caso é parado quando o tempo restante alcança 0
      clearInterval(timerInterval);
      //habilitando novamente o botão para iniciar o jogo
      startButton.disabled = false;
      level = 1;
      if (!userMissedClick) {
        endGame();
      }
    }
  }, 10); // o 10 representa o intervalo em que a função será executada.
}

//Função que atualiza o timer do jogo
function timerUpdate() {
  //atualizando o valor dos segundos e milissegundos conforme a variável tempoRestante
  //é alterada na função timerStart
  const segundos = Math.floor((tempoRestante % 60000) / 1000);
  const milissegundos = tempoRestante % 1000;

  //Montando o timer que é mostrado no HTML
  //A função padStart é responsável por colocar os "0" à esquerda
  let timer =
    "0:" +
    segundos.toString().padStart(2, "0") +
    "." +
    milissegundos.toString().padStart(2, "0");
  //Mostrando o timer montado anteriormente
  timerElement.innerHTML = timer;
}

//Função que verifica o level atual conforme o usuário for jogando, e define o tempo
//do cronômetro em milissegundos
function verificaLevel() {
  if (level == 1) {
    tempoRestante = 3000;
  } else if (level == 2) {
    tempoRestante = 2000;
  } else if (level == 3) {
    tempoRestante = 1700;
  } else if (level == 4) {
    tempoRestante = 1500;
  } else if (level >= 5) {
    tempoRestante = 1000;
  } else if (level >= 6) {
    tempoRestante = 500;
  } else if (level >= 7) {
    tempoRestante = 250;
  }

  //retorno do tempo restante para quem chamar a função
  return tempoRestante;
}

//Função para sortear as cores e retornar um array com as mesmas
function raffleColors() {
  const colors = [
    "green",
    "yellow",
    "pink",
    "brown",
    "blue",
    "orange",
    "gray",
    "red",
    "black",
  ];

  //Array que vai comportar as cores que forem sorteadas futuramente
  const drawnColors = [];

  //While que roda até o array drawnColors for maior ou igual a tamanho do array colors.
  while (drawnColors.length < colors.length) {
    //capturando um número aleatório utilizando o math.floor para arredondar o
    //resultado da multiplicação de um número que é gerado a partir do
    //math.random (algum número entre 0 e 1) e 9
    const index = Math.floor(Math.random() * 9);
    //Utilizando o número anterior para capturar uma cor do array de cores
    const color = colors[index];

    //Verifica se no array drawnColors existe a cor que foi capturada anteriormente,
    //caso não, ele utiliza o método push para acrescenter ao array drawnColors a
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
    "VERDE",
    "AMARELO",
    "ROSA",
    "MARROM",
    "AZUL",
    "LARANJA",
    "CINZA",
    "VERMELHO",
    "PRETO",
  ];

  //Seleciona um número aleatório entre 0 e 8
  const index = Math.floor(Math.random() * 9);
  //Atribuindo a variável name ao índice do array dos numeros do array colorsName
  //que foi pegado anteriormente de forma aleatória
  const name = colorsName[index];

  //a variável color recebe um array de cores que foram selecionadas de forma aleatória
  const color = raffleColors();

  description.innerHTML = "Seu alvo é";
  //pegando a div com id target-name e expondo na interface pro usuário
  targetName.classList.remove("hidden");
  targetName.innerHTML = name;
  //atribuindo a cor para o texto, definindo para a primeira cor do array de cores
  //que foi resgatado anteriormente de forma aleatória
  targetName.style.color = color[0];

  //retornando a cor da fonte do texto para fazer a comparação com o
  return color[0];
}

//Função que cria os botões com cores de forma aleatória
function createButtons() {
  //Carregando dentro de colors um array com cores aleatórias
  const colors = raffleColors();

  //Laço de repetição que percorre todo o array de cores
  for (var i = 0; i < colors.length; i++) {
    let button = document.createElement("button");
    button.className = "target-button";
    button.style.backgroundColor = colors[i];
    button.onclick = handleButtonClick;
    buttonsContainer.appendChild(button);
    buttons.push(button);
  }
}

//Verificando o click do botão com a cor do nome sorteado anteriormente
function handleButtonClick(event) {
  var clickedColor = event.target.style.backgroundColor;

  if (clickedColor === targetNameColor) {
    score++;
    if (score % 5 === 0) {
      level++;
    }
    currentLevel.innerHTML = level;
    clearButtons();
    startGame();
  } else {
    endGame();
  }
}

function clearButtons() {
  var buttonsContainer = document.getElementById("buttonsContainer");
  buttons.forEach((button) => {
    buttonsContainer.removeChild(button);
  });
  buttons = [];
}

function endGame() {
  clearButtons();
  targetName.classList.add("hidden");
  description.innerHTML =
    "OOOOPS! <br> Você fez <strong class='accent-color'>" +
    score +
    " pontos </strong>";
  rankingForm.classList.remove("hidden");
  userMissedClick = true;
  level = 1;
}

//Adicionando o evento de clique no botão iniciar para começar o jogo
startButton.addEventListener("click", () => {
  currentLevel.innerHTML = level;
  rankingForm.classList.add("hidden");
  score = 0;
  startGame();
});

console.log(score);

rankingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(score);

  const inputName = document.getElementById("name");

  const userName = inputName.value;

  const player = { nome: userName, pontuacao: score };

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push(player);

  ranking.sort((a, b) => b.pontuacao - a.pontuacao);

  localStorage.setItem("ranking", JSON.stringify(ranking));

  rankingForm.classList.add("hidden");
});
