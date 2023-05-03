export interface SlideDefinition {
  title: string;
  shortTitle?: string;
  hasDemo?: boolean;
}
export const SLIDES: SlideDefinition[] = [
  {
    title: "Introduction",
    hasDemo: false,
  },
  {
    title: "OpenAI Chat Completion API",
    shortTitle: "Chat Completion API",
    hasDemo: true,
  },
  {
    title: "How fast is it?",
    hasDemo: false,
  },
  {
    title: "Streaming the Chat Completion API",
    shortTitle: "Stream API Response",
  },
  {
    title: "Server Sent Events",
  },
  {
    title: "Real World Strategies",
  },
];
