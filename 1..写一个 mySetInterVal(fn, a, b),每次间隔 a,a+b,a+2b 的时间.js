/* 
    1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
*/

function fn(){
    console.log(1);
}

// 方案1 闭包函数
/* function mySetInterVal(fn, a=0, b=0){
    let timer=null
    let arr = [ a,a+b,a+2*b]
    function setTime(t){
        timer = setTimeout(()=>{
            console.log(t);
            let i = arr.findIndex(k=>k==t)
            i+=1
            if(i>2){
                i = 0
            }
            setTime(arr[i])
        },t)
    } 
    setTime(a)
    return ()=>{
        clearTimeout(timer)
    }
}

const myClear = mySetInterVal(fn,1000,2000)

setTimeout(()=>{
    myClear()
    console.log('clear');
},8000)
 */

// 方案2 构造函数

function SetTime(fn, a=0, b=0){
    this.a = a
    this.b = b 
    this.timer = null
    this.arr = [ a,a+b,a+2*b]
    this.mySetInterVal = function(t=this.arr[0]){
        this.timer = setTimeout(()=>{
            console.log(t);
            let i = this.arr.findIndex(k=>k==t)
            i+=1
            if(i>2){
                i = 0
            }
            this.mySetInterVal(this.arr[i])
        },t)
    } 
    this.myClear = function(){
        clearTimeout(this.timer)
    }
}

var time = new SetTime(1,1000,2000)
time.mySetInterVal()


setTimeout(()=>{
    time.myClear()
    console.log('clear');
},12000)
