import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import AdminDashboard from "./AdminDashboard";
import { GameResult } from "./types";

// Never statically prerender — this page needs env vars and Firestore at runtime
export const dynamic = "force-dynamic";

async function getResults(): Promise<GameResult[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("results")
    .orderBy("completedAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      sessionId: data.sessionId ?? "",
      score: Number(data.score ?? 0),
      totalEmails: Number(data.totalEmails ?? 0),
      accuracyPct: Number(data.accuracyPct ?? 0),
      completedAt:
        data.completedAt instanceof Timestamp ? data.completedAt.toDate() : null,
      answers: Array.isArray(data.answers) ? data.answers : [],
    };
  });
}

export default async function AdminPage() {
  const results = await getResults();
  return <AdminDashboard results={results} />;
}
