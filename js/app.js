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
let win = 0


// =================== Cached Elements ====================

let deckEl = document.querySelector('#deck');
let discardEl = document.querySelector('#discard');

// ====================== Functions =======================
const init = () => {
    deck = fullDeck.map(card => ({...card}))
    playerHand.cards = []
    dealerHand.cards = []
    discard = []
}

function handTotal () {
    let handSum;
    for (let i = 0; i < this.cards.length; i++) {
        handSum = handSum + this.cards[i].value
    }
}




const handleClickDeal = () => {  
    if (deck.length < 16) {
        deckLimit()
        messageRender()
    } else {
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
                    messageRender()
                }
                render()
                dealerRender()
            }
        }
    }
    messageRender()
}   

const handleClickHit = () => {
    if (playerHand.cards.length !== 0){
        handleAce()
        if (playerHand.total > 21) {        
             messageRender()
             win = 1        
        } else if (playerHand.total < 21) {
            if (deck.length > 0 && playerHand.stand === false) {
                let randomIdx = Math.floor(Math.random() * deck.length);
                let cardPicked = deck.splice(randomIdx,1)[0];
                playerHand.cards.push(cardPicked);      
                render(cardPicked.name)                  
            }
        } else if (playerHand.total === 21){
            messageRender()
            }
        if (playerHand.total > 21) {
            (playerHand.cards.find (card => card.value === 11 ? card.value = 1 :    null))
        }
    } else {
        messageRender()
    }
}

const handleClickDouble = () => {
    if (playerHand.cards.length !== 0) {
        handleAce()
        if (deck.length > 0 && playerHand.cards.length < 3) {
            let randomIdx = Math.floor(Math.random() * deck.length)
            let cardPicked = deck.splice(randomIdx,1)[0]
            playerHand.cards.push(cardPicked) 
            if (playerHand.total > 21) {
                (playerHand.cards.find (card => card.value === 11 ? card.value = 1  : null))
            }           
        render(cardPicked.name)
        stand()
        } 
    } else {
        messageRender()
    }
}
function dealerPlay () {
    handleAce()
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
        win = 2
        winLossRender()
        return;
    }
}

function stand () {
    if (playerHand.cards.length !== 0){
        if (playerHand.total > 21) {
            win = 1
            winLossRender()
        } else if (playerHand.total <= 21) {
            dealerPlay();
            if (dealerHand.total > playerHand.total && dealerHand.total <= 21) {                
                win = 1
                winLossRender()
            } else if (dealerHand.total === playerHand.total){                    
                    win = 3
                    winLossRender()
            } else {
                    win = 2
                    winLossRender()
            }
        }
        roundComplete = true
        playerHand.stand = true
        dealerRender()
    } else {
        messageRender()
    }
}

const handleClickStand = () =>{
    stand ()      
}

const handleClickDiscard = () => {
    if (roundComplete === true) {
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
        win = 0
        render()
        dealerRender()
        winLossRender()
        messageRender()
    } else {
        messageRender()
    }
}

const render = () => {
    if (discard.length === 0) {
        discardEl.classList.remove('back-blue')
    }
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
function winLossRender () {
    const dealerCondText = document.querySelector('#dealer-text')
    const playerCondText = document.querySelector('#player-text')
    if (win === 0) {
        dealerCondText.innerHTML = 'Dealer'
        playerCondText.innerHTML = 'Player' 
    }
    if (win === 1) {
        dealerCondText.innerHTML = 'Dealer: Wins'
        playerCondText.innerHTML = 'Player: Lose'        
    }
    if (win === 2) {
        dealerCondText.innerHTML = 'Dealer: Lose'
        playerCondText.innerHTML = 'Player: Win'
    }
    if (win === 3) {
        dealerCondText.innerHTML = 'Dealer: Push'
        playerCondText.innerHTML = 'Player: Push'       
    }

}
function messageRender () {
    const messageCondText = document.querySelector('.actions-board')
    if (playerHand.total > 21) {
        messageCondText.innerHTML = `Game Actions // BUST! Click Stand then discard`
    } else if (playerHand.total === 21) {
        messageCondText.innerHTML = `Game Actions // You have 21! Click Stand then discard`
    } else if (deck.length < 16) {
        messageCondText.innerHTML = `Game Actions // Decks have been reshuffled`
    } else if (playerHand.cards.length < 1) {
        messageCondText.innerHTML = `Game Actions // Click Deal to play`
    } else if (roundComplete === false) {
        messageCondText.innerHTML = `Game Actions // Do you hit or stand`
    } else if (playerHand.cards.length === 2 && dealerHand.cards.length === 2) {
        messageCondText.innerHTML = `Game Actions // Game is ready! Hit or Stand`
    } else {
        messageCondText.innerHTML = `Game Actions`
    }

}
const handleClickShuffle = () => {    
    deck = fullDeck.map(card => ({...card})) // assigns deck value to a map 'clone' of the entire fullDeck const (was a bug fix for the shuffle mechanic not working)
    discard = []
    dealerHand.cards = []
    playerHand.cards = []
    render()
    playerRender ()
    dealerRender ()
}

function handleAce () {
    if (playerHand.cards[0].value === 11 && playerHand.cards[1].value === 11) {
        playerHand.cards[0].value = 1
    } else if (dealerHand.cards[0].value === 11 && dealerHand.cards[1].value === 11) {
        dealerHand.cards[0].value = 1
    } else {
        return;
    }
}

function deckLimit () {
    if (deck.length < 16) {
        handleClickShuffle()
    }
}


init ()

// =================== Event Listeners ====================

document.querySelector('#deal').addEventListener('click', handleClickDeal)
document.querySelector('#hit').addEventListener('click', handleClickHit)
document.querySelector('#double').addEventListener('click', handleClickDouble)
document.querySelector('#stand').addEventListener('click', handleClickStand)
document.querySelector('#discard-btn').addEventListener('click', handleClickDiscard)
document.querySelector('#shuffle').addEventListener('click', handleClickShuffle)
