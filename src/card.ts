
export class Card {
    value: any
    color: any
    id: any
    hand: any


    constructor(value: any, color: any, id: any) {
        this.value = value
        this.color = color
        this.id = id
        this.hand = document.getElementById("hand")
        this.generateCard()
    
        console.log(this.hand)
    }


    generateCard() {
        const li = document.createElement("li")
        const p = document.createElement("p")
        p.innerText = this.value
        li.appendChild(p)
        this.hand.appendChild(li)
        console.log(this.hand)

        li.style.backgroundColor=this.color

    }


}