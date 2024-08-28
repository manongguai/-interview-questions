import { useCallback, useRef } from 'react';

function useCustomCallback(callback) {
  const callbackRef = useRef(callback);

  // 每次更新 callbackRef 的 current 值为最新的 callback
  callbackRef.current = callback;

  // 使用 useCallback 包装一个新的函数，该函数内部调用最新的 callback
  return useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

export default useCustomCallback;
