/**
 * Deploy dist/ to GitHub Pages.
 * - Cleans gh-pages temp cache (avoids stale branch errors after failed pushes)
 * - Sets git HTTP buffer (avoids RPC 400 on larger asset pushes)
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ghPagesBin = path.join(root, 'node_modules/gh-pages/bin/gh-pages.js');
const ghPagesCleanBin = path.join(root, 'node_modules/gh-pages/bin/gh-pages-clean.js');

const gitEnv = {
  ...process.env,
  GIT_CONFIG_COUNT: '2',
  GIT_CONFIG_KEY_0: 'http.postBuffer',
  GIT_CONFIG_VALUE_0: '524288000',
  GIT_CONFIG_KEY_1: 'http.version',
  GIT_CONFIG_VALUE_1: 'HTTP/1.1',
};

function run(nodeScript, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nodeScript, ...args], {
      cwd: root,
      env: gitEnv,
      stdio: 'inherit',
    });
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

await run(ghPagesCleanBin);
await run(ghPagesBin, ['-d', 'dist']);
console.log('Published to GitHub Pages');
