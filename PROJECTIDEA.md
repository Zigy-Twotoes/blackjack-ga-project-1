# Blackjack cardgame

## Objective 
To produce a game that run at minimum run a single deck black jack game for one player. 
#### Features included:
* Pull from a deck and simulate the cards from the deck
    * The cards should move around the hands and simulate the actual process of the game in real life
* The display should show
    * Starting Screen
    * Discard Pile
    * Dealer hand (appropriately shown like at a casino with first card flipped over)
    * Player hand
        * Under player had should show the ability to split / double / hit / stand
    * Amount of deck gone through
    * Shuffle button or reset deck button
* Additonal Features
    * Card counting checker
    * Starting money and betting values for chips
    * Ablity to set the quantity of decks to a specific value // ex. 3 decks = 156 cards made up of 3 decks and have the ability to set to 8 decks
    * Additional game options // ex. Freebet, Spanish 21, addional casino betting options (buster button, pair payout)
## Psudocode
```
// Develop Class to make objects for each card to retain a value
// Pull from deck of cards randomly and push to player hand and dealer hand 
// Hit mechanics - When button is clicked pull random card from deck and place in players hand
// Split mechanics - Split only functions when a value pair is the same / make additonal hands for each split / have functional ability for each hand
// Double mechanics - deal only one more card 
// Stand mechanics - Stop play for player and move to next player or dealer
// Work out dealer logical hit AI - Hit soft 17 
// Manipulate and display all mechanics - show each card in a logical format  (splits organize 2 hands / doubles show increased bet / hit adds to hands)
```