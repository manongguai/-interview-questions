// 34.判断字符串是否符合规定，一个只包含大中小括号的字符串，判断是否全部闭合

/* 
    比如： {}  true
          {[]}()  true
         {]      false
*/

function isVaild(s){
    let map = {
        ')':'(',
        '}':'{',
        ']':'[',
    }
    let keys = Object.values(map)
    let source = []
    let len = s.length
    if(len%2!=0)return false
    for(let i=0;i<len;i++){
        console.log(s[i],source);
        if(keys.includes(s[i])){
            source.push(s[i])
        }else{
            if(map[s[i]] === source[source.length-1]){
                source.pop()
            }else{
                return false
            }
        }
    }
    return source.length>0?false:true
}

console.log(isVaild('{}'));
console.log(isVaild('{}[]()'));
console.log(isVaild('{}[()]'));
console.log(isVaild('{}['));
console.log(isVaild('{[]}'));
console.log(isVaild('{[}]()'));
console.log(isVaild('{[{}}]()'));


