const drawCardButton = document.getElementById('draw-card')
const playerHand = document.getElementById('player-hand')
const playArea = document.getElementById('play-area')

let cardsInHand = 0
let selectedCard = null

function createCard(content) {
  const card = document.createElement('div')
  card.classList.add('card')
  card.textContent = content
  return card
}

function drawCard() {
  if (cardsInHand < 5) {
    const newCard = createCard(Math.floor(Math.random() * 10) + 1)
    newCard.addEventListener('click', selectCard)
    playerHand.appendChild(newCard)
    cardsInHand++
  }
}
function selectCard() {
  if (selectedCard) {
    selectedCard.classList.remove('selected')
    selectedCard.style.pointerEvents = 'auto'
    removeHoverEffect()
    document.removeEventListener('mousemove', moveCard)
  }
  selectedCard = this
  selectedCard.classList.add('selected')
  selectedCard.style.pointerEvents = 'none'
  addHoverEffect()
  document.addEventListener('mousemove', moveCard)
}

function moveCard(event) {
  if (selectedCard) {
    selectedCard.style.position = 'absolute'
    selectedCard.style.left = event.clientX - selectedCard.clientWidth / 2 + 'px'
    selectedCard.style.top = event.clientY - selectedCard.clientHeight / 2 + 'px'
    selectedCard.style.zIndex = 1000
  }
}

function placeCard(event) {
  if (selectedCard && event.target.classList.contains('white-space')) {
    event.target.parentNode.appendChild(selectedCard)
    selectedCard.style.position = ''
    selectedCard.style.pointerEvents = 'auto'
    selectedCard.classList.remove('selected')
    selectedCard.removeEventListener('click', selectCard)
    document.removeEventListener('mousemove', moveCard)
    selectedCard = null
    cardsInHand--
    removeHoverEffect()
  }
}

function addHoverEffect() {
  const whiteSpaces = document.querySelectorAll('.white-space')
  whiteSpaces.forEach((space) => space.classList.add('hover-enabled'))
}

function removeHoverEffect() {
  const whiteSpaces = document.querySelectorAll('.white-space')
  whiteSpaces.forEach((space) => space.classList.remove('hover-enabled'))
}

function createWhiteSpaces() {
  for (let i = 0; i < 400; i++) {
    const whiteSpace = document.createElement('div')
    whiteSpace.classList.add('white-space')
    whiteSpace.addEventListener('click', placeCard)
    playArea.appendChild(whiteSpace)
  }
}

drawCardButton.addEventListener('click', drawCard)

createWhiteSpaces()
