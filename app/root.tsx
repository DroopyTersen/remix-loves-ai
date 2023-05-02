import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import codeHikeStyles from "@code-hike/mdx/styles.css";
import appStyles from "./app.css";
import picnicCss from "./picnic.css";
import { AppLayout } from "./features/layout/AppLayout";
export function links() {
  return [
    { rel: "stylesheet", href: picnicCss },
    { rel: "stylesheet", href: appStyles },
    { rel: "stylesheet", href: codeHikeStyles },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <AppLayout>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </AppLayout>
    </html>
  );
}
