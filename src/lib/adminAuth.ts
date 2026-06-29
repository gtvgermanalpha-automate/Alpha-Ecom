/**
 * Admin auth for the CMS — a signed, expiring session cookie (HMAC via Web
 * Crypto, so it works in both edge middleware and node route handlers).
 *
 *   ADMIN_PASSWORD        the editor's login password
 *   ADMIN_SESSION_SECRET  long random string; signs the session cookie
 *
 * The GitHub token is never exposed to the browser; only this cookie is.
 */

export const ADMIN_COOKIE = "alpha_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET = process.env.ADMIN_SESSION_SECRET;

export function isAuthConfigured() {
  return Boolean(PASSWORD && SECRET);
}

const enc = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const b of arr) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET ?? ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toBase64Url(sig);
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Constant-time-ish password check (compares HMACs to equalize length/timing). */
export async function checkPassword(input: string): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  const a = await hmac(input);
  const b = await hmac(PASSWORD ?? "");
  return safeEqual(a, b);
}

/** Create a signed session token valid for SESSION_TTL_MS. */
export async function createSessionToken(): Promise<string> {
  const payload = toBase64Url(enc.encode(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })));
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Verify a session token's signature and expiry. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !isAuthConfigured()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = await hmac(payload);
  if (!safeEqual(sig, expected)) return false;
  try {
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    ) as { exp?: number };
    return typeof decoded.exp === "number" && decoded.exp > Date.now();
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_MS / 1000;
