import { Link, Outlet, NavLink } from "@remix-run/react";

export default function TalkLayout() {
  return (
    <main className="p-2 md:p-4">
      <ul className="flex gap-2 mb-4 md:mb-8">
        <li>
          <NavTab to="../slide">Slide</NavTab>
        </li>
        <li>
          <NavTab to="../demo">Demo</NavTab>
        </li>
      </ul>
      <section className="prose">
        <Outlet />
      </section>
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
