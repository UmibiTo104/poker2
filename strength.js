import Util from "./util.js";

export default class Strength{
  order=0;
  rank=0;

//cardsは7枚のカード　cpu又はplayer＋コミュニティーカード
static hand_best(cards){
  let c =  this.change(cards);
  let b =  this.combination(c,5);
  b.forEach((e)=>{
   e.sort(this.compareNum);
  })
  let a =[];
  b.forEach((e)=>{
   a.push(this.hand_strength(e));
  })
  let max = Math.max(...a);
  let result = a.indexOf(max);
  return b[result];   
}




    //(hand)の引数にはcombination関数で作った組み合わせ(7枚内5枚)一つ一つを入れる、元々降順にしたやつ
    //この関数はarray(rankを基に降順にした全ての７枚中５枚の組み合わせの配列).forEach((e)=>{const a = []; a.push(hand_strength(e));});としてつかう
    //その次にmax(a)を行う
  static hand_strength(hand){
      //ロイヤルストレートフラッシュの判定
      if (
        hand[0][1] === 14 && 
        hand[1][1] === 13 && 
        hand[2][1] === 12 &&
        hand[3][1] === 11 &&
        hand[4][1] === 10 &&
        hand[0][0] === hand[1][0] &&
        hand[0][0] === hand[2][0] &&
        hand[0][0] === hand[3][0] &&
        hand[0][0] === hand[4][0] 
          ){
            this.order = 9;
            this.rank = Util.sum(900,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
            return this.rank;
          }
      //ストレートフラッシュの判定
      else if (
        hand[0][1] === hand[1][1]+1 &&
        hand[1][1] === hand[2][1]+1 &&
        hand[2][1] === hand[3][1]+1 &&
        hand[3][1] === hand[4][1]+1 &&
        hand[0][0] === hand[1][0] &&
        hand[0][0] === hand[2][0] &&
        hand[0][0] === hand[3][0] &&
        hand[0][0] === hand[4][0] 
          ){
            this.order = 8;
            this.rank = Util.sum(800,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
            return this.rank;
          }
      //フォーカードの判定
      else if (
        (hand[0][1] === hand[1][1] &&
        hand[0][1] === hand[2][1] &&
        hand[0][1] === hand[3][1]) ||
        (hand[1][1] === hand[2][1] &&
          hand[1][1] === hand[3][1] &&
          hand[1][1] === hand[4][1]) 
      ){
        this.order = 7;
        this.rank = Util.sum(700,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
        return this.rank;
      }
    //フルハウスの判定
    else if (
      (hand[0][1] === hand[1][1] &&
       hand[2][1] === hand[3][1] &&
       hand[2][1] === hand[4][1])||
      (hand[0][1] === hand[1][1] &&
       hand[0][1] === hand[2][1] &&
       hand[3][1] === hand[4][1])
    ){
      this.order = 6;
      this.rank = Util.sum(600,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    //フラッシュの判定
    else if (
      hand[0][0] === hand[1][0] &&
      hand[0][0] === hand[2][0] &&
      hand[0][0] === hand[3][0] &&
      hand[0][0] === hand[4][0]   
    ){
      this.order = 5;
      this.rank = Util.sum(500,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    //ストレートの判定
    else if (
        hand[0][1] === hand[1][1]+1 &&
        hand[1][1] === hand[2][1]+1 &&
        hand[2][1] === hand[3][1]+1 &&
        hand[3][1] === hand[4][1]+1 
    ){
      this.order = 4;
      this.rank = Util.sum(400,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    //スリーカードの判定
    else if (
      (hand[0][1] === hand[1][1] &&
       hand[0][1] === hand[2][1]) ||
      (hand[1][1] === hand[2][1] &&
       hand[1][1] === hand[3][1]) ||
      (hand[2][1] === hand[3][1] &&
      hand[2][1] === hand[4][1]) 
    ){
      this.order = 3;
      this.rank = Util.sum(300,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    //ツーペアの判定
    else if (
      (hand[0][1] === hand[1][1] &&
       hand[2][1] === hand[3][1])||
       (hand[1][1] === hand[2][1] &&
        hand[3][1] === hand[4][1])
    ){
      this.order = 2;
      this.rank = Util.sum(200,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    //ワンペアの判定
    else if (
      (hand[0][1] === hand[1][1])||
      (hand[1][1] === hand[2][1])||
      (hand[2][1] === hand[3][1])||
      (hand[3][1] === hand[4][1])
    ){
      this.order = 1;
      this.rank = Util.sum(100,hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    //役なし
    else{
      this.order =0;
      this.rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
      return this.rank;
    }
    };
  


static compareNum(a,b) {
        return  b[1] - a[1];
      };
    

////７枚から５枚の組み合わせを全て出す
static combination(num, k) {
    let ans = [];
    if (num.length < k) {
      return [];
    }
    if (k === 1) {
      for (let i = 0; i < num.length; i++) {
        ans[i] = [num[i]];
      }
    } else {
      for (let i = 0; i < num.length - k + 1; i++) {
        let row = this.combination(num.slice(i + 1), k - 1);
        for (let j = 0; j < row.length; j++) {
          ans.push([num[i]].concat(row[j]));
        }
      }
    }
    return ans;
  };

  //配列の要素をobjectから[suit,rank]に変換する
  static change(cards){
    const c = [];
    cards.forEach((_)=>{
      const s =[];
        s.push(_.suit);
        s.push(_.rank);
        c.push(s);
        }
      );
     return c;}

  
    
    }
    
