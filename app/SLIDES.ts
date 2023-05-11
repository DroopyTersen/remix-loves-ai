export interface SlideDefinition {
  title: string;
  shortTitle?: string;
  hasDemo?: boolean;
}
export const SLIDES: SlideDefinition[] = [
  {
    title: "Get Rich Quick: AI Powered Web Apps",
    shortTitle: "Get Rich Quick",
    hasDemo: false,
  },
  {
    title: "Add ChatGPT sprinkles to your app",
    shortTitle: "Chat Completion API",
    hasDemo: true,
  },
  {
    title: "How fast is it?",
    hasDemo: false,
  },
  {
    title: "Streaming the Chat Completion API",
    shortTitle: "stream:true",
    hasDemo: true,
  },
  {
    title: "Server-sent Events",
  },
  {
    title: "Consuming an Event Stream in Remix",
    shortTitle: "Remix'ing SSE",
    hasDemo: true,
  },
];
