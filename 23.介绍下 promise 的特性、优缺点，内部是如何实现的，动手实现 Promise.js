// 1）Promise基本特性

// 1、Promise有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
// 2、Promise对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调resolve和失败时的回调reject；另外resolve的参数除了正常值以外， 还可能是一个Promise对象的实例；reject的参数通常是一个Error对象的实例。
// 3、then方法返回一个新的Promise实例，并接收两个参数onResolved(fulfilled状态的回调)；onRejected(rejected状态的回调，该参数可选)
// 4、catch方法返回一个新的Promise实例
// 5、finally方法不管Promise状态如何都会执行，该方法的回调函数不接受任何参数
// 6、Promise.all()方法将多个多个Promise实例，包装成一个新的Promise实例，该方法接受一个由Promise对象组成的数组作为参数(Promise.all()方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例)，注意参数中只要有一个实例触发catch方法，都会触发Promise.all()方法返回的新的实例的catch方法，如果参数中的某个实例本身调用了catch方法，将不会触发Promise.all()方法返回的新实例的catch方法
// 7、Promise.race()方法的参数与Promise.all方法一样，参数中的实例只要有一个率先改变状态就会将该实例的状态传给Promise.race()方法，并将返回值作为Promise.race()方法产生的Promise实例的返回值
// 8、Promise.resolve()将现有对象转为Promise对象，如果该方法的参数为一个Promise对象，Promise.resolve()将不做任何处理；如果参数thenable对象(即具有then方法)，Promise.resolve()将该对象转为Promise对象并立即执行then方法；如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为fulfilled，其参数将会作为then方法中onResolved回调函数的参数，如果Promise.resolve方法不带参数，会直接返回一个fulfilled状态的 Promise 对象。需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
// 9、Promise.reject()同样返回一个新的Promise对象，状态为rejected，无论传入任何参数都将作为reject()的参数
// 2）Promise优点

// ①统一异步 API
// Promise 的一个重要优点是它将逐渐被用作浏览器的异步 API ，统一现在各种各样的 API ，以及不兼容的模式和手法。
// ②Promise 与事件对比
// 和事件相比较， Promise 更适合处理一次性的结果。在结果计算出来之前或之后注册回调函数都是可以的，都可以拿到正确的值。 Promise 的这个优点很自然。但是，不能使用 Promise 处理多次触发的事件。链式处理是 Promise 的又一优点，但是事件却不能这样链式处理。
// ③Promise 与回调对比
// 解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。
// ④Promise 带来的额外好处是包含了更好的错误处理方式（包含了异常处理），并且写起来很轻松（因为可以重用一些同步的工具，比如 Array.prototype.map() ）。
// 3）Promise缺点

// 1、无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 2、如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 3、当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
// 4、Promise 真正执行回调的时候，定义 Promise 那部分实际上已经走完了，所以 Promise 的报错堆栈上下文不太友好。
// 4）简单代码实现
// 最简单的Promise实现有7个主要属性, state(状态), value(成功返回值), reason(错误信息), resolve方法, reject方法, then方法.

// 1.简单实现
// class Promise1 {
//     callbacks = []
//     constructor(fn){
//         fn(this._reslove.bind(this))
//     }
//     then(thenback){
//         this.callbacks.push(thenback)
//     }
//     _reslove(value){
//         this.callbacks.forEach(f=>f(value))
//     }
// }

// let fn = (res)=>{
//     setTimeout(()=>{
//         console.log(123);res(1)
//     },10000)
    
// }
// let p1 = new Promise1(fn).then(value=>{
//     console.log(value);
// })

// 2.完整实现
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {  // then的时候把then传的函数传入
        return new Promise(resolve => {
            // 这里是一个同步任务，每次then都会执行
            this._handle({
                onFulfilled: onFulfilled || null, 
                resolve: resolve
            });
        });
    }
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if (!callback.onFulfilled) {
            callback.resolve(this.value);
            return;
        }
        var ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(callback => this._handle(callback));
    }
}


new Promise(reslove=>{
    setTimeout(()=>{
     console.log(1);
     reslove(2)
    })
 }).then(v=>{
     console.log(v);
 })