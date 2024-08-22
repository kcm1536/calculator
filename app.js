const numberButtons = document.querySelectorAll('.js-button-num')
const methodButtons= document.querySelectorAll('.js-button-method')
const displayNumber = document.querySelector('.js-display-number')
const calculateButton = document.querySelector('.js-calculate')
const clearButton = document.getElementById('js-clear')
const decimalButton = document.getElementById('js-button-decimal')
const percentButton = document.getElementById('js-percent-button')
const negativeButton = document.getElementById('js-button-negative')

let firstNum = ''
let secondNum = ''
let sum = ''
let currentMethod = ''

function buildNumString(num){
  clearMethodStyle()

  if (currentMethod === '' || firstNum === ''){
    if (num === 'neg') {
      if (firstNum.includes('-')){
        firstNum = firstNum.slice(1)
        displayNumber.innerHTML = firstNum
        if (Number.isNaN(firstNum)) nanError()
        return
      } else {
        firstNum = '-' + String(firstNum)
        displayNumber.innerHTML = firstNum
        if (Number.isNaN(firstNum)) nanError()
        return
      }
    }
    if (num === '.') {
      if (firstNum.includes('.')){
        return
      }
    }
    firstNum = String(firstNum) + String(num)
    displayNumber.innerHTML = firstNum
    clearButton.innerHTML = 'C'
  } else {
    if (num === 'neg') {
      if (secondNum.includes('-')){
        secondNum = secondNum.slice(1)
        displayNumber.innerHTML = secondNum
        if (Number.isNaN(secondNum)) nanError()
        return
      } else {
        secondNum = '-' + String(secondNum)
        displayNumber.innerHTML = secondNum
        if (Number.isNaN(secondNum)) nanError()
        return
      }
    }
    if (num === '.') {
      if (secondNum.includes('.')){
        return
      }
    }
    displayNumber.innerHTML = ''
    secondNum = String(secondNum) + String(num)
    displayNumber.innerHTML = secondNum
    clearButton.innerHTML = 'C'
  }
  
}

function applyMethod(mtd) {
  clearMethodStyle()
  selectedMethod = document.getElementById(mtd)
  selectedMethod.classList.add('button-method-selected')
  currentMethod = selectedMethod.id
  calculate()
}

function clearMethodStyle(){
  methodButtons.forEach(button => {
    button.classList.remove('button-method-selected')
  })
}

function clearCalcWindow(){
  if (clearButton.innerHTML === 'AC'){
    allClear()
  } else {
    if (firstNum !== '' && secondNum === ''){
      firstNum = ''
      displayNumber.innerHTML = ''
      clearButton.innerHTML = 'AC'
    } else if (firstNum !== '' && secondNum !== '') {
      secondNum = ''
      displayNumber.innerHTML = ''
      clearButton.innerHTML = 'AC'
      selectedMethod = document.getElementById(`${currentMethod}`)
      selectedMethod.classList.add('button-method-selected')
    }
  }
}

function allClear(){
  firstNum = ''
  secondNum = ''
  sum = ''
  currentMethod = ''
  displayNumber.innerHTML = ''
  clearButton.innerHTML = 'AC'
  clearMethodStyle()
}

function calculate(){
  if (currentMethod === 'add'){
    sum = Number(firstNum) + Number(secondNum)
  } else if (currentMethod === 'minus') {
      sum = Number(firstNum) - Number(secondNum)
  } else if (currentMethod === 'times') {
      if (secondNum === '') {
        sum = Number(firstNum) * 1
      } else {
         sum = Number(firstNum) * Number(secondNum)
      }
  } else if (currentMethod === 'divide') {
      if (secondNum === '') {
        sum = Number(firstNum) / 1
      } else {
         sum = Number(firstNum) / Number(secondNum)
      }
  } else if (currentMethod === '' && firstNum !== '') {
      sum = firstNum
  } else if (currentMethod === '' && firstNum === '') {
      sum = '0'
  }

  if (Number(sum) % 1 !== 0) {
    sum = Math.round(sum * 100) / 100
  }

  if (Number.isNaN(sum)) nanError()

  firstNum = sum
  secondNum = ''
}

function displayAnswer(){
  calculate()
  displayNumber.innerHTML = String(sum)
  clearButton.innerHTML = 'AC'
}

function calculatePercent(){
  if (firstNum === '' && secondNum === ''){
  } else if (firstNum !== '' && secondNum === ''){
      firstNum = firstNum / 100
      if (Number(firstNum) % 1 !== 0) {
        firstNum = Math.round(firstNum * 100) / 100
      }
      displayAnswer()
  } else if (firstNum !== '' && secondNum !== '') {
      secondNum = secondNum / 100
      if (Number(secondNum) % 1 !== 0) {
        secondNum = Math.round(secondNum * 100) / 100
      }
      displayAnswer()
  }
}

function nanError(){
  console.log('hey')
  setTimeout(() => {
    displayNumber.innerHTML = 'Error';
  }, 0);
}

// event listeners

numberButtons.forEach(button => {
  button.addEventListener('click', function(){
    const buttonNum = button.id[button.id.length - 1]
    buildNumString(buttonNum)
  })
})

methodButtons.forEach(button => {
  button.addEventListener('click', function(){
    applyMethod(button.id)
  })
})

calculateButton.addEventListener('click', function(){
  displayAnswer()
})

clearButton.addEventListener('click', function(){
  clearCalcWindow()
})

decimalButton.addEventListener('click', function(){
  buildNumString('.')
})

percentButton.addEventListener('click', function(){
  calculatePercent()
})

negativeButton.addEventListener('click', function(){
  buildNumString('neg')
})