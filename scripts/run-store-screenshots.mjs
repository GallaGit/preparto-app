#!/usr/bin/env node
/** Build is expected to have run. Start vite preview, capture shots, exit. */

import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;

function startPreview() {
  const child = spawn(
    'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT)],
    { stdio: ['ignore', 'pipe', 'pipe'], detached: true },
  );
  child.stdout.on('data', (chunk) => process.stdout.write(chunk));
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));
  return child;
}

function stopPreview(child) {
  if (!child.pid) return;
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch {
    child.kill('SIGTERM');
  }
}

async function waitForServer(timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(BASE);
      if (response.ok) return;
    } catch {
      /* still booting */
    }
    await delay(400);
  }
  throw new Error(`Preview did not start on ${BASE}`);
}

const preview = startPreview();
try {
  await waitForServer();
  const capture = spawn(process.execPath, ['scripts/capture-store-screenshots.mjs'], {
    stdio: 'inherit',
    env: { ...process.env, STORE_SHOT_BASE_URL: BASE },
  });
  const code = await new Promise((resolve) => {
    capture.on('exit', (exitCode) => resolve(exitCode ?? 1));
  });
  process.exitCode = code;
} finally {
  stopPreview(preview);
}
