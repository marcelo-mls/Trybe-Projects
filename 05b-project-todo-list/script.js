const criarTarefa = document.getElementById('criar-tarefa');
const limparLista = document.getElementById('apaga-tudo');
const limparConcluidos = document.getElementById('remover-finalizados');
const removerSelecionado = document.getElementById('remover-selecionado');

function limparTudo() {
  const lista = document.getElementById('lista-tarefas');
  const itensDaLista = document.querySelectorAll('.tarefa');
  for (const item of itensDaLista) {
    lista.removeChild(item);
  }
}

function selecionada(event) {
  const tarefaSelecionada = document.querySelectorAll('.selecionada');
  if (tarefaSelecionada.length !== 0) {
    for (const tarefa of tarefaSelecionada) {
      tarefa.classList.remove('selecionada');
    }
  }
  event.target.classList.add('selecionada');
}

function concluido(event) {
  event.target.classList.toggle('completed');
}

function limparCompleted() {
  const lista = document.getElementById('lista-tarefas');
  const tarefasConcluida = document.querySelectorAll('.completed');
  for (const tarefa of tarefasConcluida) {
    lista.removeChild(tarefa);
  }
}

function removerItem() {
  const lista = document.getElementById('lista-tarefas');
  const tarefa = document.querySelector('.selecionada');
  lista.removeChild(tarefa);
}

function adicionarTarefa() {
  const lista = document.getElementById('lista-tarefas');
  const tarefa = document.createElement('li');
  const inputTexto = document.getElementById('texto-tarefa');
  if (inputTexto.value !== '') {
    tarefa.innerText = inputTexto.value;
    tarefa.classList.add('tarefa');
    lista.appendChild(tarefa);
    tarefa.addEventListener('click', selecionada);
    tarefa.addEventListener('dblclick', concluido);
    inputTexto.value = '';
  }
}

criarTarefa.addEventListener('click', adicionarTarefa);
limparLista.addEventListener('click', limparTudo);
limparConcluidos.addEventListener('click', limparCompleted);
removerSelecionado.addEventListener('click', removerItem);
