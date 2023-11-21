
// 斐波那契数列
// 递归1，大量的重复计算
function fib1(n){
    if(n<2) return n
    return fib1(n-1) + fib1(n-2) 
}

// 循环
function fib2(n){
    if(n<2) return n
    let f0 = 0,f1=1;
    let result = 0;
    for(let i=1;i<n;i++){
        result = f0 + f1
        f0 = f1
        f1 = result
    }
    return result
}


// 递归2,去除重复计算

function fib3(n){
    if(n<2) return n
    function _fib(n,a,b){
        if(n===0) return a
        return _fib(n-1,b,a+b)
    }
    return _fib(n,0,1)
}
console.log(fib3(4));