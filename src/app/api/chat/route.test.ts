// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

vi.mock("@/lib/openrouter", () => ({
  streamChatCompletion: vi.fn(),
}));

import { streamChatCompletion } from "@/lib/openrouter";

const mocked = vi.mocked(streamChatCompletion);

function makeRequest(body: unknown, raw = false) {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for invalid JSON", async () => {
    const res = await POST(makeRequest("{ bad json }", true));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/invalid json/i);
  });

  it("returns 400 when messages field is missing", async () => {
    const res = await POST(makeRequest({ foo: "bar" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("messages");
  });

  it("returns 400 when messages is not an array", async () => {
    const res = await POST(makeRequest({ messages: "not-an-array" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for an empty body object", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 502 when upstream streamChatCompletion throws", async () => {
    mocked.mockRejectedValueOnce(new Error("API down"));
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] })
    );
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.error).toBe("API down");
  });

  it("returns 502 with generic message for non-Error upstream throws", async () => {
    mocked.mockRejectedValueOnce("string error");
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] })
    );
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.error).toBe("Upstream error");
  });

  it("returns an SSE stream with correct headers on success", async () => {
    mocked.mockResolvedValueOnce(new ReadableStream());
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] })
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/event-stream");
    expect(res.headers.get("Cache-Control")).toBe("no-cache");
  });

  it("prepends a system message containing CV context", async () => {
    mocked.mockResolvedValueOnce(new ReadableStream());
    await POST(
      makeRequest({ messages: [{ role: "user", content: "Who are you?" }] })
    );
    const [sentMessages] = mocked.mock.calls[0];
    expect(sentMessages[0].role).toBe("system");
    expect(sentMessages[0].content).toContain("Salar");
  });

  it("appends all user messages after the system prompt", async () => {
    mocked.mockResolvedValueOnce(new ReadableStream());
    const userMessages = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
      { role: "user", content: "Tell me more" },
    ];
    await POST(makeRequest({ messages: userMessages }));
    const [sentMessages] = mocked.mock.calls[0];
    expect(sentMessages.slice(1)).toEqual(userMessages);
  });

  it("accepts an empty messages array", async () => {
    mocked.mockResolvedValueOnce(new ReadableStream());
    const res = await POST(makeRequest({ messages: [] }));
    expect(res.status).toBe(200);
  });
});
