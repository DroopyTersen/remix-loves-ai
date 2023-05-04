import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
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
              rows={4}
              defaultValue={
                "Hi there from RemixConf 2023. I'm on stage demoing right now. Say hi to the crowd!"
              }
              placeholder="Enter your prompt for the LLM here..."
            />
          </label>
          <div>
            {!isLoading ? (
              <button className="w-full font-mono bg-emerald-600" type="submit">
                stream:true
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </fieldset>
        {data && (
          <figure className="p-6 shadow-lg bg-gray-50 rounded-2xl ring-1 ring-gray-900/5">
            <p className="whitespace-pre-wrap">
              “{data?.choices?.[0]?.message?.content}”
            </p>
            <figcaption className="flex items-center mt-6 gap-x-4">
              <OpenAILogo />
              <div>
                <div className="font-semibold">OpenAI Chat Completion API</div>
                <div className="font-mono text-gray-600">{data?.model}</div>
              </div>
            </figcaption>
          </figure>
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
          role: "user",
          content: prompt,
        },
      ],
    }),
  });
};
