import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Loading } from "~/components/Loading";
import { OpenAILogo } from "~/components/OpenAILogo";
import { useStopwatch } from "~/components/useStopwatch";

async function handleChatGPTStream(
  prompt: string,
  onData: (data: string) => void
) {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource("/talk/6/demo/api?prompt=" + prompt);

    eventSource.onmessage = (event) => {
      console.log(`\nRAW MESSAGE\nevent: ${event.type}\ndata: ${event.data}`);

      if (event?.data === "[DONE]") {
        console.log("🚀 | Event stream DONE. Closing event source");
        eventSource.close();
        resolve("");
      } else {
        try {
          let data = JSON.parse(event.data);
          console.log("PARSED DATA\n", JSON.stringify(data, null, 2));
          let content = data?.choices?.[0]?.delta?.content;
          if (content) {
            onData(content);
          }
        } catch (err) {
          console.log("🚀 | unable to parse data", event?.data);
          eventSource.close();
          reject(err);
        }
        // console.log("🚀 | eventSource.onmessage | event:", event.data);
      }
    };

    eventSource.onerror = (event) => {
      eventSource.close();
      reject(event);
    };
  });
}

export default function EventSourceDemo() {
  const [streamingData, setStreamingData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let stopwatch = useStopwatch();
  return (
    <div>
      <form
        className="max-w-2xl"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          setStreamingData("");
          stopwatch.reset();
          stopwatch.start();
          const formData = new FormData(event.target as HTMLFormElement);
          await handleChatGPTStream(
            formData.get("prompt") as string,
            (data) => {
              setStreamingData((prev) => prev + data);
            }
          );
          setIsLoading(false);
          stopwatch.stop();
        }}
      >
        <fieldset>
          <label>
            <span>Prompt</span>
            <textarea
              required
              name="prompt"
              rows={4}
              defaultValue={`Hi there from RemixConf 2023. I'm on stage demoing right now. Say hi to the crowd! 

We are at the end of my talk on connecting to the OpenAI chat completion api using streaming and the Remix web framework. This is the last demo!`}
              placeholder="Enter your prompt for the LLM here..."
            />
          </label>
          <div>
            <button className="w-full font-mono bg-emerald-600" type="submit">
              stream:true
            </button>
          </div>
        </fieldset>
        {(isLoading || streamingData) && (
          <div className="my-4 font-mono text-2xl font-bold text-center">
            {stopwatch?.value?.toFixed(2)} seconds
          </div>
        )}
        {streamingData && (
          <figure className="p-6 shadow-lg bg-gray-50 rounded-2xl ring-1 ring-gray-900/5">
            <p className="whitespace-pre-wrap">“{streamingData}”</p>
            <figcaption className="flex items-center mt-6 gap-x-4">
              <OpenAILogo />
              <div>
                <div className="font-semibold">OpenAI Chat Completion API</div>
                <div className="font-mono text-gray-600">Streamed response</div>
              </div>
            </figcaption>
          </figure>
        )}
      </form>
    </div>
  );
}
