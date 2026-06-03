// @vitest-environment node
import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns 200", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
  });

  it('returns { status: "ok" }', async () => {
    const res = await GET();
    const json = await res.json();
    expect(json).toEqual({ status: "ok" });
  });
});
