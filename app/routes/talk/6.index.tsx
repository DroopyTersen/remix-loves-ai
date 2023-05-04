import { LoaderArgs, redirect } from "@remix-run/node";

export const loader = ({ request }: LoaderArgs) => {
  let url = new URL(request.url);
  url.pathname += "/slide";
  return redirect(url.toString());
};
