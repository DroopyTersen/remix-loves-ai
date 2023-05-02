import { useLocation } from "@remix-run/react";
import { SLIDES } from "~/SLIDES";

function useCurrentNumber(): number | null {
  const { pathname } = useLocation();
  // /talk/{number}/slide or /talk/{number}/demo
  let currentNumber = new RegExp(/\/talk\/(\d+)/).exec(pathname)?.[1];
  if (currentNumber) {
    return parseInt(currentNumber);
  }
  return null;
}
export const useCurrentSlide = () => {
  let currentNumber = useCurrentNumber() || 1;
  let currentSlide = SLIDES[currentNumber - 1];
  let nextPath =
    currentNumber < SLIDES.length ? `/talk/${currentNumber + 1}` : "";

  let prevPath = currentNumber > 1 ? `/talk/${currentNumber - 1}` : "";

  return {
    ...currentSlide,
    currentNumber,
    prevPath,
    nextPath,
  };
};
