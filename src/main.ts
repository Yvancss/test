import './style.css'
import { io } from 'socket.io-client'
import { Card } from './card'

class Home {
  discardPileContainer: HTMLElement | null
  pseudoValue: string
  buttonReady: HTMLElement | null
  inputPseudo: HTMLElement | null
  buttonJoin: HTMLElement | null
  playerList: HTMLElement | null
  socket: any

  constructor() {

    this.socket = io("http://localhost:3000/")
    this.pseudoValue = ""
    this.inputPseudo = document.getElementById("pseudoInput")
    this.discardPileContainer = document.getElementById("discardPileContainer")

    this.playerList = document.getElementById("playerList")!
    this.buttonJoin = document.getElementById("join")
    this.buttonReady = document.getElementById("ready")
    this.initEvents()
    this.socket.on('joinGameStatus', this.displayJoin.bind(this))
    this.socket.on("updatePlayers", this.handleUpdatePlayers.bind(this))
    this.socket.on("gameStart", this.handleGameStart.bind(this))



  }
  initEvents() {
    this.inputPseudo?.addEventListener("input", this.inputChange.bind(this))
    console.log(this.inputPseudo)

    this.buttonJoin?.addEventListener("click", this.clickJoin.bind(this))
    this.buttonReady?.addEventListener("click", this.clickOnReady.bind(this))

  }
  inputChange(e: any) {
    this.pseudoValue = e.target.value

  }

  clickJoin() {
    this.socket.emit('joinGame', this.pseudoValue)
  }
  displayJoin(message: any) {
    console.log(message)
  }


  handleUpdatePlayers(players: any) {
    this.playerList!.innerHTML = ""
    players.forEach((player: any) => {
      console.log(player.name)
      this.createPlayers(player)
    }

    )
  }
  createPlayers(player: any) {
    const playerLi = document.createElement("li");
    const nameP = document.createElement("p");
    const readyP = document.createElement("p");
    playerLi.appendChild(nameP);
    playerLi.appendChild(readyP);
    this.playerList?.appendChild(playerLi)
    console.log(player)
    nameP.innerText = player.name
    if (player.isReady) {
      readyP.innerText = "Prêt !"
    }
    else {
      readyP.innerText = " pas Prêt !"
    }


  }
  createCard(player: any) {
    player.hand.forEach((card: any) => {
      new Card(card.value, card.color, card.id)

    });

  }
  clickOnReady() {
    this.socket.emit('playerReady')

  }


  handleGameStart({ players, discardPile, currentplayer }: any) {
    players.forEach((player: any) => {
      if (this.socket.id == player.id) {
        this.createCard(player)

      }

    });
    console.log(discardPile)
    console.log(currentplayer)
    const discardPileDiv = document.createElement('div')
    discardPileDiv.classList.add("discardPile", "cardDiscardPile")
    discardPileDiv.innerHTML = "<p class='cardNumber'>" + discardPile[0].value + "</p>";
    discardPileDiv.style.backgroundColor = discardPile[0].color;
    this.discardPileContainer!.appendChild(discardPileDiv);
  }

}




new Home()
