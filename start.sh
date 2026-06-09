#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8080}"

find_php() {
  command -v php 2>/dev/null && return 0
  for p in /opt/homebrew/bin/php /usr/local/bin/php; do
    [[ -x "$p" ]] && echo "$p" && return 0
  done
  return 1
}

PHP_BIN="$(find_php || true)"

if [[ -n "$PHP_BIN" ]]; then
  echo "Starting Mailcraft Studio at http://localhost:${PORT}"
  echo "  Landing:      http://localhost:${PORT}/index.php"
  echo "  Brand wizard: http://localhost:${PORT}/brand-wizard/"
  echo "Press Ctrl+C to stop."
  exec "$PHP_BIN" -S "localhost:${PORT}" -t "$ROOT"
fi

if command -v docker >/dev/null 2>&1; then
  echo "PHP not found — starting via Docker instead..."
  cd "$ROOT"
  exec docker compose up
fi

cat <<'EOF'

PHP is not installed on this machine.

Option A — Install PHP with Homebrew (recommended on macOS)
  1. Install Homebrew if needed:
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  2. Install PHP:
     brew install php
  3. Run again:
     ./start.sh

Option B — Use Docker (if Docker Desktop is installed)
  docker compose up
  Then open http://localhost:8080

Option C — Brand wizard only (no PHP needed)
  open brand-wizard/index.html
  Or from this folder:
  npx --yes serve . -p 8080
  Then open http://localhost:8080/brand-wizard/

EOF
exit 1
