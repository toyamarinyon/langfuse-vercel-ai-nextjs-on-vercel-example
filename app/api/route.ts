import { getLangfuseExporter } from "@/lib/global-context";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { after } from "next/server";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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
  after(async () => {
    console.log("wait for generating trace");
    await sleep(1000);
    console.log("flush");
    const langfuseExporter = getLangfuseExporter();
    await langfuseExporter.forceFlush();
  });
  return Response.json({ text });
}
