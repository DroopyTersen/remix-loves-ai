import { Link } from "@remix-run/react";
import { useCurrentNumber, useCurrentSlide } from "./useCurrentSlide";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  let currentSlide = useCurrentSlide();
  return (
    <body className="grid grid-rows-[auto_1fr] h-full relative">
      <header className="sticky top-0 z-10 grid justify-between grid-cols-[1fr_3fr_1fr] p-2 border-b md:p-4 bg-emerald-700 text-gray-50">
        <h2 className="font-bold font-xl">Remix Talk</h2>
        <div className="grid justify-between grid-cols-3">
          {currentSlide.prevPath ? (
            <Link to={currentSlide.prevPath}>Prev</Link>
          ) : (
            <span></span>
          )}
          <h2 className="font-bold text-center">{currentSlide.title}</h2>
          {currentSlide.nextPath ? (
            <Link className="text-right" to={currentSlide.nextPath}>
              Next
            </Link>
          ) : (
            <span></span>
          )}
        </div>
        <div></div>
      </header>
      {children}
    </body>
  );
};
