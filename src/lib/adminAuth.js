// Light client-side gate for internal pages (presentations, quote generator).
// NOTE: this only keeps casual visitors out - the password ships in the JS bundle.
// For real protection, put these routes behind host-level auth (e.g. Cloudflare Access).

export const ADMIN_PASSWORD = "gca@123";
const KEY = "gca-admin-unlocked";

export const isAdminUnlocked = () => {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
};

export const unlockAdmin = (password) => {
  if (password !== ADMIN_PASSWORD) return false;
  try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
  return true;
};
