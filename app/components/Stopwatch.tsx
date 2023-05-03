import { useRef, useState } from "react";

export function useStopwatch() {
  let [value, setValue] = useState<number>(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate: FrameRequestCallback = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      setValue((prev) => prev + deltaTime * 0.001);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function stop() {
    previousTimeRef.current = undefined;
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  }

  function start() {
    // Canceling in case this is called multiple times
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(animate);
  }

  function reset() {
    stop();
  }

  return { start, stop, reset, value };
}
