//Base project from @bradtraversy's 50 project in 50 days
//Added in functionality to randomize the order or the random characters so that they are not always in the order : lower, upper; number, symbol

const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')



const randomFunc ={
   lower: getRandomLower,
   upper: getRandomUpper,
   number: getRandomNumber,
   symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
   const textarea = document.createElement('textarea')
   const password = resultEl.innerText

   if(!password) { return }

   textarea.value = password
   document.body.appendChild(textarea)
   textarea.select()
   document.execCommand('copy')
   textarea.remove()
   alert('Password is copied to clipboard')
})

generateEl.addEventListener('click', () => {
   const length = +lengthEl.value
   const hasLower = lowercaseEl.checked
   const hasUpper = uppercaseEl.checked
   const hasNumber = numbersEl.checked
   const hasSymbol = symbolsEl.checked

   resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
   let generatedPassword = ''

   const typesCount = lower + upper + number + symbol

   const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

   if(typesCount === 0) {
      return ''
   } for(let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
         const funcName = Object.keys(type)[0]
         generatedPassword += randomFunc[funcName]()

      })
   }

   const finalPassword = generatedPassword.slice(0, length).split('')
   
   return randomizePassword(finalPassword)
}

function randomizePassword(str) {
   let randomizedPassword = []
   let stringLength = str.length
   for(let i = 0; i < stringLength+1;i++) {
      let randomArrPos = Math.floor(Math.random() * (Math.abs(str.length)))
      let rando = str.slice(randomArrPos, randomArrPos+1)
      str.splice(randomArrPos,1)      
      randomizedPassword.push(rando)
           
   } return randomizedPassword.join('')
   
}

function getRandomLower() {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
   return Math.floor(Math.random() * 10)
}

function getRandomSymbol() {
   const symbols = '!@#$%^&*'
   return symbols[Math.floor(Math.random() * symbols.length)]
}