#!/usr/bin/env node
/**
 * Capture App Store / Play review screenshots from the built preview.
 *
 * Usage:
 *   npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   node scripts/capture-store-screenshots.mjs
 *
 * Or: npm run store:screenshots  (starts preview if needed)
 *
 * Spanish UI. Demo data is local-only seed for review shots — not clinical advice.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const BASE_URL = process.env.STORE_SHOT_BASE_URL ?? 'http://127.0.0.1:4173';
const ROOT = path.resolve(import.meta.dirname, '..');

const DEVICES = {
  ios: {
    name: 'iphone-67',
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    outDir: path.join(ROOT, 'store/screenshots/ios'),
    // 430×932 @3x = 1290×2796 (iPhone 6.7")
  },
  android: {
    name: 'phone-1080x1920',
    width: 360,
    height: 640,
    deviceScaleFactor: 3,
    outDir: path.join(ROOT, 'store/screenshots/android'),
    // 360×640 @3x = 1080×1920
  },
};

const SHOTS = [
  { id: '01-home', path: '/', wait: 'heading' },
  { id: '02-contracciones', path: '/contractions', wait: 'heading' },
  { id: '03-sintomas', path: '/symptoms', wait: 'heading' },
  {
    id: '04-historial',
    path: '/history',
    wait: 'heading',
    scrollTo: 'a:has-text("Contracción")',
  },
  { id: '05-hospital-bag', path: '/hospital-bag', wait: 'heading' },
  {
    id: '06-privacidad',
    path: '/privacy',
    wait: 'heading',
    scrollTo: '#privacy-disclaimer-title',
  },
];

function minutesAgo(minutes) {
  return Date.now() - minutes * 60 * 1000;
}

function iso(ms) {
  return new Date(ms).toISOString();
}

async function seedDemoData(page) {
  await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase('preparto');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      request.onblocked = () => resolve();
    });
  });

  const now = Date.now();
  // Two spaced contractions (below analysis threshold) so Home stays
  // informational — no 5-1-1 / "observación reforzada" in store shots.
  const contractions = [
    {
      id: 'shot-c1',
      startedAt: iso(minutesAgo(28)),
      endedAt: iso(minutesAgo(28) + 52_000),
      durationSeconds: 52,
      notes: '',
    },
    {
      id: 'shot-c2',
      startedAt: iso(minutesAgo(12)),
      endedAt: iso(minutesAgo(12) + 48_000),
      durationSeconds: 48,
      intervalSeconds: 16 * 60,
      notes: '',
    },
  ];

  const symptoms = [];

  const bag = [
    {
      id: 'shot-b1',
      label: 'Documentación',
      done: false,
      priority: true,
      createdAt: iso(now - 86_400_000),
      updatedAt: iso(now - 86_400_000),
      completedAt: null,
    },
    {
      id: 'shot-b2',
      label: 'Cargador del móvil',
      done: false,
      priority: false,
      createdAt: iso(now - 86_000_000),
      updatedAt: iso(now - 86_000_000),
      completedAt: null,
    },
    {
      id: 'shot-b3',
      label: 'Ropa cómoda',
      done: false,
      priority: false,
      createdAt: iso(now - 85_000_000),
      updatedAt: iso(now - 85_000_000),
      completedAt: null,
    },
    {
      id: 'shot-b4',
      label: 'Neceser',
      done: true,
      priority: false,
      createdAt: iso(now - 84_000_000),
      updatedAt: iso(now - 3_600_000),
      completedAt: iso(now - 3_600_000),
    },
  ];

  await page.evaluate(
    async ({ contractions: nextContractions, symptoms: nextSymptoms, bag: nextBag }) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open('preparto', 4);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains('contractions')) {
            const store = db.createObjectStore('contractions', { keyPath: 'id' });
            store.createIndex('startedAt', 'startedAt', { unique: false });
          }
          if (!db.objectStoreNames.contains('symptoms')) {
            const store = db.createObjectStore('symptoms', { keyPath: 'id' });
            store.createIndex('type', 'type', { unique: false });
            store.createIndex('recordedAt', 'recordedAt', { unique: false });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('preferences')) {
            db.createObjectStore('preferences', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('hospitalBag')) {
            const store = db.createObjectStore('hospitalBag', { keyPath: 'id' });
            store.createIndex('done', 'done', { unique: false });
          }
        };
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(
            ['contractions', 'symptoms', 'preferences', 'hospitalBag'],
            'readwrite',
          );
          const contractionStore = tx.objectStore('contractions');
          for (const row of nextContractions) {
            contractionStore.put(row);
          }
          const symptomStore = tx.objectStore('symptoms');
          for (const row of nextSymptoms) {
            symptomStore.put(row);
          }
          tx.objectStore('preferences').put({
            id: 'app',
            locale: 'es',
            notificationsEnabled: false,
            recordingReminderHours: 12,
            notifyTimerActive: true,
            updatedAt: new Date().toISOString(),
          });
          const bagStore = tx.objectStore('hospitalBag');
          for (const row of nextBag) {
            bagStore.put(row);
          }
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    { contractions, symptoms, bag },
  );
}

async function preparePage(page) {
  await page.addStyleTag({
    content: `
      html, body { scrollbar-width: none; }
      *::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none; }
      [class*="UpdateBanner"], [class*="update"] { }
    `,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    document.documentElement.lang = 'es';
    for (const el of document.querySelectorAll('button, [role="status"]')) {
      if (/nueva versión|new version|Actualizar|Update/i.test(el.textContent ?? '')) {
        const banner = el.closest('div');
        if (banner) banner.style.display = 'none';
      }
    }
  });
}

async function captureDevice(browser, deviceKey, device) {
  await mkdir(device.outDir, { recursive: true });
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.deviceScaleFactor,
    locale: 'es-ES',
    timezoneId: 'Europe/Madrid',
    hasTouch: true,
    isMobile: true,
    colorScheme: 'light',
  });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await seedDemoData(page);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const manifest = [];
  for (const shot of SHOTS) {
    await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'networkidle' });
    await page.getByRole('heading').first().waitFor({ state: 'visible' });
    await preparePage(page);
    if (shot.scrollTo) {
      const target = page.locator(shot.scrollTo).first();
      if ((await target.count()) > 0) {
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
      }
    }
    await page.waitForTimeout(250);
    const filename = `${shot.id}-${device.name}.png`;
    const dest = path.join(device.outDir, filename);
    await page.screenshot({
      path: dest,
      type: 'png',
      animations: 'disabled',
      caret: 'hide',
    });
    const box = await page.evaluate(() => ({
      w: window.innerWidth * window.devicePixelRatio,
      h: window.innerHeight * window.devicePixelRatio,
    }));
    manifest.push({
      file: filename,
      flow: shot.id,
      path: shot.path,
      pixels: `${Math.round(box.w)}×${Math.round(box.h)}`,
    });
    console.log(`  ${deviceKey}: ${filename} (${Math.round(box.w)}×${Math.round(box.h)})`);
  }

  await context.close();
  return manifest;
}

async function main() {
  const health = await fetch(BASE_URL).catch(() => null);
  if (!health?.ok) {
    console.error(
      `Preview not reachable at ${BASE_URL}. Run \`npm run build && npm run preview -- --host 127.0.0.1 --port 4173\` first.`,
    );
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const all = {};
  try {
    for (const [key, device] of Object.entries(DEVICES)) {
      all[key] = await captureDevice(browser, key, device);
    }
  } finally {
    await browser.close();
  }

  const generatedAt = new Date().toISOString();
  for (const [key, device] of Object.entries(DEVICES)) {
    await writeFile(
      path.join(device.outDir, 'manifest.json'),
      JSON.stringify({ generatedAt, device: key, shots: all[key] }, null, 2) +
        '\n',
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
