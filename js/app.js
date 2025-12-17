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
let playerHand = new Hand(1);
let dealerHand = new Hand(1);
let cardToRemove;
let roundComplete = false


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
        
        
        render(cardPicked.name)
    }
}

const handleClickHit = () => {
    console.log(playerHand.cards)
    console.log(`this is at the start of the handleClickHit function ${playerHand.total}`)
    if (playerHand.total > 21) {        
         console.log('bust')         
    } else if (playerHand.total < 21) {
        if (deck.length > 0 && playerHand.stand === false) {
            let randomIdx = Math.floor(Math.random() * deck.length);
            let cardPicked = deck.splice(randomIdx,1)[0];
            playerHand.cards.push(cardPicked);      
            render(cardPicked.name)                  
        }
    } else if (playerHand.total === 21){
        console.log('You have 21');
        }
    if (playerHand.total > 21) {
        (playerHand.cards.find (card => card.value === 11 ? card.value = 1 : null))
    }
}

const handleClickDouble = () => {
    if (deck.length > 0 && playerHand.cards.length < 3) {
        let randomIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randomIdx,1)[0]
        playerHand.cards.push(cardPicked)       
    render(cardPicked.name)
    stand ()
    }
    
}
const handleClickSplit = () => {
    if (playerHand.cards[0].value === playerHand.cards[1].value) {
        newHand2 = new Hand(2)
        let splitCard = playerHand.cards.splice(1, 1);
        newHand2.cards.push(splitCard)
        console.log(playerHand.cards)        
        console.log(newHand2.cards)
    }        
}
function dealerPlay () {
    console.log(dealerHand.total)
    while (dealerHand.total < 17) {        
        if (deck.length > 0) {
            let randomIdx = Math.floor(Math.random() * deck.length)
            let cardPicked = deck.splice(randomIdx,1)[0]
            dealerHand.cards.push(cardPicked)
            if (dealerHand.total > 21) {
            (dealerHand.cards.find (card => card.value === 11 ? card.value = 1 : null))
        }
        render(cardPicked.name)
        }
    }
    if (dealerHand.total > 21) {
        console.log ('PLAYER WINS')
        return;
    }
}

function stand () {
    if (playerHand.total > 21) {
            console.log('you lose // BUST')
        } else if (playerHand.total <= 21) {
            dealerPlay();
            if (dealerHand.total > playerHand.total && dealerHand.total < 21) {
                console.log('DEALER WINS')
            } else if (dealerHand.total === playerHand.total){
                console.log('push')
            } else {
                console.log('PLAYER WINS')
            }
        }
        roundComplete = true
        console.log(dealerHand.total)
        console.log(playerHand.total)
}

const handleClickStand = () =>{
    stand ()        
}

const handleClickDiscard = ( ) => {
    roundComplete = false
    while (playerHand.cards > 0) {
        discard.push(playerHand.cards.shift())
    }
    while (dealerHand.cards > 0) {
        discard.push(dealerHand.cards.shift())
    }
    render()
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
    // console.log(playerHand.total)

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
document.querySelector('#discard').addEventListener('click', handleClickDiscard)