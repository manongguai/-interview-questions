// var x = 11;
// var obb = {
//     x: 222,
//     y: {
//         x:333,
//         obc: function f() {
//             console.log(this)  // 这里的this指的是y,所以箭头函数的this就是y
//             var x = 111;
//             var obj = {
//                 x: 22,
//                 say: () => {
//                     console.log(this.x);
//                 }
//             }
//             obj.say()
//         }
//     }
// }
// obb.y.obc()  //333

// 箭头函数，那么函数中的this 就指向 定义这个箭头函数定义在什么位置有关系。
// 箭头函数在哪里被定义，this就指向那个位置的this
let a = 1
class A{
    a=2
    say=()=>{
        console.log(this.a);
    }
}
let e = new A()     // 此时箭头函数被定义在e里
var b = e.say
b()

var b = {   
    a :3,
    say:()=>{
        console.log(this.a);   //此时say已经被定义在window,严格模式下是this是undefined
    },
    show(){
        console.log(this.a); 
    }
}

b.say()  // undefined
b.show()  // 3

// 匿名函数的this指向全局