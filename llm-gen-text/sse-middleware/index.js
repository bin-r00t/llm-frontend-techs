import * as dotenv from "dotenv";
import express from "express";
// import cors from "cors";

dotenv.config({
  path: [".env.local", ".env"],
});

const deepseekApiKey = process.env.VITE_DEEPSEEK_APIKEY;
const app = express();
const port = 3000;
const endpoint = "https://api.deepseek.com/v1/chat/completions";

// app.use(cors());
// sse endpoint
app.get("/sse", async (req, res) => {
  if (!req.query?.question) {
    res.write(
      JSON.stringify({
        message: "Error! No question query provided!",
      })
    );
    res.end();
    return;
  }
  // set headers
  res.setHeader("Content-Type", "text/event-stream"); // <==== key point
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // send initial headers

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekApiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: req.query.question || "hi" }],
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from OpenAI");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = "";

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;

      const chunk = buffer + decoder.decode(value, { stream: true }); // <=== key point
      buffer = "";

      const lines = chunk
        .split("\n")
        .filter((l) => l.trim() && l.startsWith("data: "));

      for (const line of lines) {
        const incoming = line.slice(6);
        if (incoming === "[DONE]") {
          done = true;
          break;
        }
        try {
          const data = JSON.parse(incoming);
          const delta = data.choices[0].delta.content;
          if (delta) res.write(`data: ${delta}\n\n`);
        } catch (ex) {
          buffer += `data: ${incoming}`;
        }
      }
    }

    res.write("event: end\n"); // send 'end' event
    res.write("data: [DONE]\n\n"); // inform client to close event stream
    res.end();
  } catch (err) {
    console.error("Error fetching from OpenAI:", err);
    res.write("data: Error fetching from OpenAI\n\n");
    res.end();
  }
});

app.listen(port, () => {
  console.log(
    `[*] Server running on http://localhost:${port}, APIKEY=${deepseekApiKey}`
  );
});
