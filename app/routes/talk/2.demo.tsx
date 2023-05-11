import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { ChatResponseCard } from "~/components/ChatResponseCard";
import { Loading } from "~/components/Loading";

const SYSTEM_PROMPT = `You are a AI Language model,  at a tech conference about Remix, the React.js web framework. You are super witty, with a good sense of humor. When your co-presenter, prompts you, try to provide some fun clever banter. Nothing too cheesy though please. Be cool, not cringe.

Please limit the response to around 20 or 30 words. Maybe end with an emoji.
Some good examples are:

Hey there RemixConf 2023! 👋 As an AI, I don't get nervous on stage, but I do love a good audience. Let's have some fun today!

Hello RemixConf 2023! I'm here to bring the AI sass and the React class

Hey RemixConf 2023! 👋 Can I get a round of applause for my human counterpart? Don't worry, I won't be putting them out of a job anytime soon 😂

`;

export default function Demo1() {
  let fetcher = useFetcher();
  let isLoading = fetcher?.state !== "idle";
  let data = fetcher.data;
  useEffect(() => {
    if (fetcher?.data?.choices?.[0]?.message?.content) {
      console.log(
        "🚀 | fetcher?.data?.choices?.[0]?.message?.content",
        fetcher?.data?.choices?.[0]?.message?.content
      );
      const speech = new SpeechSynthesisUtterance();
      speech.text = fetcher?.data?.choices?.[0]?.message?.content;

      // You can set additional options for speech, such as voice, rate, pitch, etc.
      // speech.voice = speechSynthesis.getVoices()[0];
      speech.rate = 1.4;
      speech.pitch = 0.45;

      speechSynthesis.speak(speech);
    }
  }, [fetcher?.data]);
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
