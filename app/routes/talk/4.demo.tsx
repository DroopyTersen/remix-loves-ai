import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { ChatResponseCard } from "~/components/ChatResponseCard";
import { Loading } from "~/components/Loading";
import { OpenAILogo } from "~/components/OpenAILogo";

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
              className="text-xl"
              rows={4}
              defaultValue={
                "Hi there from RemixConf 2023. I'm on stage demoing right now. Say hi to the crowd!"
              }
              placeholder="Enter your prompt for the LLM here..."
            />
          </label>
          <div>
            {!isLoading ? (
              <button
                className="w-full font-mono text-lg font-bold bg-emerald-600"
                type="submit"
              >
                stream:true
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </fieldset>
        {data && (
          <div className="grid grid-cols-1 gap-6">
            <ChatResponseCard subtitle={data?.model}>
              {data?.choices?.[0]?.message?.content}
            </ChatResponseCard>
            <img
              src="/assets/network-tab.png"
              alt="Network tab"
              className="rounded-lg shadow-xl"
            />
          </div>
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
      stream: true,
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

const SYSTEM_PROMPT = `Please limit the response to around 30 or 40 words.`;
