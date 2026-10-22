
"use client";

import { FormEvent, useEffect, useState } from "react";

interface AskUSCModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionText: string;
}

export default function AskUSCModal({
  isOpen,
  onClose,
  questionText
}: AskUSCModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setQuestion(questionText);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center
        bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-usc-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
          rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Ask USC"
          className="absolute right-4 top-4 flex h-9 w-9 items-center
            justify-center rounded-full text-2xl text-gray-500
            hover:bg-gray-100 hover:text-gray-900"
        >
          &times;
        </button>

        <h1
          id="ask-usc-title"
          className="pr-10 text-3xl font-bold text-gray-900"
        >
          Ask USC
        </h1>

        <p className="mt-2 text-gray-600">
          Ask questions about the USC.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label
            htmlFor="ask-usc-question"
            className="block font-medium text-gray-900"
          >
            Your question
          </label>

          <textarea
            id="ask-usc-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What is the cancellation policy?"
            rows={4}
            required
            maxLength={2000}
            className="w-full rounded-lg border border-gray-300 p-3
              text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="rounded-lg bg-[#4F2683] px-5 py-3 font-medium
              text-white hover:bg-[#3D1D66]
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Finding your answer..." : "Ask Gemini"}
          </button>
        </form>

        {loading && (
          <p role="status" className="mt-6 text-gray-500">
            Reading the document and preparing an answer...
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        {answer && (
          <section className="mt-8 rounded-xl border border-gray-200 p-5">
            <h2 className="text-xl font-semibold text-gray-900">
              Answer
            </h2>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-800">
              {answer}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
