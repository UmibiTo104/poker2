import Player from "./player.js";
import Card from "./card.js";
import Cpu from "./cpu.js";
import Com from "./com.js";
import Util from "./util.js";




export default class Game{
    #c;
    #youhand ;//(プレイヤーの手札2枚＋コミュニティーカード5枚)
    #cpuhand ;//(cpuの手札2枚＋コミュニティーカード5枚)
    #you;
    #cpu;
    #com1;
    #com2;
    #com3;
    #com4;
    #com5;

    #cards;
    #isRunning;

    constructor(){
        this.#c = [];
        this.#youhand = [];
        this.#cpuhand = [];
        this.#you = null;
        this.#cpu = null;
        this.#com1 = null;
        this.#com2 = null;
        this.#com3 = null;
        this.#com4 = null;
        this.#com5 = null;
        this.#cards = [];
        this.#isRunning =false;//ゲーム実行状態(true:実行中,false:終了)

        //イベントハンドラを登録する
        //this.#setupEvents();
    }

    //ゲームを実行する
    run(){
        //ゲームの状態を初期化する
        this.#initialize();
    }

    #initialize(){
        this.#you = new Player(".card.you");
        this.#cpu = new Cpu(".card.cpu");
        this.#com1 = new Com(".card.com1");
        this.#com2 = new Com(".card.com2");
        this.#com3 = new Com(".card.com3");
        this.#com4 = new Com(".card.com4");
        this.#com5 = new Com(".card.com5");
        this.#cards = [];
        [...Array(52)].map((_,index)=>{
            this.#cards.push(new Card(index+1));
        });

        // 山札のカードをシャッフルする
        this.#shuffleCard();
        // 2枚プレイヤーに配る
        this.#dealCard(this.#you, 2);
        //2枚cpuに配る
        this.#dealCard(this.#cpu, 2);
        //場の５枚のカードを配る
        this.#dealCard(this.#com1, 1);//com1に１枚配る(場の5枚の内一番左側)
        this.#dealCard(this.#com2, 1);//左から二番目
        this.#dealCard(this.#com3, 1);//左から三番目
        this.#dealCard(this.#com4, 1);//四番目
        this.#dealCard(this.#com5, 1);//最後
        //console.log(this.#you.cards);
        //console.log(this.#cpu.cards);
       
       //youhand作成
       this.#youhand = this.#you.cards.concat(this.#com1.cards,this.#com2.cards,this.#com3.cards,this.#com4.cards,this.#com5.cards);
       //cpuhand作成
       this.#cpuhand = this.#cpu.cards.concat(this.#com1.cards,this.#com2.cards,this.#com3.cards,this.#com4.cards,this.#com5.cards);

       //console.log(this.#youhand);
       //console.log(this.#cpuhand);


        // ゲーム実行状態を更新
        this.#isRunning = true;
        // 画面の描画を更新する
        this.#updateView();
    }

    
    
    #shuffleCard(){
    // 100回繰り返す
    [...Array(100)].forEach(() => {
      // 山札から2枚のカードをランダムに選んで交換する
      const j = Math.floor(Math.random() * this.#cards.length);
      const k = Math.floor(Math.random() * this.#cards.length);
      [this.#cards[j], this.#cards[k]] = [this.#cards[k], this.#cards[j]];
    });
    }

  /**
   * 山札のカードをプレイヤーに配る
   */
  #dealCard(player, n) {
    // n回繰り返す
    [...Array(n)].map(() => {
      // 山札からカードを1枚取り出してプレイヤーに配る
      player.addCard(this.#cards.pop());
    });
   }

  /**
   * 画面の描画を更新する
   */
  #updateView() {
    // プレイヤーのカードを描画する
    this.#you.displayCard(true);
    // 相手のカードを描画する
    this.#cpu.displayCard(true);//
    //場のカードを描画する
    this.#com1.displayCard(true);//フロップ時に公開
    this.#com2.displayCard(true);//フロップ時に公開
    this.#com3.displayCard(true);//フロップ時に公開
    this.#com4.displayCard(true);//ターン時に公開
    this.#com5.displayCard(true);//リバー時に公開
  }

  
  
  
  

  
  
}

