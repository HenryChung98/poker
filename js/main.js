let backgroundImage;
backgroundImage = new Image();
backgroundImage.src="imgs/background.png";
backOfCardImage = new Image();
backOfCardImage.src="imgs/backOfCard.png";
let canvas; 
let ctx;
let betAmount = 0;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 900;
const cardWidth = 70;
const cardHeight = 90;
const gap = 10;
const deckX = canvas.width / 2 - 280;
const deckY = canvas.height / 2 - cardHeight / 2;


document.body.appendChild(canvas);
const cardImages = [];




class Card{
  constructor(suit, rank){
    this.suit = suit;
    this.rank = rank;
    this.imageName = this.suit + this.rank;
    this.addImgToCards();
  }
  addImgToCards(){
    const image = new Image();
    image.src = "imgs/" + this.suit + "/" + this.imageName + ".png";
    cardImages[this.imageName] = image;

  }
}


class Deck {
  constructor() {
      this.cards = [];
      this.initializeDeck();
      this.shuffle();
  }

  initializeDeck() {
    const suits = ['clubs', 'diamonds', 'hearts', 'spades']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j]));
      }

    }
    for (let i = 0; i < this.cards.length; i++){
      cardImages.push(this.cards[i]);

    }
  
  }
  

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap elements
    }
  }

  drawCard() {
    return this.cards.pop();
  }

}


class Player {
  constructor(name, chips) {
      this.name = name;
      this.chips = chips;
      this.hand = [];
  }

}

class Game {
    constructor() {
        this.deck = new Deck();
        this.players = [
            new Player("Player1", 1000),
            new Player("Player2", 1000)
        ];
        this.communityCards = [];
        this.setupListeners();
    }
  //   setPlayers() {
  //     for (i = 0; i < 2; i++) {
  //       this.players.push(new Player(name, chips));
  //     }
  // } 나중에 할 것
  setupListeners() {
    const dealButton = document.getElementById("dealButton");
    const checkButton = document.getElementById("checkButton");
    const callButton = document.getElementById("callButton");
    const foldButton = document.getElementById("foldButton");
    const raiseButton = document.getElementById("raiseButton");

    dealButton.addEventListener("click", function(){
      game.deck.shuffle();
      game.players.forEach(player => {
        player.hand = [game.deck.drawCard(), game.deck.drawCard()];
        player.chips -= 10;
        betAmount += 10;
      });
      game.communityCards = [
        game.deck.drawCard(),
        game.deck.drawCard(),
        game.deck.drawCard(),

      ];
      // 
    });
    
    checkButton.addEventListener("click", function(check){
      game.communityCards.push(game.deck.drawCard());
    });
    
    callButton.addEventListener("click", function(call){
    
    });
    
    foldButton.addEventListener("click", function(fold){
    
    });
    
    raiseButton.addEventListener("click", function(raise){
    
    });
  }
}

const game = new Game();

function checkWin(){
  
}

function render(){
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(backOfCardImage, deckX, deckY, cardWidth, cardHeight);
  ctx.fillText("Bet Amount: " + betAmount, deckX, canvas.height / 2 + cardHeight * 1.5);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  for (let i = 0; i < game.communityCards.length; i++) {
    const comCard = cardImages[game.communityCards[i].imageName];
    if (comCard) {
      const comCardX = (canvas.width - (cardWidth + gap) * game.communityCards.length) / 2 + (cardWidth + gap) * i;
      ctx.drawImage(comCard, comCardX, deckY, cardWidth, cardHeight);

    }
  }


  let playerCardY = canvas.height - cardHeight - 20; // 플레이어 카드가 그려질 y 좌표

  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    for (let j = 0; j < player.hand.length; j++) {
      const card = cardImages[player.hand[j].imageName];
      // ctx.fillText("Remain: " + player.chips[j], 100, playerCardY)
      if (card) {
        const cardX = (canvas.width - (cardWidth + gap) * player.hand.length) / 2 + (cardWidth + gap) * j;
        ctx.drawImage(card, cardX, playerCardY, cardWidth, cardHeight);
        ctx.fillText("Remain: " + player.chips[j], 100, playerCardY);
      }
      
    }
    playerCardY -= 770; // 다음 플레이어의 카드가 그려질 y 좌표 업데이트
  }
}
function main(){
  render();
  requestAnimationFrame(main);
  

}

main();

// const card = cardImages["spadesA"];
//   if (card) {
//     const cardX = canvas.width / 2;
//     const cardY = canvas.height / 2;
//     ctx.drawImage(card, cardX, cardY, cardWidth, cardHeight);
//     카드보이게하는거
//   }