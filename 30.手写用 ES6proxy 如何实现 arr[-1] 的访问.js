/* 第 30 题：使用ES6 的Proxy实现数组负索引。 （负索引：例如，可以简单地使用arr[-1]替代arr[arr.length-1]访问最后一个元素，[-2]访问倒数第二个元素，以此类推） #36 */

let arr = [1,2,3,45,6,7]

const arrProxy = new Proxy(arr,{
    get(target,proerpty){
        if(proerpty>=0){
            return Reflect.get(target,proerpty)
        }
        return Reflect.get(target,target.length+Number(proerpty))
    }
})

console.log(arrProxy[-1]);