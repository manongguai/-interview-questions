import { useCallback, useRef } from "react";

function useCustomCallback(callback) {
  const callbackRef = useRef(callback);

  // 每次更新 callbackRef 的 current 值为最新的 callback
  callbackRef.current = callback;

  // 使用 useCallback 包装一个新的函数，该函数内部调用最新的 callback
  // useCallback(callbackRef.current, []); 如果这么写，在这种情况下，useCallback 返回的只是 callbackRef.current 的引用，而不是一个新函数。问题在于，callbackRef.current 并不是一个固定的函数，而是随着 callback 的更新而改变的引用。这样做会导致 callback 中的 state 无法反映最新的变化。
  return useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

export default useCustomCallback;
