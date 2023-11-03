import Player from "./player.js";
import Strength from "./strength.js";
import Card from "./card.js";


export default class Cpu extends Player {
    constructor(selector) {
        super(selector);
      }
    
      //raised_chipはyour_current_bet - cpu_current_bet
      static simulate_holdem(cpu_hands, community_cards, community_cards_length, your_current_bet, raised_chip, pot){
        let count = 0;//勝ち数
        for (let i = 0 ; i < 3000 ; i++){//3000回シミュレーションをする
        let deck = [];
          [...Array(52)].map((_,index)=>{
            deck.push(new Card(index+1));
        });
        this.shuffleCard(deck);
        //deckからcpu_handsと場に表示されているcommunity_cardsのカードを抜く
        let arr = cpu_hands.concat(community_cards);
        arr.forEach((e) => {
          let val = e;
          let index = deck.indexOf(val);
          deck.splice(index,1)
        });
       // return(deck);
        let rest = [];
        let rest_com_cards = this.dealCard(rest, deck, 5 - community_cards_length);
        //return rest_com_cards;
        let my_cards = cpu_hands.concat(community_cards, rest_com_cards);
        //return my_cards;
        let my_best_hand = Strength.hand_best(my_cards);
        //return my_best_hand;
        let opponent_hand = [];
        opponent_hand = this.dealCard(opponent_hand, deck, 2);//相手の手札二枚を予測
        let opponent_hands = opponent_hand.concat(community_cards, rest_com_cards);
        let opponent_best_hand = Strength.hand_best(opponent_hands);
        //return opponent_best_hand;
        let cpu_result = Strength.hand_strength(my_best_hand);
        let opponent_result = Strength.hand_strength(opponent_best_hand);
        if(cpu_result > opponent_result){
          count += 1;
        }}
        let odds = count / 3000;//勝確率
        let desired_bet = Math.trunc(odds * pot / (1 - odds) - (your_current_bet - raised_chip));
        return desired_bet;
    
        }
        
      static shuffleCard(deck){
          // 100回繰り返す
          [...Array(100)].forEach(() => {
            // 山札から2枚のカードをランダムに選んで交換する
            const j = Math.floor(Math.random() * deck.length);
            const k = Math.floor(Math.random() * deck.length);
            [deck[j], deck[k]] = [deck[k], deck[j]];
          });
          }
      static dealCard(rest, deck, n) {
             // n回繰り返す
            for (let i = 0 ; i < n ; i++){
            var a = deck.pop();
             rest.push(a);
              }
              return rest;
               }
                  
    
}
