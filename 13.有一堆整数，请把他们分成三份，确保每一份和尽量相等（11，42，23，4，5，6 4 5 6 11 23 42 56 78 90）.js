/* 有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90） */


/* 
瀑布流：

1.先定义三个容器，
2.然后把数组倒序
3.依次从数组中取出第一个数放入分别三个容器
4.循环，每次比较三个容器中数字总和，将数组的第一个数字放入总和最小的容器中，直到数组为空
*/
function makeAlmostEqual (arr, part) {
    let orderedArr = arr.sort((a,b) => b - a)
    let res = Array(part).fill(void(0)).map(() => [])

    orderedArr.forEach(value => {
        let minArrIndex = getMinArrIndex(res)
        res[minArrIndex].push(value)
        })
        return res
    }
    
    function getSum (arr) {
      return arr.reduce((sum, v) => sum + v, 0)
    }
    function getMinArrIndex (arrs) {
        let minArrIndex = 0
        arrs.forEach((arr, index) => {
            if (getSum(arrs[minArrIndex]) > getSum(arrs[index])) {
            minArrIndex = index
        }
    })
    // console.log(arrs)
    return minArrIndex
    }
    
  console.log(  makeAlmostEqual([1, 65, 4, 32, 95, 33, 9, 3], 3));