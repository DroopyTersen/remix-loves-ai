import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { ChatResponseCard } from "~/components/ChatResponseCard";
import { Loading } from "~/components/Loading";
import { OpenAILogo } from "~/components/OpenAILogo";
import { StopwatchDisplay } from "~/components/StopwatchDisplay";
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
            <span className="text-lg font-bold text-gray-600">Final Demo!</span>
            <textarea
              required
              name="prompt"
              rows={6}
              className="text-lg"
              defaultValue={`Hi there from RemixConf 2023. I'm on stage demoing right now.

We are at the end of my talk on connecting to the OpenAI chat completion api using streaming and the Remix web framework. This is the last demo!

Say hi and bye to the crowd!`}
              placeholder="Enter your prompt for the LLM here..."
            />
          </label>
          <div>
            <button
              className="w-full font-mono text-lg font-bold bg-emerald-600"
              type="submit"
            >
              stream:true
            </button>
          </div>
        </fieldset>
        {(isLoading || streamingData) && (
          <StopwatchDisplay value={stopwatch.value} />
        )}
        {streamingData && (
          <ChatResponseCard subtitle="stream:true">
            {streamingData}
          </ChatResponseCard>
        )}
      </form>
    </div>
  );
}
