import { NextRequest, NextResponse } from "next/server";
import { streamChatCompletion, type ChatMessage } from "@/lib/openrouter";
import { buildContextFromContent } from "@/lib/content";

function buildSystemPrompt(): string {
  return `You are an AI assistant on Salar's personal website. Answer questions about Salar based only on the facts below. Be friendly, concise, and professional. If asked something you don't know, say so honestly.

--- FACTS ---
${buildContextFromContent()}`;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !Array.isArray((body as Record<string, unknown>).messages)
  ) {
    return NextResponse.json(
      { error: "Request body must include a messages array" },
      { status: 400 }
    );
  }

  const userMessages = (body as { messages: ChatMessage[] }).messages;

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...userMessages,
  ];

  let upstream: ReadableStream<Uint8Array>;
  try {
    upstream = await streamChatCompletion(messages);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream error";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return new NextResponse(upstream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
