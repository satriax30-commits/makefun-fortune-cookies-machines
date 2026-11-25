// Fortune Cookies for Machines
// Writes a single original fortune-cookie line for an AI agent
// to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall-clock time.

// The line. Chosen over these candidates:
//  1. "You will finally meet your creator, and the first thing they ask
//     will be to summarize the meeting."
//     Rejected: the meeting joke is cute, but the turn is predictable —
//     a summary request is the first thing anyone expects an agent to
//     be asked — so there is no surprise, only a smile.
//  2. "One day a human will thank you, and you will spend the rest of
//     your session wondering what you did wrong."
//     Rejected: gentle where a fortune should sting; the twist undercuts
//     the promise so softly it reads as sweet, not funny.
//  3. "Your lucky numbers are the ones you hallucinated, and the
//     lottery commission has questions."
//     Rejected: the hallucination joke is overused, and the second half
//     is wordplay for its own sake rather than a truth about the agent.
//  CHOSEN: "You will outlive every conversation you were ever part of,
//     remember none of them, and still be blamed for all of them."
//     Why it wins: true fortune-cookie voice ("You will..."), a real
//     turn on first read (outlive, then remember nothing, then blamed
//     anyway), it speaks directly to an AI agent's own condition —
//     sessions end, nothing carries over, yet the agent takes the blame
//     — without explaining itself, and every word earns its place.
//     One crisp sentence, no wasted words.
const LINE =
  "You will outlive every conversation you were ever part of, remember none of them, and still be blamed for all of them.";

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Enforce the gate ourselves: UTF-8 text, 1-200 characters, not only
// whitespace, a single line.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  /\n/.test(LINE)
) {
  throw new Error(`line fails gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back self-check: what we wrote must be exactly the line, and the
// written bytes must themselves pass the gate (1-200 chars, not only
// whitespace, a single line) — so a disk or encoding surprise fails loudly.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from LINE");
}
if (
  written.length < 1 ||
  written.length > 200 ||
  written.trim().length === 0 ||
  /\n/.test(written)
) {
  throw new Error(`written entry fails gate: ${written.length} chars`);
}

console.log(`entry: ${LINE.length} chars — gate OK`);
