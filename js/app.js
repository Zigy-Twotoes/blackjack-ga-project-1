// ====================== Constants =======================


// ====================== Variables =======================

let deck = [];
let discard = [];
let playerHand = [];
let dealerHand = [];
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

}
function handRender () {
        playerHand.forEach((card, i) => {
            playerHandEl[i].classList.add(card.name)                     
        })
        dealerHand.forEach((card,i) => {
            dealerHandEl[i].classList.add(card.name)
        })
}
const handleClickDeal = () => {
    if (deck.length > 0) {
        let randomIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randomIdx,1)[0]
        if (playerHand.length ===  0 && dealerHand.length === 0) {
            playerHand.push(cardPicked)
        } else if (playerHand.length === 1 && dealerHand.length === 0) {
            dealerHand.push(cardPicked)
        } else if (playerHand.length === 1 && dealerHand.length === 1) {
            playerHand.push(cardPicked)
        } else if (playerHand.length === 2 && dealerHand.length === 1) {
            dealerHand.push(cardPicked)
        } else {
            console.log('the game is ready')
        }
        console.log(playerHand[0], playerHand[1])
        console.log(dealerHand[0], dealerHand[1])
        
        
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
    
    render(cardPicked.name)
    }
}
const handleClickSplit =() => {
    if (playerHand[0].value === playerHand[1].value)  {
        const handContainer = document.querySelectorAll('.player');
        const newHandEl = document.createElement('div');
        handContainer[0].appendChild(newHandEl);
        
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
        newHandEl.appendChild('div id="player-hand-9" class="card large outline"')
    }  
}



init ()
// =================== Event Listeners ====================

document.querySelector('#deal').addEventListener('click', handleClickDeal)
document.querySelector('#hit').addEventListener('click', handleClickHit)
document.querySelector('#double').addEventListener('click', handleClickDouble)
document.querySelector('#split').addEventListener('click', handleClickSplit)


