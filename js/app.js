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
let playerHand2;
let playerHand3;
let playerHand4;
let dealerHand = new Hand(1);
let cardToRemove;
let roundComplete = false


// =================== Cached Elements ====================

let deckEl = document.querySelector('#deck');
let discardEl = document.querySelector('#discard');

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
    console.log('button works') 
    while (dealerHand.cards.length < 2) {
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
            render()
            dealerRender()
        }
    }
}   

const handleClickHit = () => {
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
        if (playerHand.total > 21) {
            (playerHand.cards.find (card => card.value === 11 ? card.value = 1 : null))
        }      
    render(cardPicked.name)
    stand ()
    }
    
}
const handleClickSplit = () => {
    if (playerHand.cards[0].value === playerHand.cards[1].value) {
        let playerHand2 = new Hand(2)
        let splitCard = playerHand.cards.splice(1, 1);
        playerHand2.cards.push(splitCard)
        console.log(playerHand.cards)        
        console.log(playerHand2.cards)
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
            if (dealerHand.total > playerHand.total && dealerHand.total <= 21) {
                console.log('DEALER WINS')
            } else if (dealerHand.total === playerHand.total){
                console.log('push')
            } else {
                console.log('PLAYER WINS')
            }
        }
        roundComplete = true
        playerHand.stand = true
}

const handleClickStand = () =>{
    stand () 
    dealerRender()       
}

const handleClickDiscard = () => {
    console.log('this works')
    roundComplete = false
    while (playerHand.cards.length > 0) {
        discard.push(playerHand.cards.pop())
    }
    while (dealerHand.cards.length > 0) {
        discard.push(dealerHand.cards.pop())
    }
    playerHand.cards = []
    dealerHand.cards = []
    playerHand.stand = false
    render()
    dealerRender()
}

const render = (cardPicked) => {
    if (discard.length === 1) {  
        discardEl.classList.add("outline")
    };
    if (discard.length > 1) {
        discardEl.classList.add('back-blue');
    };   
    if (discard.length >= 52) {  
        discardEl.classList.add("shadow");
        deckEl.classList.remove("shadow");
    }
    if (deck.length === 0) {  
        deckEl.classList.add("outline");
        deckEl.classList.remove("back-blue");
    };
    playerRender()
}
function playerRender() {
    // Was helped by Glen but understand the logic
    const playerBoard = document.querySelector('.player .player-hand');    
    playerBoard.innerHTML = '';    
    playerHand.cards.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = `card large ${card.name}`; 
        el.id = `player-card-${i}`;
        playerBoard.appendChild(el);
    });    
}

function dealerRender () {
    const dealerBoard = document.querySelector('.dealer-hand');
    dealerBoard.innerHTML = '';
    if (playerHand.stand === false) {
        dealerHand.cards.forEach((card, i) => {
            const el = document.createElement('div');
            el.className = `card large ${card.name}`;
            el.id = `dealer-card-${i}`;
            dealerBoard.appendChild(el);
        });
        if (dealerHand.cards.length > 0)  {  
            let dealerEl = document.querySelector('#dealer-card-0')
            dealerEl.className = `card large back-blue`
        }
    }
    if (playerHand.stand === true) {
        dealerHand.cards.forEach((card, i) => {
            const el = document.createElement('div');
            el.className = `card large ${card.name}`;
            el.id = `dealer-card-${i}`;
            dealerBoard.appendChild(el);
        }); 
    }
}





init ()
// =================== Event Listeners ====================

document.querySelector('#deal').addEventListener('click', handleClickDeal)
document.querySelector('#hit').addEventListener('click', handleClickHit)
document.querySelector('#double').addEventListener('click', handleClickDouble)
document.querySelector('#split').addEventListener('click', handleClickSplit)
document.querySelector('#stand').addEventListener('click', handleClickStand)
document.querySelector('#discard-btn').addEventListener('click', handleClickDiscard)