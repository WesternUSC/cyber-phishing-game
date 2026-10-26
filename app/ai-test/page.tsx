
"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get an answer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 sm:p-10">
      <h1 className="text-3xl font-bold">
        Ask USC
      </h1>

      <p className="mt-2 text-gray-600">
        Ask questions about the USC.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label htmlFor="question" className="block font-medium">
          Your question
        </label>

        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What is the cancellation policy?"
          rows={4}
          required
          maxLength={2000}
          className="w-full rounded-lg border border-gray-300 p-3
            outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="rounded-lg bg-blue-600 px-5 py-3
            font-medium text-white hover:bg-blue-700
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Finding your answer..." : "Ask"}
        </button>
      </form>

      {loading && (
        <p role="status" className="mt-6 text-gray-500">
          Reading the document and preparing an answer...
        </p>
      )}

      {error && (
        <div role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {answer && (
        <section className="mt-8 rounded-xl border p-5">
          <h2 className="text-xl font-semibold">
            Answer
          </h2>
          <p className="mt-3 whitespace-pre-wrap leading-7">
            {answer}
          </p>
        </section>
      )}
    </main>
  );
}
