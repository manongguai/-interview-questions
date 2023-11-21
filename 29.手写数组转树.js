let input = [
    {
      id: 1,
      val: "学校",
      parentId: null,
    },
    {
      id: 2,
      val: "班级1",
      parentId: 1,
    },
    {
      id: 3,
      val: "班级2",
      parentId: 1,
    },
    {
      id: 4,
      val: "学生1",
      parentId: 2,
    },
    {
      id: 5,
      val: "学生2",
      parentId: 3,
    },
    {
      id: 6,
      val: "学生3",
      parentId: 3,
    },
  ];

  function arrayToTree(array,pid){
    let result = []
    array.forEach((item,i)=>{
      if(item.parentId==pid){
        array.splice(i,1)
        item.children = arrayToTree(array,item.id)
        result.push(item)
      }
    })
    return result
  }
let treeArray = arrayToTree(input,null)
console.log(treeArray);