const sectionBalls = document.querySelector('#balls');
const rgbColor = document.querySelector('#rgb-color');
const textoDinamico = document.querySelector('#answer');
const botaoReset = document.querySelector('#reset-game');
const score = document.querySelector('#score');

function tentativa(event) {
  if (event.target.classList.contains('ok')) {
    textoDinamico.innerText = 'Acertou!';
    score.innerText = (parseInt(score.innerText) + 3);
  } else {
    textoDinamico.innerText = 'Errou! Tente novamente!';
  }
}

function randomNumber(maximo) {
  return Math.floor(Math.random() * (maximo + 1));
}

function randomColor() {
  const color = `(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
  return color;
}

function reset() {
  document.location.reload(true);
}

botaoReset.addEventListener('click', reset);

const indexCorCerta = randomNumber(6);
console.log(indexCorCerta);
for (let i = 1; i <= 6; i += 1) {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.backgroundColor = 'rgb' + randomColor();
  ball.addEventListener('click', tentativa);
  sectionBalls.appendChild(ball);
  if (i === indexCorCerta) {
    ball.classList.add('ok');
    const corCerta = randomColor();
    ball.style.backgroundColor = 'rgb' + corCerta;
    rgbColor.innerText = corCerta;
  }
}
