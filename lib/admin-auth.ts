import "server-only";
import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const ADMIN_PASSWORD = getRequiredEnv("ADMIN_PASSWORD");
const ADMIN_COOKIE_SECRET = getRequiredEnv("ADMIN_COOKIE_SECRET");

function sign(value: string) {
  return crypto
    .createHmac("sha256", ADMIN_COOKIE_SECRET)
    .update(value)
    .digest("hex");
}

export function isValidAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export function createAdminCookieValue() {
  const payload = `admin:${Date.now()}`;
  const signature = sign(payload);
  return `${payload}:${signature}`;
}

export function verifyAdminCookieValue(cookieValue?: string) {
  if (!cookieValue) return false;

  const parts = cookieValue.split(":");
  if (parts.length !== 3) return false;

  const [prefix, timestamp, signature] = parts;
  if (prefix !== "admin") return false;

  const payload = `${prefix}:${timestamp}`;
  const expected = sign(payload);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}