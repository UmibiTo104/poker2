import Card from "./card.js";

export default class Player{
    #cards;//プレイヤーの手札
    #nodes;//手札のノード
    get cards(){
        return this.#cards;
    }

    get nodes(){
        return this.#nodes;
    }

    get selectedNodes(){
        return this.nodes.filter((node)=>node.classList.contains("selected"));
    }

    constructor(selector){
        //プロパティを初期かする
        this.#nodes=Array.from(
            document.querySelectorAll(selector));
        this.#cards=[];//プレイヤーの手札の初期化
    }

    //手札を描画する
    displayCard(front){
        this.cards.forEach((card,index)=>{
            let name = String(card.index).padStart(2,"0")+".png";
            if(!front){
                name = "blue.png";
            }
            this.nodes[index].setAttribute("src","./" +name);
        });
    }

    addCard(newCard){
        this.cards.push(newCard);
        this.nodes[this.cards.length-1].dataset.index = newCard.index;
    }

}
