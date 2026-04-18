"use client";

import Image from "next/image";
import { useState } from "react";
import { GameResult } from "./types";
import emailData from "@/data/emails.json";

const PAGE_SIZE = 50;

const ALL_EMAILS = emailData.emails;

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(date?: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function pct(n: number, d: number) {
  if (d === 0) return "—";
  return `${Math.round((n / d) * 100)}%`;
}

function formatDuration(ms: number) {
  if (ms <= 0) return "—";
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// ─── stats computation ───────────────────────────────────────────────────────

function computeStats(results: GameResult[]) {
  const totalPlays = results.length;
  const uniqueSessions = new Set(results.map((r) => r.sessionId).filter(Boolean)).size;
  const avgScore = totalPlays === 0 ? 0 : results.reduce((s, r) => s + r.score, 0) / totalPlays;
  const avgAccuracy = totalPlays === 0 ? 0 : results.reduce((s, r) => s + (r.accuracyPct ?? 0), 0) / totalPlays;

  // score distribution bucketed by score value
  const scoreDistMap = new Map<number, number>();
  for (const r of results) scoreDistMap.set(r.score, (scoreDistMap.get(r.score) ?? 0) + 1);
  const scoreDistribution = Array.from(scoreDistMap.entries()).sort((a, b) => a[0] - b[0]);

  // per-email stats
  const emailStatsMap = new Map<string, { emailId: string; subject: string; senderName: string; truth: string; total: number; missed: number }>();
  let phishingMarkedSafe = 0;
  let safeMarkedPhishing = 0;
  let totalAnswerTime = 0;
  let totalAnswers = 0;

  for (const result of results) {
    for (const answer of result.answers ?? []) {
      totalAnswerTime += Number(answer.timeMs ?? 0);
      totalAnswers++;
      if (answer.truth === "phish" && answer.decision === "safe") phishingMarkedSafe++;
      if (answer.truth === "safe" && answer.decision === "phish") safeMarkedPhishing++;

      const cur = emailStatsMap.get(answer.emailId) ?? {
        emailId: answer.emailId,
        subject: answer.subject ?? "(No subject)",
        senderName: answer.senderName ?? "(Unknown)",
        truth: answer.truth,
        total: 0,
        missed: 0,
      };
      cur.total++;
      if (!answer.correct) cur.missed++;
      emailStatsMap.set(answer.emailId, cur);
    }
  }

  const mostMissed = Array.from(emailStatsMap.values())
    .map((e) => ({ ...e, failureRate: e.total ? e.missed / e.total : 0 }))
    .sort((a, b) => b.failureRate - a.failureRate || b.missed - a.missed);

  const avgTimeSec = totalAnswers ? totalAnswerTime / totalAnswers / 1000 : 0;

  return {
    totalPlays,
    uniqueSessions,
    avgScore,
    avgAccuracy,
    avgTimeSec,
    phishingMarkedSafe,
    safeMarkedPhishing,
    totalAnswers,
    scoreDistribution,
    mostMissed,
  };
}

// ─── main component ──────────────────────────────────────────────────────────

export default function AdminDashboard({ results }: { results: GameResult[] }) {
  const stats = computeStats(results);
  const sortedResults = [...results].sort(
    (a, b) => (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0)
  );
  const maxBarCount = Math.max(...stats.scoreDistribution.map(([, c]) => c), 1);

  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(sortedResults.length / PAGE_SIZE));
  const pageResults = sortedResults.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* Header */}
      <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6 shadow-sm">
        <Image src="/usc-logo.png" alt="USC Logo" width={32} height={32} />
        <span className="text-xl font-normal text-gray-700">
          Phish<span className="font-semibold text-[#4f2584]">Quest</span>
        </span>
        <span className="ml-2 rounded-full bg-[#f3eeff] px-2.5 py-0.5 text-xs font-semibold text-[#4f2584]">
          Admin
        </span>
        <div className="ml-auto">
          <form action="/admin/logout" method="post">
            <button className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50">
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            {stats.totalPlays} total plays across {stats.uniqueSessions} unique sessions
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard label="Total plays" value={String(stats.totalPlays)} color="purple" />
          <StatCard label="Unique sessions" value={String(stats.uniqueSessions)} color="blue" />
          <StatCard label="Avg score" value={`${stats.avgScore.toFixed(1)} / ${ALL_EMAILS.length}`} color="green" />
          <StatCard label="Avg accuracy" value={`${Math.round(stats.avgAccuracy)}%`} color="green" />
          <StatCard label="Avg time / email" value={`${stats.avgTimeSec.toFixed(1)}s`} color="orange" />
          <StatCard label="Phish missed" value={String(stats.phishingMarkedSafe)} color="red" />
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Score distribution */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Score distribution</h2>
            {stats.scoreDistribution.length === 0 ? (
              <p className="text-sm text-gray-400">No data yet.</p>
            ) : (
              <div className="space-y-2.5">
                {stats.scoreDistribution.map(([score, count]) => (
                  <div key={score} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-right text-xs text-gray-500">
                      {score} / {ALL_EMAILS.length}
                    </span>
                    <div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-3">
                      <div
                        className="h-3 rounded-full bg-[#4f2584] transition-all"
                        style={{ width: `${(count / maxBarCount) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 shrink-0 text-xs font-medium text-gray-700">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confusion breakdown */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Mistake breakdown</h2>
            <div className="space-y-5">
              <BreakdownBar
                label="Phishing emails marked as safe"
                sublabel="Most dangerous — user fell for the attack"
                count={stats.phishingMarkedSafe}
                total={stats.totalAnswers}
                color="red"
              />
              <BreakdownBar
                label="Safe emails marked as phishing"
                sublabel="Less severe — overly cautious"
                count={stats.safeMarkedPhishing}
                total={stats.totalAnswers}
                color="orange"
              />
              <div className="rounded-lg bg-gray-50 px-4 py-3 text-xs text-gray-500">
                Total answers evaluated: <span className="font-semibold text-gray-700">{stats.totalAnswers}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Most missed emails */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">Most missed emails</h2>
            <p className="text-xs text-gray-500 mt-0.5">Ranked by failure rate across all plays</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-3">Email subject</th>
                  <th className="px-6 py-3">Sender</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3 text-right">Missed</th>
                  <th className="px-6 py-3 text-right">Seen</th>
                  <th className="px-6 py-3">Failure rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.mostMissed.map((item) => (
                  <tr key={item.emailId} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900 max-w-xs truncate">{item.subject}</td>
                    <td className="px-6 py-3 text-gray-600">{item.senderName}</td>
                    <td className="px-6 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${item.truth === "phish" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {item.truth === "phish" ? "Phishing" : "Safe"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900">{item.missed}</td>
                    <td className="px-6 py-3 text-right text-gray-500">{item.total}</td>
                    <td className="px-6 py-3 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-2">
                          <div
                            className={`h-2 rounded-full ${item.failureRate > 0.5 ? "bg-red-500" : item.failureRate > 0.25 ? "bg-yellow-500" : "bg-green-500"}`}
                            style={{ width: `${item.failureRate * 100}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-xs text-gray-600">
                          {pct(item.missed, item.total)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {stats.mostMissed.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">No data yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full results table — one column per email */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">All results</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {sortedResults.length} submissions — ✓ correct &nbsp;✗ incorrect &nbsp;— not answered
              </p>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-500">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 min-w-[140px]">Name</th>
                  <th className="px-4 py-3 text-right">Score</th>
                  <th className="px-4 py-3 text-right">Accuracy</th>
                  <th className="px-4 py-3 text-right">Time</th>
                  {ALL_EMAILS.map((e, i) => (
                    <th key={e.id} className="px-3 py-3 text-center min-w-[80px]" title={e.subject}>
                      <div className="flex flex-col items-center gap-1">
                        <span>Q{i + 1}</span>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-normal normal-case tracking-normal ${e.truth === "phish" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                          {e.truth === "phish" ? "phish" : "safe"}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 min-w-[160px]">Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageResults.map((r) => {
                  const answerMap = new Map(r.answers.map((a) => [a.emailId, a]));
                  return (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="sticky left-0 z-10 bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-50">
                        {r.name || "—"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {r.score}/{r.totalEmails}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${(r.accuracyPct ?? 0) >= 80 ? "text-green-600" : (r.accuracyPct ?? 0) >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                          {r.accuracyPct != null ? `${r.accuracyPct}%` : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">
                        {formatDuration(r.answers.reduce((sum, a) => sum + (a.timeMs ?? 0), 0))}
                      </td>
                      {ALL_EMAILS.map((e) => {
                        const a = answerMap.get(e.id);
                        return (
                          <td key={e.id} className="px-3 py-3 text-center" title={a ? `Answered: ${a.decision}` : "Not answered"}>
                            {!a ? (
                              <span className="text-gray-300">—</span>
                            ) : a.correct ? (
                              <span className="text-green-600 font-bold">✓</span>
                            ) : (
                              <span className="text-red-500 font-bold">✗</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-6 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(r.completedAt)}
                      </td>
                    </tr>
                  );
                })}
                {sortedResults.length === 0 && (
                  <tr><td colSpan={ALL_EMAILS.length + 5} className="px-6 py-8 text-center text-sm text-gray-400">No results yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3">
              <span className="text-xs text-gray-500">
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sortedResults.length)} of {sortedResults.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── sub-components ──────────────────────────────────────────────────────────

type CardColor = "purple" | "blue" | "green" | "orange" | "red";

const colorMap: Record<CardColor, { bg: string; text: string; dot: string }> = {
  purple: { bg: "bg-[#f3eeff]", text: "text-[#4f2584]", dot: "bg-[#4f2584]" },
  blue:   { bg: "bg-[#e8f0fe]", text: "text-[#1a73e8]", dot: "bg-[#1a73e8]" },
  green:  { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  red:    { bg: "bg-red-50",    text: "text-red-700",    dot: "bg-red-500" },
};

function StatCard({ label, value, color }: { label: string; value: string; color: CardColor }) {
  const c = colorMap[color];
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full ${c.bg}`}>
        <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
      </div>
      <div className={`text-2xl font-bold ${c.text}`}>{value}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}

function BreakdownBar({
  label, sublabel, count, total, color,
}: {
  label: string; sublabel: string; count: number; total: number; color: "red" | "orange";
}) {
  const ratio = total ? count / total : 0;
  const barColor = color === "red" ? "bg-red-500" : "bg-orange-400";
  return (
    <div>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400">{sublabel}</p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-gray-900">{count}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-2.5 rounded-full transition-all ${barColor}`} style={{ width: `${ratio * 100}%` }} />
      </div>
      <p className="mt-1 text-right text-xs text-gray-400">{pct(count, total)} of all answers</p>
    </div>
  );
}
