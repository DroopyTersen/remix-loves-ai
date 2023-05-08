import { Link, Outlet, NavLink } from "@remix-run/react";
import { useState } from "react";
import { useCurrentSlide } from "~/features/layout/useCurrentSlide";

export default function TalkLayout() {
  let currentSlide = useCurrentSlide();
  let [isPresentationMode, setIsPresentationMode] = useState<boolean>(true);

  return (
    <main
      className={`relative p-2 md:p-4 ${
        isPresentationMode ? "presentation-mode max-w-3xl mx-auto" : ""
      }`}
    >
      <h1 className="my-4 text-xl font-bold md:my-8 md:text-4xl">
        {currentSlide?.title}
      </h1>
      {currentSlide?.hasDemo && (
        <ul className="flex gap-2 mb-4 md:mb-8 top-[80px] bg-white z-10">
          <li className="p-2 m-0">
            <NavTab to="../slide">Slide</NavTab>
          </li>
          <li className="p-2 m-0">
            <NavTab to="../demo">Demo</NavTab>
          </li>
        </ul>
      )}
      <section className="prose">
        <Outlet />
      </section>
      <div className="fixed z-20 fab bottom-4 right-4">
        <button
          onClick={() => setIsPresentationMode((prev) => !prev)}
          className="p-2 text-sm text-gray-600 rounded-full shadow-xl hover:bg-emerald-50 bg-gray-200/70 hover:text-emerald-700"
        >
          {isPresentationMode ? "Show Notes" : "Present"}
        </button>
      </div>
    </main>
  );
}

function NavTab({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <NavLink
      to={to}
      relative="path"
      className={({ isActive, isPending }) =>
        `p-2 hover:bg-emerald-50 hover:text-gray-900 border-b-4 font-bold ${
          isActive
            ? "border-b-emerald-600 text-gray-800"
            : "border-b-transparent text-gray-600"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
