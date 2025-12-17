// ====================== Constants =======================
class Hand {
    constructor(handNumber) {
    this.handNumber = handNumber;
    this.cards = [];
    this.stand = false;
    };
    get total () {
        return this.cards.reduce((acc, card) => acc + card.value, 0) 
    }
}
   


// ====================== Variables =======================

let deck = [];
let discard = [];
let playerHand = new Hand(1)
let dealerHand = new Hand(1)
let cardToRemove;


// =================== Cached Elements ====================

let deckEl = document.querySelector('#deck');
let discardEl = document.querySelector('#discard');
let playerHandEl = document.querySelectorAll('.player-hand .card');
let dealerHandEl = document.querySelectorAll('.dealer-hand .card');


// ====================== Functions =======================
const init = () => {
  deck = fullDeck
}

function handTotal () {
    let handSum;
    for (let i = 0; i < this.cards.length; i++) {
        handSum = handSum + this.cards[i].value
    }
}




const handleClickDeal = () => {
    if (deck.length > 0) {
        let randomIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randomIdx,1)[0]
        if (playerHand.cards.length ===  0 && dealerHand.cards.length === 0) {
            playerHand.cards.push(cardPicked)
        } else if (playerHand.cards.length === 1 && dealerHand.cards.length === 0) {
            dealerHand.cards.push(cardPicked)
        } else if (playerHand.cards.length === 1 && dealerHand.cards.length === 1) {
            playerHand.cards.push(cardPicked)
        } else if (playerHand.cards.length === 2 && dealerHand.cards.length === 1) {
            dealerHand.cards.push(cardPicked)
        } else {
            console.log('the game is ready')
        }
        console.log(playerHand.cards[0], playerHand.cards[1])
        console.log(dealerHand.cards[0], dealerHand.cards[1])
        
        
        render(cardPicked.name)
    }
}
const handleClickHit = () => {
    if (deck.length > 0) {
        let randomIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randomIdx,1)[0]
        playerHand.push(cardPicked)       
    
    render(cardPicked.name)
    }
}
const handleClickDouble = () => {
    if (deck.length > 0 && playerHand.length < 3) {
        let randomIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randomIdx,1)[0]
        playerHand.push(cardPicked)       
    // add stand variable
    render(cardPicked.name)
    }
}
const handleClickSplit = () => {
    if (playerHand.cards[0].value === playerHand.cards[1].value) {
        
        let newHand = playerHand.splice(1, 1)
        const handContainer = document.querySelectorAll('.player');
        const newHandEl = document.createElement('div');
        newHandEl.classList.add('player-hand1')
        
    if (deck.length > 0) {
        let randomIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randomIdx,1)[0]
        playerHand.push(cardPicked)       
    
    render(cardPicked.name) 
        }
    }
    render()
}

const handleClickStand = () =>{
    
}
const render = (cardPicked) => {
    if (discard.length === 1) {  
    discardEl.classList.remove("outline")
    };
    if (discard.length > 1) {  
    discardEl.classList.remove(cardToRemove)
    };
    cardToRemove = cardPicked;
    discardEl.classList.add(cardPicked);
    if (discard.length === 26) {  
    discardEl.classList.add("shadow");
    deckEl.classList.remove("shadow");
    }
    if (deck.length === 0) {  
    deckEl.classList.add("outline");
    deckEl.classList.remove("back-blue");
    };
    handRender()
    console.log(playerHand.total)

}

function handRender () {
        playerHand.cards.forEach((card, i) => {
            playerHandEl[i].classList.add(card.name)                     
        })
        dealerHand.cards.forEach((card,i) => {
            dealerHandEl[i].classList.add(card.name)
        })
    }


init ()
// =================== Event Listeners ====================

document.querySelector('#deal').addEventListener('click', handleClickDeal)
document.querySelector('#hit').addEventListener('click', handleClickHit)
document.querySelector('#double').addEventListener('click', handleClickDouble)
document.querySelector('#split').addEventListener('click', handleClickSplit)
document.querySelector('#stand').addEventListener('click', handleClickStand)