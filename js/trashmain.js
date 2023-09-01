function loadImage(sr) {
  const img = new Image();
  img.src = sr;
  return img;
}

function loadCardImages() {
  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const promises = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      const cardKey = `${suit}${rank}`;
      const img = loadImage(`imgs/${suit}/${suit}${rank}.png`);
      promises.push(img);
      img.onload = () => {
        cardImages[cardKey] = img; // 이미지 로드 완료 후 객체에 할당
      };
    }
  }

  const chipValues = ['5dollars', '10dollars', '25dollars', '50dollars', '100dollars'];
  for (const value of chipValues) {
    const img = loadImage(`imgs/chips/${value}.png`);
    promises.push(img);
    img.onload = () => {
      chips[value] = img;
    };
  }

  return Promise.all(promises);
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
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
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

      dealButton.addEventListener("click", function(deal){
        console.log("deal")
      });
      
      checkButton.addEventListener("click", function(check){

      });
      
      callButton.addEventListener("click", function(call){
      
      });
      
      foldButton.addEventListener("click", function(fold){
      
      });
      
      raiseButton.addEventListener("click", function(raise){
      
      });
    }

    deal() {
        this.deck.shuffle();
        this.players.forEach(player => {
            player.hand = [this.deck.drawCard(), this.deck.drawCard()];
        });
        this.communityCards = [this.deck.drawCard(), this.deck.drawCard(), this.deck.drawCard(), this.deck.drawCard(), this.deck.drawCard()];
    }

    // Other game methods
}



test = new Card("clubs", "2");

function render(){
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(backOfCardImage, canvas.width / 2 - 280, canvas.height / 2 - 90, 70, 90);
  ctx.drawImage(test.image, 50, 50);
}


loadCardImages().then(() => {
  backgroundImage = loadImage("imgs/background.png");
  backOfCardImage = loadImage("imgs/backOfCard.png");
  main();
  const game = new Game();
  game.setupListeners();
});

main();
const game = new Game();
game.setupListeners();

Promise.all([
  loadImage("imgs/background.png"),
  loadImage("imgs/backOfCard.png"),
  ...Object.values(cardImages).map(img => loadImage(img.src))
]).then(([bgImg, backOfCardImg, ...loadedCardImages]) => {
  backgroundImage = bgImg;
  backOfCardImage = backOfCardImg;
  loadedCardImages.forEach((loadedImg, index) => {
    const cardKey = Object.keys(cardImages)[index];
    cardImages[cardKey] = loadedImg;
  });
  main();
  const game = new Game();
  game.setupListeners();
});
