import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Lazy init — only runs when adminDb is first accessed, not at import time.
// This prevents Vercel from crashing during static prerendering when env vars
// are not available.
function getAdminDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // FIREBASE_PRIVATE_KEY must be stored as a base64-encoded string in Vercel
  // to avoid OpenSSL decoder errors from newline mangling.
  // Decode it here: Buffer.from(base64key, 'base64').toString('utf-8')
  const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? "";
  const privateKey = rawKey.startsWith("-----")
    ? rawKey.replace(/\\n/g, "\n")          // plain PEM (local .env.local)
    : Buffer.from(rawKey, "base64").toString("utf-8"); // base64 (Vercel)

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin environment variables.");
  }

  const app =
    getApps()[0] ??
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

  return getFirestore(app);
}

export { getAdminDb };
