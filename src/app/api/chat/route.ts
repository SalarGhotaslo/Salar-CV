import { NextRequest, NextResponse } from "next/server";
import { streamChatCompletion, type ChatMessage } from "@/lib/openrouter";
import { buildContextFromContent } from "@/lib/content";

// In-memory rate limiter — best-effort on serverless (resets on cold start).
// For a personal CV site this is sufficient to prevent rapid abuse.
const RATE_LIMIT = 15;        // max requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipHits.get(ip);

  if (!record || now > record.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) return true;

  record.count += 1;
  return false;
}

function buildSystemPrompt(): string {
  return `You are an AI assistant on Salar's personal website. Answer questions about Salar based only on the facts below. Be friendly, concise, and professional. If asked something you don't know, say so honestly.

--- FACTS ---
${buildContextFromContent()}`;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    console.warn(`[chat] rate-limited ip=${ip}`);
    return NextResponse.json(
      { error: "Too many requests. Please try again later. The API is rate-limited." },
      { status: 429 }
    );
  }

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

  const MAX_MESSAGES = 20;
  const MAX_MESSAGE_LENGTH = 2000;

  const raw = (body as { messages: unknown[] }).messages;

  // Validate shape, strip system-role injection, enforce size limits
  const userMessages: ChatMessage[] = [];
  for (const m of raw) {
    if (
      !m ||
      typeof m !== "object" ||
      !("role" in m) ||
      !("content" in m) ||
      typeof (m as Record<string, unknown>).content !== "string" ||
      (m as Record<string, unknown>).role === "system"
    ) {
      continue;
    }
    const role = (m as Record<string, unknown>).role;
    if (role !== "user" && role !== "assistant") continue;
    const content = ((m as Record<string, unknown>).content as string).slice(0, MAX_MESSAGE_LENGTH);
    userMessages.push({ role, content });
    if (userMessages.length >= MAX_MESSAGES) break;
  }

  if (userMessages.length === 0) {
    return NextResponse.json({ error: "No valid messages provided" }, { status: 400 });
  }

  // Log the question — visible in Vercel Functions logs (dashboard → Logs tab).
  const question = [...userMessages].reverse().find((m) => m.role === "user")?.content ?? "";
  console.log(`[chat] ip=${ip} question=${JSON.stringify(question)}`);

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...userMessages,
  ];

  let upstream: ReadableStream<Uint8Array>;
  try {
    upstream = await streamChatCompletion(messages);
  } catch (err) {
    console.error("[chat] upstream error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return new NextResponse(upstream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
