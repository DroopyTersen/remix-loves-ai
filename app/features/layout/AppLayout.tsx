import { Link } from "@remix-run/react";
import { useCurrentSlide } from "./useCurrentSlide";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  let currentSlide = useCurrentSlide();
  return (
    <body className="grid grid-rows-[auto_1fr] h-full relative">
      <header className="sticky top-0 z-10 grid justify-between grid-cols-[auto_3fr_auto] border-b text-emerald-700 bg-white items-center">
        {currentSlide.prevPath ? (
          <Link to={currentSlide.prevPath}>Prev</Link>
        ) : (
          <span></span>
        )}
        <h2 className="text-xl font-bold text-center">
          {currentSlide.shortTitle || currentSlide?.title}
        </h2>
        {currentSlide.nextPath ? (
          <Link className="text-right" to={currentSlide.nextPath}>
            Next
          </Link>
        ) : (
          <span></span>
        )}
      </header>
      {children}
    </body>
  );
};
