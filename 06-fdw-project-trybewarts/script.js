const inputEmail = document.querySelector('#login');
const inputSenha = document.querySelector('#senha');
const buttonLogin = document.querySelector('#buttonLogin');

function showAlert() {
  if (inputEmail.value === 'tryber@teste.com' && inputSenha.value === '123456') {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Email ou senha inválidos.');
  }
}

buttonLogin.addEventListener('click', showAlert);

const inputCheckbox = document.querySelector('#agreement');
const buttonAgreement = document.querySelector('#submit-btn');

function enableButton() {
  if (inputCheckbox.checked === true) {
    buttonAgreement.disabled = false;
  }
}

inputCheckbox.addEventListener('click', enableButton);

const counter = document.querySelector('#counter');
const textArea = document.querySelector('#textarea');

textArea.addEventListener('keyup', () => {
  if (textArea.value.length === 0) {
    counter.innerText = '500/500';
  } else {
    const numeroAtual = 500 - textArea.value.length;
    counter.innerText = `${numeroAtual}/500`;
  }
});

const cadastro = {
  Nome: '',
  Email: '',
  Casa: '',
  Família: '',
  Matérias: [],
  Avaliação: '',
  Observações: '',
};

const nomeCadastro = document.querySelector('#input-name');
const sobrenomeCadastro = document.querySelector('#input-lastname');

function inputRadio(maximo, classe, objeto) {
  for (let index = 0; index < maximo; index += 1) {
    if (document.querySelectorAll(classe)[index].checked) {
      cadastro[objeto] = document.querySelectorAll(classe)[index].value;
    }
  }
}

function inputCadastro() {
  cadastro.Nome = `${nomeCadastro.value} ${sobrenomeCadastro.value}`;
  cadastro.Email = document.querySelector('#input-email').value;
  cadastro.Casa = document.querySelector('#house').value;
  for (let index = 0; index < 6; index += 1) {
    if (document.querySelectorAll('.subject')[index].checked) {
      cadastro.Matérias.push(` ${document.querySelectorAll('.subject')[index].value}`);
    }
  }
  cadastro.Observações = document.querySelector('#textarea').value;
}

buttonAgreement.addEventListener('click', () => {
  const formClean = document.querySelector('#evaluation-form');
  const arrayCadastro = Object.keys(cadastro);
  inputCadastro();
  inputRadio(3, '.familia', 'Família');
  inputRadio(10, '.avaliacao', 'Avaliação');
  formClean.innerHTML = '';
  for (let index = 0; index < 7; index += 1) {
    const h3 = document.createElement('h3');
    h3.innerText = `${arrayCadastro[index]}: ${cadastro[arrayCadastro[index]]}`;
    formClean.appendChild(h3);
  }
});

/* const formulario = document.querySelector('#evaluation-form')

function bazinga() {
  const formData = new FormData(formulario)
  const cadastro = {
    Nome: `${formData.get('input-name')} ${formData.get('input-lastname')}`,
    Email: formData.get('input-email'),
    Casa: formData.get('email'),
    Família: formData.get('select-check'),
    Matérias: bazingaMaterias(formData),
    Avaliação: formData.get('rate'),
    Observações: formData.get('textarea'),
  };
  return cadastro
}

function outra(event) {
  event.preventDefault()
  const dadosForm = bazinga()
  formulario.innerHTML = '';
  for(let keys =0; keys < Object.keys(dadosForm).length; keys +=1){
    const paragrafo = document.createElement('p')
    paragrafo.innerText = `${Object.keys(dadosForm)[keys]}: ${Object.values(dadosForm)[keys]}`
    formulario.appendChild(paragrafo)
  }
}

function bazingaMaterias(form){
  const teste = form.getAll('checkboxA')
  let str = teste[0]
  for (let value = 1; value < teste.length; value +=1) {
    str += `, ${teste[value]}`
  }
  return str
}

buttonAgreement.addEventListener('click', outra) */