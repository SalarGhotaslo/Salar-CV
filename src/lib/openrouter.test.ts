import { describe, it, expect } from "vitest";
import { parseSSEChunk } from "./openrouter";

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
});
