// Password-protected quotation generator.
// GET  /quote            -> login page, or the quotation form when the cookie is valid
// POST /quote            -> password check (sets a signed cookie) or logout
// The password is read from the QUOTE_PASSWORD env var. If it is unset, access is denied.
const crypto = require("crypto");
const { PAGE_HTML } = require("./_quote-page");

const COOKIE = "quote_session";
const SESSION_SECONDS = 12 * 60 * 60;

const sign = (value) =>
  crypto.createHmac("sha256", process.env.QUOTE_PASSWORD).update(value).digest("hex");

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function hasValidSession(req) {
  const match = (req.headers.cookie || "").match(new RegExp("(?:^|; )" + COOKIE + "=([^;]+)"));
  if (!match) return false;
  const [expires, signature] = match[1].split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(signature, sign(expires));
}

function loginPage(error) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Quotation Login · Shriram Enterprise</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f5fa;font-family:"IBM Plex Sans",system-ui,sans-serif;color:#0e1b3d}
  form{width:min(360px,calc(100vw - 32px));background:#fff;border:1px solid #cfd6e6;padding:28px}
  h1{margin:0 0 4px;font-size:1.25rem;letter-spacing:.02em}
  p{margin:0 0 20px;color:#55618a;font-size:.9rem}
  label{display:block;font-size:.8rem;font-weight:600;margin-bottom:6px}
  input{width:100%;padding:10px 12px;border:1px solid #9aa6c4;font:inherit;margin-bottom:16px}
  input:focus{outline:2px solid #3b5bdb;outline-offset:1px}
  button{width:100%;padding:11px;border:0;background:#0e1b3d;color:#fff;font:inherit;font-weight:600;cursor:pointer}
  button:hover{background:#1c2f66}
  .err{color:#b3261e;font-size:.85rem;margin:-6px 0 14px}
</style></head><body>
<form method="post" action="/quote">
  <div style="text-align:center;margin-bottom:14px">
    <img src="/assets/images/shriram-emblem.png" alt="Shriram Enterprise" style="width:68px;height:auto;display:inline-block">
  </div>
  <h1 style="text-align:center">SHRIRAM ENTERPRISE</h1>
  <p>Enter the password to create a quotation.</p>
  <label for="pw">Password</label>
  <input id="pw" name="password" type="password" autocomplete="current-password" autofocus required>
  ${error ? `<div class="err" role="alert">${error}</div>` : ""}
  <button type="submit">Sign in</button>
</form></body></html>`;
}

function readForm(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return Object.fromEntries(new URLSearchParams(req.body));
  return {};
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (!process.env.QUOTE_PASSWORD) {
    res.statusCode = 503;
    return res.end("Quotation page is not configured.");
  }

  const cookieBase = `${COOKIE}=%VALUE%; Path=/quote; HttpOnly; Secure; SameSite=Strict`;

  if (req.method === "POST") {
    const form = readForm(req);

    if (form.action === "logout") {
      res.setHeader("Set-Cookie", cookieBase.replace("%VALUE%", "") + "; Max-Age=0");
      res.statusCode = 303;
      res.setHeader("Location", "/quote");
      return res.end();
    }

    if (form.password && safeEqual(form.password, process.env.QUOTE_PASSWORD)) {
      const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
      res.setHeader(
        "Set-Cookie",
        cookieBase.replace("%VALUE%", `${expires}.${sign(expires)}`) + `; Max-Age=${SESSION_SECONDS}`
      );
      res.statusCode = 303;
      res.setHeader("Location", "/quote");
      return res.end();
    }

    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    res.statusCode = 401;
    return res.end(loginPage("Wrong password. Try again."));
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    return res.end();
  }

  if (hasValidSession(req)) return res.end(PAGE_HTML);
  return res.end(loginPage(""));
};
