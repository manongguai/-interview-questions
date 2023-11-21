Array.prototype.myMap = function(fn) {
    let result = []
    for(i=0;i<this.length;i++){
        result.push(fn(this[i]))
    }
    return result
}

let a = [1,2,3,'a']


var b = a.myMap((i=>{
    return i+'1'
}))
console.log(b);