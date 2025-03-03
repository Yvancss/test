import './style.css'
import {io} from 'socket.io-client'
class Home {
  pseudoValue: string
  buttonReady: HTMLElement | null
  inputPseudo: HTMLElement | null
  buttonJoin: HTMLElement | null
  socket: any

  constructor(){
    this.socket = io("http://localhost:3000/")
    this.pseudoValue=""
    this.inputPseudo= document.getElementById("pseudoInput")

    this.buttonJoin= document.getElementById("join")
    this.buttonReady= document.getElementById("ready")
    this.initEvents()
    this.socket.on('joinGameStatus', this.displayJoin.bind(this))
    

  }
initEvents(){
this.inputPseudo?.addEventListener("input",this.inputChange.bind(this))
console.log(this.inputPseudo)

this.buttonJoin?.addEventListener("click",this.clickJoin.bind(this))

}
inputChange(e){
  this.pseudoValue=e.target.value

}

clickJoin(){
  this.socket.emit('joinGame', this.pseudoValue)
}
displayJoin(message: any){
console.log(message)
}
}



new Home()
