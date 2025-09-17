import { useCallback, useRef } from "react";

export const useGamePerformance = () => {
  const frameRef = useRef();
  const lastTimeRef = useRef(0);

  // Debounce para evitar múltiplas chamadas em sequência
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Throttle para limitar a frequência de chamadas
  const throttle = useCallback((func, limit) => {
    return (...args) => {
      const now = Date.now();
      if (now - lastTimeRef.current >= limit) {
        func(...args);
        lastTimeRef.current = now;
      }
    };
  }, []);

  // RequestAnimationFrame para animações suaves
  const requestAnimationFrame = useCallback((callback) => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = window.requestAnimationFrame(callback);
  }, []);

  // Cleanup para cancelar animações
  const cancelAnimationFrame = useCallback(() => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  return {
    debounce,
    throttle,
    requestAnimationFrame,
    cancelAnimationFrame,
  };
};


