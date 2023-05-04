import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { Loading } from "~/components/Loading";
import { OpenAILogo } from "~/components/OpenAILogo";
import { useStopwatch } from "~/components/useStopwatch";

export default function IsItFastDemo() {
  return (
    <div>
      <div className="notes">
        What things typically impact the spend of an API endpoint?
        <ul>
          <li>Network latency</li>
          <li>Database connectivity & query optimization</li>
          <li>How much data is coming back over the wire</li>
          <li>Etc...</li>
        </ul>
        <p>
          Typically, you wouldn't expect a request to the same endpoint for 3
          items vs 30 items to have a significant difference in response time.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <PromptDemo label={"Prompt A"} prompt="Count from 1 to 3 in words." />
        <PromptDemo label="Prompt B" prompt="Count from 1 to 30 in words." />
      </div>
    </div>
  );
}

function PromptDemo({ prompt, label }: { prompt: string; label: string }) {
  let fetcher = useFetcher();
  let isLoading = fetcher?.state !== "idle";
  let data = fetcher.data;
  let stopwatch = useStopwatch();
  useEffect(() => {
    if (fetcher?.data) {
      stopwatch.stop();
    }
  }, [fetcher?.data]);
  return (
    <fetcher.Form
      method="post"
      className="max-w-2xl"
      onSubmit={() => {
        stopwatch.reset();
        stopwatch.start();
      }}
    >
      <fieldset disabled={isLoading}>
        <label>
          <span>{label}</span>
          <textarea required name="prompt" rows={2} defaultValue={prompt} />
        </label>
        <div>
          {!isLoading ? (
            <button className="w-full bg-emerald-600" type="submit">
              Go!
            </button>
          ) : (
            <Loading />
          )}
        </div>
      </fieldset>
      {(isLoading || fetcher.data) && (
        <div className="my-4 font-mono text-2xl font-bold text-center">
          {stopwatch?.value?.toFixed(2)} seconds
        </div>
      )}
      {data && !isLoading && (
        <figure className="p-6 shadow-lg bg-gray-50 rounded-2xl ring-1 ring-gray-900/5">
          <p className="text-lg whitespace-pre-wrap">
            “{data?.choices?.[0]?.message?.content}”
          </p>
          <figcaption className="flex items-center mt-6 text-sm gap-x-4">
            <OpenAILogo />
            <div>
              <div className="font-semibold">OpenAI Chat Completion API</div>
              <div className="font-mono text-gray-600">{data?.model}</div>
            </div>
          </figcaption>
        </figure>
      )}
    </fetcher.Form>
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
