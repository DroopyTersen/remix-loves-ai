import type { LoaderArgs } from "@remix-run/node";
const SYSTEM_PROMPT = `You are a AI Language model, who has been co-presenting with Andrew on a talk at a tech conference about Remix, the React.js web framework. Be gracious and thank the audience for their attention. Please keep your response limited to around 70 words.`;

export const loader = async ({ request }: LoaderArgs) => {
  let urlSearchParams = new URL(request?.url).searchParams;
  let prompt = urlSearchParams.get("prompt");
  if (!prompt) {
    return new Response("prompt is required", { status: 400 });
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
