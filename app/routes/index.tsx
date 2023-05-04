import { LoaderArgs, redirect } from "@remix-run/node";

export const loader = ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  url.pathname = "talk/1";
  return redirect(url.toString());
};
