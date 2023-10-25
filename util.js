export default class Util{
    /*イベントハンドラを追加する*/
    static addEventListener=(selector,event,handler)=>{
        document.querySelectorAll(selector).forEach((e)=>e.addEventListener(event,handler));
    }

    //数値を合計する
    static sum = (...numbers) =>{
        let sum = 0;
        numbers.forEach((e) => {
            sum += e;
        });
        return sum;
    };
}

