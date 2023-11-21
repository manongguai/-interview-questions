function total(str) {
    let len = str.length
    if (len ==1) 
        return 1
    
    let total = 0
    let k = 0  // 每次需要计算量
    for (let i = 1; i < len; i++) {
        let j = i - 1
        let count = 0
        while (j >= k && str[i] !== str[j]) { // 如果相等 比较目前最大间距
            count++   // 循环次数
            j--;
        }
        k = j+1
        if(count+1>total){   //count要多加一个两头相等的数字
            total = count+1
        }

    }
    return total
}
console.log(total('aba11ca121a'));
