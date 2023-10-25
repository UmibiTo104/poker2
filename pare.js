import Util from "./util.js";
/**
 * Pair クラス
 */
export default class Pair {
  /**
   * プロパティ
   */
  static #rank = 0; // 役を構成するランク

  /**
   * ロイヤルストレートフラッシュの成否を判定する
   */
  
  static isRoyalStraightFlush = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
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
    ) {
      isPair = true;
      // 5枚のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * ストレートフラッシュの成否を判定する
   */
  static isStraightFlush = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 5枚とも同じ絵柄でランクが連続
    if (
        hand[0][1] === hand[1][1]+1 &&
        hand[1][1] === hand[2][1]+1 &&
        hand[2][1] === hand[3][1]+1 &&
        hand[3][1] === hand[4][1]+1 &&
        hand[0][0] === hand[1][0] &&
        hand[0][0] === hand[2][0] &&
        hand[0][0] === hand[3][0] &&
        hand[0][0] === hand[4][0] 
    ) {
      isPair = true;
      // 5枚のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * フォーカードの成否を判定する
   */
  static isFourCard = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 1枚目から4枚目までのランクが同じ
    if (
        hand[0][1] === hand[1][1] &&
            hand[0][1] === hand[2][1] &&
            hand[0][1] === hand[3][1]   
    ) {
      isPair = true;
      // 1枚目から4枚目までのランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1]);
    }
    // 2枚目から5枚目までのランクが同じ
    else if (
      // 1,2枚目のランクが異なる
      hand[1][1] === hand[2][1] &&
        hand[1][1] === hand[3][1] &&
        hand[1][1] === hand[4][1]
    ) {
      isPair = true;
      // 2枚目から5枚目までのランクを合計
      this.#rank = Util.sum(hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * フルハウスの成否を判定する
   */
  static isFullHouse = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 1,2枚目と3～5枚目のランクが同じ
    if (
        hand[0][1] === hand[1][1] &&
        hand[2][1] === hand[3][1] &&
        hand[2][1] === hand[4][1]
    ) {
      isPair = true;
      // 5枚のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    // 1～3枚目と4,5枚目のランクが同じ
    else if (
        hand[0][1] === hand[1][1] &&
        hand[0][1] === hand[2][1] &&
        hand[3][1] === hand[4][1]
    ) {
      isPair = true;
      // 5枚のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * フラッシュの成否を判定する
   */
  static isFlush = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 5枚とも同じ絵柄
    if (
        hand[0][0] === hand[1][0] &&
        hand[0][0] === hand[2][0] &&
        hand[0][0] === hand[3][0] &&
        hand[0][0] === hand[4][0]   
    ) {
      isPair = true;
      // 5枚のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * ストレートの成否を判定する
   */
  static isStraight = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 5枚のランクが連続
    if (
        hand[0][1] === hand[1][1]+1 &&
        hand[1][1] === hand[2][1]+1 &&
        hand[2][1] === hand[3][1]+1 &&
        hand[3][1] === hand[4][1]+1 
    ) {
      isPair = true;
      // 5枚のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * スリーカードの成否を判定する
   */
  static isThreeCard = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 1～3枚目が同じランク
    if (
        hand[0][1] === hand[1][1] &&
        hand[0][1] === hand[2][1]
    ) {
      isPair = true;
      // 1～3枚目のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1]);
    }
    // 2～4枚目が同じランク
    else if (
        hand[1][1] === hand[2][1] &&
        hand[1][1] === hand[3][1]
    ) {
      isPair = true;
      // 2～4枚目のランクを合計
      this.#rank = Util.sum(hand[1][1],hand[2][1],hand[3][1]);
    }
    // 3～5枚目が同じランク
    else if (
        hand[2][1] === hand[3][1] &&
        hand[2][1] === hand[4][1]
    ) {
      isPair = true;
      // 3～5枚目のランクを合計
      this.#rank = Util.sum(hand[2][1],hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  /**
   * ツーペアの成否を判定する
   */
  static isTwoPair = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 1,2枚目と3,4枚目が同じランク
    if (
        hand[0][1] === hand[1][1] &&
        hand[2][1] === hand[3][1]
    ) {
      isPair = true;
      // 1,2枚目と3,4枚目のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1],hand[2][1],hand[3][1]);
    }
    // 2,3枚目と4,5枚目が同じランク
    else if (
        hand[1][1] === hand[2][1] &&
        hand[3][1] === hand[4][1]
    ) {
      isPair = true;
      // 2,3枚目と4,5枚目のランクを合計
      this.#rank = Util.sum(hand[1][1],hand[2][1],hand[3][1],hand[4][1]);
    } 
    return isPair;
  };

  /**
   * ワンペアの成否を判定する
   */
  static isOnePair = (hand) => {
    // 役の判定フラグ（true:成立,false:不成立）
    let isPair = false;
    // 1,2枚目が同じランク
    if (hand[0][1] === hand[1][1]) {
      isPair = true;
      // 1,2枚目のランクを合計
      this.#rank = Util.sum(hand[0][1],hand[1][1]);
    }
    // 2,3枚目が同じランク
    else if (hand[1][1] === hand[2][1]) {
      isPair = true;
      // 2,3枚目のランクを合計
      this.#rank = Util.sum(hand[1][1],hand[2][1]);
    }
    // 3,4枚目が同じランク
    else if (hand[2][1] === hand[3][1]) {
      isPair = true;
      // 3,4枚目のランクを合計
      this.#rank = Util.sum(hand[2][1],hand[3][1]);
    }
    // 4,5枚目が同じランク
    else if (hand[3][1] === hand[4][1]) {
      isPair = true;
      // 4,5枚目のランクを合計
      this.#rank = Util.sum(hand[3][1],hand[4][1]);
    }
    return isPair;
  };

  //引数cardsにはStrength.best_hand関数で求めた５枚の組み合わせを入れる
  static judge = (cards) => {
    // 判定結果
    let result = null;
    // ロイヤルストレートフラッシュの判定
    if (this.isRoyalStraightFlush(cards)) {
      result = {
        strength: 9,
        rank: this.#rank,
        hand: "ロイヤルストレートフラッシュ",
      };
    }
    // ストレートフラッシュの判定
    else if (this.isStraightFlush(cards)) {
      result = {
        strength: 8,
        rank: this.#rank,
        hand: "ストレートフラッシュ",
      };
    }
    // フォーカードの判定
    else if (this.isFourCard(cards)) {
      result = {
        strength: 7,
        rank: this.#rank,
        hand: "フォーカード",
      };
    }
    // フルハウスの判定
    else if (this.isFullHouse(cards)) {
      result = {
        strength: 6,
        rank: this.#rank,
        hand: "フルハウス",
      };
    }
    // フラッシュの判定
    else if (this.isFlush(cards)) {
      result = {
        strength: 5,
        rank: this.#rank,
        hand: "フラッシュ",
      };
    }
    // ストレートの判定
    else if (this.isStraight(cards)) {
      result = {
        strength: 4,
        rank: this.#rank,
        hand: "ストレート",
      };
    }
    // スリーカードの判定
    else if (this.isThreeCard(cards)) {
      result = {
        strength: 3,
        rank: this.#rank,
        hand: "スリーカード",
      };
    }
    // ツーペアの判定
    else if (this.isTwoPair(cards)) {
      result = {
        strength: 2,
        rank: this.#rank,
        hand: "ツーペア",
      };
    }
    // ワンペアの判定
    else if (this.isOnePair(cards)) {
      result = {
        strength: 1,
        rank: this.#rank,
        hand: "ワンペア",
      };
    }
    // 役が成立していない場合
    else {
      result = {
        strength: 0,
        rank: 0,
        hand: "役なし",
      };
    }
    return result;
  };
}
