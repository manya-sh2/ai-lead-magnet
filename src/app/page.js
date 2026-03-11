"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function Home() {

  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const copyText = () => {

    const textarea = document.createElement("textarea");
    textarea.value = result;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);

    alert("Copied!");
  };

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text(result, 10, 10);

    doc.save("lead-magnet.pdf");

  };

  const generate = async () => {

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();

    setResult(data.result);

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-3xl font-bold">
        AI Lead Magnet Generator
      </h1>

      <input
        type="text"
        placeholder="Enter your topic"
        className="border p-2 rounded w-80"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={generate}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Generate
      </button>

      <div className="max-w-xl whitespace-pre-wrap text-left">

        {result && (
          <>
            <button
              onClick={copyText}
              className="mb-4 bg-gray-700 text-white px-3 py-1 rounded"
            >
              Copy
            </button>

            <button
              onClick={downloadPDF}
              className="mb-4 ml-3 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Download PDF
            </button>

            <div>
              {result}
            </div>
          </>
        )}

      </div>

    </div>
  );
}