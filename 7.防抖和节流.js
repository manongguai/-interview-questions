// 1.防抖  在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 适用场景：
// 搜索框联想场景：防止联想发送请求，只发送最后一次输入
// 简单写法

function debounce(fn, timeout = 600) {
  let timer;
  function fun() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, timeout);
  }
  return fun;
}

/*2.节流 原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。适用场景 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
缩放场景：监控浏览器resize 
        按钮提交场景：防止多次提交按钮，短时间只提交一次
*/

function test() {
  console.log(123);
}

function throttle(fn, timeout) {
  let flag = false;
  function fun() {
    if (flag) {
      return;
    }
    fn();
    flag = true;
    timer = setTimeout(() => {
      flag = false;
    }, timeout);
  }
  return fun;
}

class Observer {
  target = [];
  constructor() {}
  on(params) {}
  emit(params) {}
}
