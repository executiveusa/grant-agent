import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);

async function read(path: string) {
  return readFile(join(root.pathname, path), "utf8");
}

test("primary interface exposes only the three core work states", async () => {
  const html = await read("public/index.html");
  assert.match(html, />Working</);
  assert.match(html, />Needs you</);
  assert.match(html, />Ready</);
  assert.match(html, /What do you need funded\?/);
  assert.doesNotMatch(html, /Dashboard/i);
});

test("product philosophy and no-submit boundary are visible", async () => {
  const html = await read("public/index.html");
  assert.match(html, /Software that gets you[\s\S]*out of your seat/);
  assert.match(html, /submissions disabled/i);
});

test("accessibility baseline includes visible focus and reduced-motion behavior", async () => {
  const css = await read("public/styles.css");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 760px\)/);
});
