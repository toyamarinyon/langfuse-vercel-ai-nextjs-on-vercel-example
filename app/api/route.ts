import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST() {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "hello",
  });
  return Response.json({ text });
}
