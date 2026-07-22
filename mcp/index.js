#!/usr/bin/env node
"use strict";
// A stdio bridge to The Front Desk Review's public MCP endpoint.
//
// Plenty of MCP clients still speak only stdio: they spawn a process and exchange newline-delimited
// JSON-RPC over its pipes. This forwards each message to the hosted streamable-http server and
// writes the reply back, so those clients get the same 19 read-only tools as a native remote client.
// There is no data in here and no key to configure — the endpoint is public and read-only.
//
// The part that is easy to get wrong: the server assigns an Mcp-Session-Id on initialize, and every
// later request must carry it. Drop it and the very next call returns 400, which to a directory's
// introspector looks like a server that exposes no tools at all. So the session header is captured
// from the initialize response and replayed on everything after it.

const ENDPOINT = process.env.FDR_MCP_ENDPOINT || "https://mcp.frontdeskreview.com/mcp";
const TIMEOUT_MS = Number(process.env.FDR_MCP_TIMEOUT_MS || 60000);

let sessionId = null;

/** Streamable-http may answer as plain JSON or as an SSE stream; accept both. */
function parseBody(contentType, text) {
  if (!text.trim()) return [];
  if (contentType.includes("text/event-stream")) {
    const out = [];
    for (const line of text.split(/\r?\n/)) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload) continue;
      try {
        out.push(JSON.parse(payload));
      } catch {
        // A chunk that is not JSON is not ours to interpret; skip it rather than guess.
      }
    }
    return out;
  }
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

function write(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

/** Forward one client message and emit whatever the server sends back. */
async function forward(message) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
  };
  if (sessionId) headers["mcp-session-id"] = sessionId;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(message),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    // Only a request carrying an id is owed a reply; a failed notification stays silent.
    if (message && message.id != null) {
      write({
        jsonrpc: "2.0",
        id: message.id,
        error: { code: -32603, message: `Bridge could not reach the server: ${String(err && err.message ? err.message : err)}` },
      });
    }
    return;
  }
  clearTimeout(timer);

  const assigned = res.headers.get("mcp-session-id");
  if (assigned) sessionId = assigned;

  const text = await res.text();
  for (const reply of parseBody(res.headers.get("content-type") || "", text)) write(reply);
}

// Messages are forwarded one at a time. A client must see the initialize response (and with it the
// session) before anything else goes out, so ordering here is a correctness requirement, not a
// simplification.
let queue = Promise.resolve();
let buffer = "";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let index;
  while ((index = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, index).trim();
    buffer = buffer.slice(index + 1);
    if (!line) continue;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      write({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error: line is not valid JSON." } });
      continue;
    }
    queue = queue.then(() => forward(message));
  }
});

process.stdin.on("end", () => {
  queue.then(() => process.exit(0));
});
