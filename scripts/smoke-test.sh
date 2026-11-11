#!/usr/bin/env bash
# Smoke test for the built site served by nginx (see docker/nginx.conf).
# Usage: scripts/smoke-test.sh [base-url]   (default http://127.0.0.1:3000)
# Exits non-zero on the first failed assertion.
set -euo pipefail

BASE="${1:-http://127.0.0.1:3000}"
BASE="${BASE%/}"

# Text of the 404 page (src/data/notFoundContent.ts); update it here if that copy changes.
NOT_FOUND_TEXT="aradığın şey yok"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}
pass() { echo "ok:   $*"; }

# Redirects are never followed: a 301/302 anywhere is a failure.
# request <path> sets STATUS, HEADERS (lower-cased header block) and BODY.
request() {
  local path="$1" tmp
  tmp="$(mktemp)"
  HEADERS="$(curl -sS --max-time 10 -D - -o "$tmp" "$BASE$path" | tr -d '\r')" ||
    fail "$path: request failed ($BASE$path)"
  BODY="$(tr -d '\0' <"$tmp")"
  rm -f "$tmp"
  STATUS="$(head -n1 <<<"$HEADERS" | awk '{print $2}')"
  HEADERS="$(tr 'A-Z' 'a-z' <<<"$HEADERS")"
}

header_value() { grep -i "^$1:" <<<"$HEADERS" | head -n1 | cut -d: -f2- | sed 's/^ *//' || true; }

expect_status() {
  [[ "$STATUS" == "$2" ]] || fail "$1: expected status $2, got ${STATUS:-none}"
}

expect_header() { # path name [substring]
  local value
  value="$(header_value "$2")"
  [[ -n "$value" ]] || fail "$1: missing response header $2"
  if [[ -n "${3:-}" && "$value" != *"$3"* ]]; then
    fail "$1: header $2 is '$value', expected it to contain '$3'"
  fi
}

# Wait for the server (the container may still be starting).
for i in $(seq 1 30); do
  if curl -fsS --max-time 2 "$BASE/healthz" >/dev/null 2>&1; then break; fi
  [[ "$i" -lt 30 ]] || fail "server did not answer on $BASE/healthz within 30s"
  sleep 1
done

request /
expect_status / 200
expect_header / content-type "text/html"
for h in x-content-type-options x-frame-options referrer-policy permissions-policy; do
  expect_header / "$h"
done
pass "/ -> 200 text/html with security headers"
HOME_HTML="$BODY"

for p in /about /portfolio /contact; do
  request "$p"
  expect_status "$p (no redirect expected)" 200
  expect_header "$p" content-type "text/html"
done
pass "/about, /portfolio, /contact -> 200 without redirect"

request /does-not-exist
expect_status /does-not-exist 404
[[ "$BODY" == *"<html"* ]] || fail "/does-not-exist: body is not the HTML 404 page"
[[ "$BODY" == *"$NOT_FOUND_TEXT"* ]] || fail "/does-not-exist: body lacks the 404 page text '$NOT_FOUND_TEXT'"
expect_header /does-not-exist x-frame-options deny
pass "/does-not-exist -> 404 with the 404 page"

request /healthz
expect_status /healthz 200
[[ "$BODY" == "ok" ]] || fail "/healthz: expected body 'ok', got '$BODY'"
expect_header /healthz x-content-type-options
pass "/healthz -> 200 ok"

ASSET="$(grep -oE '/_astro/[A-Za-z0-9._-]+\.(css|js|woff2|png|webp|jpg|svg)' <<<"$HOME_HTML" | head -n1 || true)"
[[ -n "$ASSET" ]] || fail "no /_astro/ asset referenced from the home page HTML"
request "$ASSET"
expect_status "$ASSET" 200
expect_header "$ASSET" cache-control immutable
pass "$ASSET -> 200 Cache-Control immutable"

for p in /robots.txt /sitemap.xml; do
  request "$p"
  expect_status "$p" 200
done
pass "/robots.txt and /sitemap.xml -> 200"

echo "All smoke tests passed against $BASE"
