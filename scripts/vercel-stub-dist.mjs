import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const siteUrl = 'https://www.mailcraft.studio/';

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(
  path.join(distDir, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Mailcraft Studio API</title>
</head>
<body>
  <p>This host is the checkout API. The site lives at <a href="${siteUrl}">Mailcraft Studio</a>.</p>
  <script>
    (function () {
      var host = location.hostname;
      if (host === 'localhost' || host.endsWith('.vercel.app')) {
        location.replace(${JSON.stringify(siteUrl)});
      }
    })();
  </script>
</body>
</html>
`,
);

console.log('Vercel: created dist/index.html stub (frontend is built on GitHub Pages).');
