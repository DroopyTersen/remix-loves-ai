import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Loading } from "~/components/Loading";

export default function Demo1() {
  let fetcher = useFetcher();
  let isLoading = fetcher?.state !== "idle";
  let data = fetcher.data;
  return (
    <div>
      <fetcher.Form method="post" className="max-w-2xl">
        <fieldset disabled={isLoading}>
          <label>
            <span>Prompt</span>
            <textarea
              required
              name="prompt"
              rows={4}
              defaultValue={
                "Hi there from RemixConf 2023. I'm on stage demoing right now. Say hi to the crowd!"
              }
              placeholder="Enter your prompt for the LLM here..."
            />
          </label>
          <div>
            {!isLoading ? (
              <button className="w-full bg-emerald-600" type="submit">
                Send
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </fieldset>
        {data && (
          <pre className="max-w-full text-sm whitespace-pre-wrap">
            {data?.choices?.[0]?.message?.content}
          </pre>
        )}
      </fetcher.Form>
    </div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  let prompt = formData.get("prompt");
  if (!prompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
};
