#!/usr/bin/env bash
# Vercel build — stub dist; falls back to vite build if dashboard forces the Vite preset.
set -euo pipefail
cd "$(dirname "$0")/.."

export PATH="$PWD/node_modules/.bin:$PATH"

if command -v vite >/dev/null 2>&1 && [ -f vite.config.ts ]; then
  echo "vercel-build: running vite build (stub config)"
  vite build
else
  echo "vercel-build: vite not on PATH, writing dist stub"
  node scripts/vercel-stub-dist.mjs
fi
