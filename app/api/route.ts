import { waitForFlush } from "../../lib/wait-for-flush";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { after } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
    maxTokens: 10,
    experimental_telemetry: {
      isEnabled: true,
      functionId: "local-function-id",
      metadata: { example: "value" },
    },
  });
  after(waitForFlush);
  return Response.json({ text });
}
