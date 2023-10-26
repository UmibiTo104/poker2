import Player from "./player.js";
import Card from "./card.js";
import Cpu from "./cpu.js";
import Com from "./com.js";
import Util from "./util.js";




export default class Game{
    #player_hand;//(プレイヤーの手札2枚＋コミュニティーカード5枚)
    #cpu_hand;//(cpuの手札2枚＋コミュニティーカード5枚)
    #community_cards;
    #revealed;
    #you;
    #cpu;
    #com1;
    #com2;
    #com3;
    #com4;
    #com5;
    #your_chips;
    #cpu_chips;
    #your_bet;
    #cpu_bet;
    #pot;
    #game_over;
    #folder;
    #deck;
    #isRunning;
    //初期化
    constructor(){
        this.#player_hand = [];
        this.#cpu_hand = [];
        this.#community_cards = [];
        this.#revealed = 0;
        this.#you = null;
        this.#cpu = null;
        this.#com1 = null;
        this.#com2 = null;
        this.#com3 = null;
        this.#com4 = null;
        this.#com5 = null;
        this.#your_chips = 1000;
        this.#cpu_chips = 1000;
        this.#your_bet = 0;
        this.#cpu_bet = 0;
        this.#pot = 0;
        this.#game_over =false;//1ラウンドのゲーム実行状態(true:実行中,false:終了)
        this.#folder = null;
        this.#deck = [];
        this.#isRunning =false;//全ゲームの実行状態(true:実行中,false:終了)

        //イベントハンドラを登録する
        //this.#setupEvents();
    }

    //ゲームを実行する
    run(){
        //ゲームの状態を初期化する
        this.#initialize();
    }

    //1ラウンド、１ゲームの流れ
    #initialize(){
        this.#you = new Player(".card.you");
        this.#cpu = new Cpu(".card.cpu");
        this.#com1 = new Com(".card.com1");
        this.#com2 = new Com(".card.com2");
        this.#com3 = new Com(".card.com3");
        this.#com4 = new Com(".card.com4");
        this.#com5 = new Com(".card.com5");
        this.#deck = [];
        [...Array(52)].map((_,index)=>{
            this.#deck.push(new Card(index+1));
        });

        // 山札のカードをシャッフルする
        this.#shuffleCard();
        // 2枚プレイヤーに配る
        this.#dealCard(this.#you, 2);
        //2枚cpuに配る
        this.#dealCard(this.#cpu, 2);
         // ゲーム実行状態を更新
         this.#isRunning = true;
         // 画面の描画を更新する
         this.#updateView();
        
        this.#dealCard(this.#com1, 1);//com1に１枚配る(場の5枚の内一番左側)、フロップ時に配る
        this.#dealCard(this.#com2, 1);//左から二番目、フロップ時に配る
        this.#dealCard(this.#com3, 1);//左から三番目、フロップ時に配る
        this.#dealCard(this.#com4, 1);//四番目、ターン時に配る
        this.#dealCard(this.#com5, 1);//最後、リバー時に配る
        
       
      //どちらも下りなかった場合使う↓
       //player_hand作成
       this.#player_hand = this.#you.cards.concat(this.#com1.cards,this.#com2.cards,this.#com3.cards,this.#com4.cards,this.#com5.cards);
       //cpu_hand作成
       this.#cpu_hand = this.#cpu.cards.concat(this.#com1.cards,this.#com2.cards,this.#com3.cards,this.#com4.cards,this.#com5.cards);

       //console.log(this.#youhand);
       //console.log(this.#cpuhand);

       let pot = this.#pot;
       document.getElementById("pot").textContent = pot;

       let your_bet = this.#your_bet;
       document.getElementById("your_bet").textContent = your_bet;

       let cpu_bet = this.#cpu_bet;
       document.getElementById("cpu_bet").textContent = cpu_bet;

       let your_chips = this.#your_chips;
       document.getElementById("your_chips").textContent = your_chips;

       let cpu_chips = this.#cpu_chips;
       document.getElementById("cpu_chips").textContent = cpu_chips;


       
    }

    
    
    #shuffleCard(){
    // 100回繰り返す
    [...Array(100)].forEach(() => {
      // 山札から2枚のカードをランダムに選んで交換する
      const j = Math.floor(Math.random() * this.#deck.length);
      const k = Math.floor(Math.random() * this.#deck.length);
      [this.#deck[j], this.#deck[k]] = [this.#deck[k], this.#deck[j]];
    });
    }

  /**
   * 山札のカードをプレイヤーに配る
   */
  #dealCard(player, n) {
    // n回繰り返す
    [...Array(n)].map(() => {
      // 山札からカードを1枚取り出してプレイヤーに配る
      player.addCard(this.#deck.pop());
    });
   }

  /**
   * 画面の描画を更新する
   */
  #updateView() {
    // プレイヤーのカードを描画する
    this.#you.displayCard(true);
    // 相手のカードを描画する
   // this.#cpu.displayCard(true);//どちらも下りなかった場合のみ公開
    //場のカードを描画する
    //this.#com1.displayCard(true);//フロップ時に公開
    //this.#com2.displayCard(true);//フロップ時に公開
    //this.#com3.displayCard(true);//フロップ時に公開
    //this.#com4.displayCard(true);//ターン時に公開
    //this.#com5.displayCard(true);//リバー時に公開
  }

  
  
  
  

  
  
}

