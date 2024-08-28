import { useRef, useEffect } from 'react';  
  
/**  
 * usePrevious  
 * 自定义Hook，用于获取变量的上一个值  
 * @param {any} value 需要追踪的当前值  
 * @returns {any} 上一个值  
 */  
function usePrevious(value) {  
  // 创建一个ref来存储之前的值  
  const ref = useRef(value);   // useRef是一个挂载在fib全局上的对象，  ref初始化后不变，只是ref.current会变 ,但不会引起dom的变化 ， 下面的return 之后返回一个最新的ref.current 作为state, 只有下次dom更新的时候会一并更新值
  
  // ref.current = value;   如果在这里赋值则会是同步的
  // 使用effect来更新ref的当前值  
  useEffect(() => {  
    // 将当前值赋给ref的current属性，以便下次渲染时我们可以访问它  
    ref.current = value;  
  }, [value]); // 只有当value变化时，effect才会运行  
  
  // 返回ref的current值，即上一次的值  
  return ref.current;  
}  
  
export default usePrevious;