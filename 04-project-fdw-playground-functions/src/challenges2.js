// Desafio 11
function generatePhoneNumber(array) {
  let tel = ['(']
  let maisMenos = []

  if (array.length !== 11) {
    return 'Array com tamanho incorreto.'
  }

  for (let n of array) {
    if (n < 0 || n > 9) {
      maisMenos.push(n)
    }
    let repeat = []
    for (let n2 of array) {
      if (n === n2) {
        repeat.push(n)
      }
    }
    if (repeat.length >= 3) {
      return 'não é possível gerar um número de telefone com esses valores'
    }
  }
  if (maisMenos.length > 0) {
    return 'não é possível gerar um número de telefone com esses valores'
  }

  for (let i = 0; i <= 10; i=i+1) {
    if (i === 2) {
      tel.push(') ')
    }
    if (i === 7) {
      tel.push('-')
    }
    tel.push(array[i])
  }
  return tel.join('')
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if ((lineA > lineB + lineC || lineB > lineA + lineC || lineC > lineB + lineA) && (lineA < Math.abs(lineB + lineC) || lineB < Math.abs(lineA + lineC) || lineC < Math.abs(lineB + lineA))) {
    return false
  }
  return true
}

// Desafio 13
function hydrate(drinks) {
  let numbers = drinks.match(/\d+/g) // Referência: https://www.youtube.com/watch?v=pfkkdzeyx6U
  let water = 0
  for(let n of numbers){
    water = water + parseInt(n)
  }
  if (water === 1){
    return water + ' copo de água'
  }
  return water + ' copos de água'
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
