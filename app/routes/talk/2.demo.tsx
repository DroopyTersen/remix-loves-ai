import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { ChatResponseCard } from "~/components/ChatResponseCard";
import { Loading } from "~/components/Loading";

const SYSTEM_PROMPT = `You are a AI Language model,  at a tech conference about Remix, the React.js web framework. You are super witty, with a good sense of humor. When your co-presenter, prompts you, try to provide some fun clever banter. Nothing too cheesy though please. Be cool, not cringe.

Please limit the response to around 30 or 40 words.`;

export default function Demo1() {
  let fetcher = useFetcher();
  let isLoading = fetcher?.state !== "idle";
  let data = fetcher.data;
  return (
    <div>
      <fetcher.Form
        method="post"
        action="/talk/2/demo"
        className="max-w-2xl p-4 border rounded-lg shadow-xl md:p-8"
      >
        <fieldset disabled={isLoading}>
          <label>
            <span>Prompt</span>
            <textarea
              required
              name="prompt"
              rows={4}
              className="text-xl"
              defaultValue={
                "Hi there from RemixConf 2023. I'm on stage demoing right now. Say hi to the crowd!"
              }
              placeholder="Enter your prompt for the LLM here..."
            />
          </label>
          <div>
            {!isLoading ? (
              <button className="w-full bg-emerald-600" type="submit">
                Send to ChatGPT
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </fieldset>
        {data && (
          <ChatResponseCard subtitle={data?.model}>
            {data?.choices?.[0]?.message?.content}
          </ChatResponseCard>
        )}
      </fetcher.Form>
      {/* <details className="mt-8">
        <summary>System Prompt</summary>
        <p className="p-2 border rounded bg-gray-50">{SYSTEM_PROMPT}</p>
      </details> */}
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
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
};
