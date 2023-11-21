// 链式调用的核心就在于调用完的方法将自身实例返回


class A{
    add(p){
        console.log(p);
        return new A()
    }
}
function B(params) {
    
}

B.prototype.add = function(params) {
    console.log(params);
    return this
}


let c = new B()
c.add(1).add(2)


let d = new A()
d.add(1).add(2)

