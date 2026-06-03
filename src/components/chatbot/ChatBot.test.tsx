import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatBot from "./index";

vi.mock("framer-motion", async () => {
  const { buildFramerMotionMock } = await import("@/test/framer-motion-mock");
  return buildFramerMotionMock();
});

describe("ChatBot", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the toggle button", () => {
    render(<ChatBot />);
    expect(
      screen.getByRole("button", { name: /toggle chat/i })
    ).toBeInTheDocument();
  });

  it("chat panel is not visible initially", () => {
    render(<ChatBot />);
    expect(
      screen.queryByText(/ask me anything/i)
    ).not.toBeInTheDocument();
  });

  it("clicking the toggle button opens the chat panel", () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    expect(screen.getByText(/ask me anything/i)).toBeInTheDocument();
  });

  it("clicking the toggle button again closes the panel", () => {
    render(<ChatBot />);
    const toggle = screen.getByRole("button", { name: /toggle chat/i });
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(screen.queryByText(/ask me anything/i)).not.toBeInTheDocument();
  });

  it("dispatching open-chat event opens the panel", async () => {
    render(<ChatBot />);
    await act(async () => {
      window.dispatchEvent(new Event("open-chat"));
    });
    expect(screen.getByText(/ask me anything/i)).toBeInTheDocument();
  });

  it("shows all three starter questions when panel is open with no messages", () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    expect(
      screen.getByText("What technologies do you work with?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tell me about your experience")
    ).toBeInTheDocument();
    expect(screen.getByText("What projects have you built?")).toBeInTheDocument();
  });

  it("input starts empty", () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    expect(screen.getByPlaceholderText(/ask something/i)).toHaveValue("");
  });

  it("input is not disabled when not streaming", () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    expect(screen.getByPlaceholderText(/ask something/i)).not.toBeDisabled();
  });

  it("send button is disabled when input is empty", () => {
    const { container } = render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    expect(container.querySelector("button[type='submit']")).toBeDisabled();
  });

  it("send button is enabled when input has text", async () => {
    const { container } = render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    await userEvent.type(screen.getByPlaceholderText(/ask something/i), "Hello");
    expect(container.querySelector("button[type='submit']")).not.toBeDisabled();
  });

  it("sends a message and shows the user bubble", async () => {
    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ choices: [{ delta: { content: "Hi!" } }] })}\n`
          )
        );
        controller.close();
      },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: mockStream })
    );

    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    await userEvent.type(
      screen.getByPlaceholderText(/ask something/i),
      "Hello"
    );
    fireEvent.submit(screen.getByPlaceholderText(/ask something/i).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    await userEvent.type(
      screen.getByPlaceholderText(/ask something/i),
      "Hello"
    );
    fireEvent.submit(screen.getByPlaceholderText(/ask something/i).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/sorry, something went wrong/i)).toBeInTheDocument();
    });
  });

  it("clicking a starter question sends it as the first message", async () => {
    const mockStream = new ReadableStream({ start: (c) => c.close() });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, body: mockStream })
    );

    render(<ChatBot />);
    fireEvent.click(screen.getByRole("button", { name: /toggle chat/i }));
    fireEvent.click(screen.getByText("Tell me about your experience"));

    await waitFor(() => {
      expect(screen.getByText("Tell me about your experience")).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalled();
  });
});
