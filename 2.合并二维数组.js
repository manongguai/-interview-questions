/* 2.合并二维有序数组成一维有序数组，归并排序的思路 */
var merge = function(left,right) {
    let result = []
    while (left.length>0 && right.length>0) {
        if (left[0] <= right[0]) {
           result.push(left.shift());
       }else {
           result.push(right.shift());
       }
   }
    while(left.length){
        result.push(left.shift())
    }
    while(right.length){
        result.push(right.shift())
    }
    return result
}
var mergeSort = function(arr){
    if(arr.length<2){
        return arr
    }
    let middle = Math.floor(arr.length/2)
    let left = arr.slice(0,middle)
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right));
}

function mergeToArray(arr){
    let result =[]
    arr.forEach(item=>{
        if(Array.isArray(item)){
            result.push(...item)
        }else{
            result.push(item)
        }
    })
    return mergeSort(result)
}

console.log(mergeToArray([[1,2,5],[2,3,5],4,6,0,9,2,[11,2,98]]));
