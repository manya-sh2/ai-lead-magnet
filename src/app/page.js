"use client";

import { useState } from "react";

export default function Home() {

  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {

    if (!topic) return;

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();

    setResult(data.result);
    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center px-6 py-16">

      {/* HEADER */}

      <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
        AI Lead Magnet Generator
      </h1>

      <p className="text-gray-400 text-center max-w-xl mb-10">
        Instantly generate ebook ideas, chapter outlines and landing page copy
        using AI.
      </p>


      {/* INPUT */}

      <div className="flex gap-3 w-full max-w-xl mb-10">

        <input
          type="text"
          placeholder="Enter your topic (example: instagram growth)"
          className="flex-1 p-3 rounded-lg bg-white text-black placeholder-gray-500 outline-none"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          onClick={generate}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>


      {/* RESULT CARD */}

      {result && (

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-3xl w-full shadow-lg">

          <div className="flex gap-4 mb-6">

            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            >
              Copy
            </button>

            <button
              onClick={() => {

                const blob = new Blob([result], { type: "text/plain" });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "lead-magnet.txt";
                a.click();

              }}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
            >
              Download
            </button>

          </div>

          <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
            {result}
          </pre>

        </div>

      )}

      {/* FOOTER */}

      <p className="text-gray-500 mt-16 text-sm">
        Built with Next.js + AI
      </p>

    </div>

  );
}