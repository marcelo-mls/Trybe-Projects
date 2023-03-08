// Desafio 1
function compareTrue(p1, p2) {
  if (p1 === true && p2 === true) {
    return true
  }
  return false
}

// Desafio 2
function calcArea(base, height) {
  let area = (base * height) / 2
  return area
}

// Desafio 3
function splitSentence(word) {
  let wordArray = word.split(' ')
  return wordArray
}

// Desafio 4
function concatName(array) {
  return array[array.length - 1] + ', ' + array[0]
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = (wins * 3) + (ties * 1)
  return points
}

// Desafio 6
function highestCount(array) {
  let maior = array[0]
  let repeat = 0
  for (let num of array) {
    if (num > maior) {
      maior = num
    }
  }
  for (let num of array) {
    if (num === maior) {
      repeat += 1
    }
  }
  return repeat
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distCat1 = mouse - cat1
  let distCat2 = mouse - cat2
  if (Math.abs(distCat1) === Math.abs(distCat2)) {
    return 'os gatos trombam e o rato foge'
  }
  if (Math.abs(distCat1) > Math.abs(distCat2)) {
    return 'cat2'
  }
  if (Math.abs(distCat1) < Math.abs(distCat2)) {
    return 'cat1'
  }
}

// Desafio 8
function fizzBuzz(numbers) {
  let fb = []

  for (let n of numbers) {
    if (n % 3 === 0 && n % 5 === 0) {
      fb.push('fizzBuzz')
    } else if (n % 3 === 0 && n % 5 !== 0) {
      fb.push('fizz')
    } else if (n % 3 !== 0 && n % 5 === 0) {
      fb.push('buzz')
    } else {
      fb.push('bug!')
    }
  }
  return fb
}

// Desafio 9
function encode(string) {
  let array = string.split('')
  let code = []
  for (let i of array) {
    if (i === 'a') {
      code.push(1)
    } else if (i === 'e') {
      code.push(2)
    } else if (i === 'i') {
      code.push(3)
    } else if (i === 'o') {
      code.push(4)
    } else if (i === 'u') {
      code.push(5)
    } else {
      code.push(i)
    }
  }
  array = code.join('')
  return array
}

function decode(string) {
  let array = string.split('')
  let code = []
  for (let i of array) {
    if (i == 1) {
      code.push('a')
    } else if (i == 2) {
      code.push('e')
    } else if (i == 3) {
      code.push('i')
    } else if (i == 4) {
      code.push('o')
    } else if (i == 5) {
      code.push('u')
    } else {
      code.push(i)
    }
  }
  array = code.join('')
  return array
}

// Desafio 10
function techList(array, name) {

  let arrayOrdenado = array.sort()
  let listaFinal = []
  for (let i of arrayOrdenado) {
    let lista = {
      tech: '',
      name: ''
    }
    lista.tech = i
    lista.name = name
    listaFinal.push(lista)
  }
  if (array.length === 0) {
    return 'Vazio!'
  }
  return listaFinal
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
