const board = document.querySelector('#pixel-board'); // Elemento que vai receber o quadro
const pixelBoard = document.querySelectorAll('.pixel'); // Pixels que vão preencher o quadro
const clearBoard = document.getElementById('clear-board'); // Botão de limpar
const body = document.querySelector('body');
const brushColor = document.querySelectorAll('.color'); // As cores que serviram de Pinceis
const generateBoard = document.querySelector('#generate-board'); // Botão para gerar um novo quadro

// cria função para deletar o quadro, antes de criar um novo. deleta as LINHAS
function removeBoard() {
  const oldBoard = document.querySelectorAll('.line');
  for (const line of oldBoard) {
    board.removeChild(line);
  }
}

// cria função que avalia o valor do input para gerar o quadro de pixels
function boardSize() {
  const boardSize = document.querySelector('#board-size').value;
  if (boardSize === '') {
    window.alert('Valor inválido! Digite um número entre 5 e 25 para gerar a matriz');
    boardSize = 5;
  } else if (boardSize < 5) {
    boardSize = 5;
  } else if (boardSize > 25) {
    boardSize = 25;
  }
  return boardSize;
}

//  cria função que gera o quadro baseado no tamanho do input
function createBoard() {
  removeBoard();
  const boardSize = document.querySelector('#board-size').value;
  // linhas
  for (let line = 1; line <= boardSize; line += 1) {
    const divLine = document.createElement('div');
    divLine.className = 'line';
    board.appendChild(divLine);
    // colunas
    for (let column = 1; column <= boardSize; column += 1) {
      const divColumn = document.createElement('div');
      divColumn.className = 'pixel column';
      divColumn.addEventListener('click', paint)
      divLine.appendChild(divColumn);
    }
  }
}

// cria função para pegar a cor do selected e pintar o pixel clicado
function paint() {
  for (const pixel of pixelBoard) {
    pixel.addEventListener('click', function (event) {
      const selectedColor = document.querySelector('.selected'); // linha redundante?
      const color = selectedColor.style.backgroundColor;
      event.target.style.backgroundColor = color;
    });
  }
}

// criar função que gera cores aleatórias em hexadecimal
function randomColor() {
  /* Referencia: https://www.horadecodar.com.br/2022/01/16/gerar-cor-aleatoria-com-javascript/ */
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let char = 0; char < 6; char += 1) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

function bodyColor() {
  const newPalette = document.querySelector('#palette');
  newPalette.addEventListener('click', function () {
    brushColor[0].style.backgroundColor = 'black';
    brushColor[1].style.backgroundColor = randomColor();
    brushColor[2].style.backgroundColor = randomColor();
    brushColor[3].style.backgroundColor = randomColor();
    body.style.backgroundColor = randomColor();
  });
}

// Cria função que define qual é a cor com selected. a cor que vai pintar
function brush() {
  for (const color of brushColor) {
    color.addEventListener('click', function (event) {
      const selectedColor = document.querySelector('.selected'); // linha redundante?
      selectedColor.classList.remove('selected');
      event.target.classList.add('selected');
    });
  }
}

// cria função par limpar o board
function clear() {
  clearBoard.addEventListener('click', function () {
    for (const pixel of pixelBoard) {
      pixel.style.backgroundColor = 'white';
    }
  });
}

generateBoard.addEventListener('click', createBoard);
brush();
bodyColor();
paint();

window.onload = function () {
  createBoard();
  clear();
  brushColor[0].style.backgroundColor = 'black';
  brushColor[1].style.backgroundColor = '#256eff';
  brushColor[2].style.backgroundColor = '#3ddc97';
  brushColor[3].style.backgroundColor = '#ff495c';
  body.style.backgroundColor = '#ff495c';
};
