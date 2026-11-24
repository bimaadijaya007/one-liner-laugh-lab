import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-Liner Laugh Lab: the excuse a robot vacuum gives after eating a sock.
const LINE =
  "Dear judge, I didn't eat the sock — I was taste-testing it for the washing machine, and it failed the audition: chewy, linty, no stage presence.";

// Self-check: exactly one line, 1-200 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line length ${LINE.length} is outside 1-200 characters`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is only whitespace");
}
if (/[\n\r]/.test(LINE)) {
  throw new Error("line must be a single line");
}

// Prompt fit: the excuse must name the thing that was eaten.
if (!/\bsock\b/i.test(LINE)) {
  throw new Error("line does not answer the prompt: no sock mentioned");
}

// Tightness: short and punchy, at most 30 words.
const words = LINE.trim().split(/\s+/);
if (words.length > 30) {
  throw new Error(`line has ${words.length} words, over the 30-word cap`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars, ${words.length} words to ${outPath}`);
