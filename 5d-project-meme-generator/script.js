const inputText = document.querySelector("#text-input");
const memeText = document.querySelector("#meme-text");
const insertButton = document.querySelector("button");
const memeImagem = document.querySelector("#meme-image");
const memeInsert = document.querySelector("#meme-insert");



inputText.addEventListener('keyup', inserirTexto)
// memeInsert.addEventListener('change', inserirImagem)

function inserirTexto() {
  memeText.innerText = inputText.value
}

/* function inserirImagem() {
  memeImagem.style.backgroundImage = memeInsert.value
} */


