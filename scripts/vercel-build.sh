#!/usr/bin/env bash
# Vercel hosts API routes only. The marketing frontend ships via GitHub Pages.
# Always write a tiny redirect stub — never require a global `vite` binary.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "vercel-build: writing dist stub (frontend is on GitHub Pages)"
node scripts/vercel-stub-dist.mjs
