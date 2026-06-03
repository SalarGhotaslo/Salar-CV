import { describe, it, expect, vi, afterEach } from "vitest";
import { parseSSEChunk, streamChatCompletion } from "./openrouter";

describe("parseSSEChunk", () => {
  it("extracts text from a single delta", () => {
    const chunk = `data: ${JSON.stringify({
      choices: [{ delta: { content: "Hello" } }],
    })}`;
    expect(parseSSEChunk(chunk)).toBe("Hello");
  });

  it("concatenates text across multiple lines", () => {
    const chunk = [
      `data: ${JSON.stringify({ choices: [{ delta: { content: "foo" } }] })}`,
      `data: ${JSON.stringify({ choices: [{ delta: { content: " bar" } }] })}`,
    ].join("\n");
    expect(parseSSEChunk(chunk)).toBe("foo bar");
  });

  it("ignores [DONE] sentinel", () => {
    const chunk = "data: [DONE]";
    expect(parseSSEChunk(chunk)).toBe("");
  });

  it("ignores malformed JSON lines", () => {
    const chunk = "data: not-json";
    expect(parseSSEChunk(chunk)).toBe("");
  });

  it("ignores lines without data: prefix", () => {
    const chunk = `event: message\ndata: ${JSON.stringify({
      choices: [{ delta: { content: "hi" } }],
    })}`;
    expect(parseSSEChunk(chunk)).toBe("hi");
  });

  it("returns empty string for empty delta", () => {
    const chunk = `data: ${JSON.stringify({ choices: [{ delta: {} }] })}`;
    expect(parseSSEChunk(chunk)).toBe("");
  });

  it("returns empty string when choices array is empty", () => {
    const chunk = `data: ${JSON.stringify({ choices: [] })}`;
    expect(parseSSEChunk(chunk)).toBe("");
  });

  it("handles null delta content gracefully", () => {
    const chunk = `data: ${JSON.stringify({ choices: [{ delta: { content: null } }] })}`;
    expect(parseSSEChunk(chunk)).toBe("");
  });

  it("mixes valid and invalid lines, only extracting valid ones", () => {
    const chunk = [
      "data: bad",
      `data: ${JSON.stringify({ choices: [{ delta: { content: "ok" } }] })}`,
      "data: [DONE]",
    ].join("\n");
    expect(parseSSEChunk(chunk)).toBe("ok");
  });
});

describe("streamChatCompletion", () => {
  const savedKey = process.env.OPENROUTER_API_KEY;

  afterEach(() => {
    process.env.OPENROUTER_API_KEY = savedKey;
    vi.unstubAllGlobals();
  });

  it("throws when OPENROUTER_API_KEY is not set", async () => {
    delete process.env.OPENROUTER_API_KEY;
    await expect(streamChatCompletion([])).rejects.toThrow(
      "OPENROUTER_API_KEY is not set"
    );
  });

  it("calls the OpenRouter endpoint with correct method and headers", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    const mockStream = new ReadableStream();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: mockStream })
    );

    await streamChatCompletion([{ role: "user", content: "hi" }]);

    const [url, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe("https://openrouter.ai/api/v1/chat/completions");
    expect((init as RequestInit).method).toBe("POST");
    expect(
      ((init as RequestInit).headers as Record<string, string>)["Authorization"]
    ).toBe("Bearer test-key");
    expect(
      ((init as RequestInit).headers as Record<string, string>)["Content-Type"]
    ).toBe("application/json");
  });

  it("sends messages with stream: true in the body", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: new ReadableStream() })
    );

    const messages = [{ role: "user" as const, content: "hello" }];
    await streamChatCompletion(messages);

    const body = JSON.parse(
      ((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit)
        .body as string
    );
    expect(body.stream).toBe(true);
    expect(body.messages).toEqual(messages);
  });

  it("returns the response body stream on success", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    const mockStream = new ReadableStream();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: mockStream })
    );

    const result = await streamChatCompletion([]);
    expect(result).toBe(mockStream);
  });

  it("throws on non-200 response with status code in message", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      })
    );

    await expect(streamChatCompletion([])).rejects.toThrow("401");
  });

  it("throws when response body is null", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: null })
    );

    await expect(streamChatCompletion([])).rejects.toThrow(
      "No response body from OpenRouter"
    );
  });

  it("respects custom model option", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: new ReadableStream() })
    );

    await streamChatCompletion([], { model: "custom/model" });

    const body = JSON.parse(
      ((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit)
        .body as string
    );
    expect(body.model).toBe("custom/model");
  });

  it("respects custom temperature option", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: new ReadableStream() })
    );

    await streamChatCompletion([], { temperature: 0.2 });

    const body = JSON.parse(
      ((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit)
        .body as string
    );
    expect(body.temperature).toBe(0.2);
  });
});
