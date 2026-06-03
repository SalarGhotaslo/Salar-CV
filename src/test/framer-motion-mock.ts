import * as React from "react";

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "whileInView",
  "viewport",
  "variants",
  "layout",
  "layoutId",
  "custom",
  "onAnimationStart",
  "onAnimationComplete",
  "drag",
  "whileHover",
  "whileTap",
  "whileDrag",
]);

function omitMotionProps(
  props: Record<string, unknown>
): React.HTMLAttributes<HTMLElement> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROPS.has(key)) result[key] = value;
  }
  return result as React.HTMLAttributes<HTMLElement>;
}

type AnyProps = React.PropsWithChildren<Record<string, unknown>>;

const makeEl = (tag: string) =>
  React.forwardRef<HTMLElement, AnyProps>(({ children, ...props }, ref) =>
    React.createElement(
      tag,
      { ...omitMotionProps(props), ref },
      children
    )
  );

const TAGS = [
  "a",
  "button",
  "div",
  "form",
  "h1",
  "h2",
  "h3",
  "nav",
  "p",
  "section",
  "span",
];

export function buildFramerMotionMock() {
  return {
    motion: Object.fromEntries(TAGS.map((t) => [t, makeEl(t)])),
    AnimatePresence: ({ children }: React.PropsWithChildren) =>
      React.createElement(React.Fragment, null, children),
  };
}
