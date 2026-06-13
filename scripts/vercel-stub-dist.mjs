import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const siteUrl = 'https://gerardosgv8.github.io/emailbundles2/';

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(
  path.join(distDir, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0;url=${siteUrl}" />
  <title>Mailcraft Studio</title>
</head>
<body>
  <p>Redirecting to <a href="${siteUrl}">Mailcraft Studio</a>…</p>
</body>
</html>
`,
);

console.log('Vercel: created dist/index.html stub (frontend is built on GitHub Pages).');
