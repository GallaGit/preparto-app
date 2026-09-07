#!/usr/bin/env node
/**
 * Capture App Store / Play review screenshots from the built preview.
 *
 * Locales: es, en, de. iPhone 6.7" / 6.5" / 5.5" + Android phone.
 * Captions never claim diagnosis. Demo data is local-only seed.
 *
 * Usage:
 *   npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   node scripts/capture-store-screenshots.mjs
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const BASE_URL = process.env.STORE_SHOT_BASE_URL ?? 'http://127.0.0.1:4173';
const ROOT = path.resolve(import.meta.dirname, '..');
const LOCALES = (process.env.STORE_SHOT_LOCALES ?? 'es,en,de')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const DEVICES = {
  'iphone-67': {
    width: 430,
    height: 932,
    deviceScaleFactor: 3,
    // 430×932 @3x = 1290×2796 (iPhone 6.7")
  },
  'iphone-65': {
    width: 428,
    height: 926,
    deviceScaleFactor: 3,
    // 428×926 @3x = 1284×2778 (iPhone 6.5")
  },
  'iphone-55': {
    width: 414,
    height: 736,
    deviceScaleFactor: 3,
    // 414×736 @3x = 1242×2208 (iPhone 5.5")
  },
  'android-phone': {
    width: 360,
    height: 640,
    deviceScaleFactor: 3,
    // 360×640 @3x = 1080×1920
  },
};

const PLAYWRIGHT_LOCALE = {
  es: { locale: 'es-ES', timezoneId: 'Europe/Madrid' },
  en: { locale: 'en-GB', timezoneId: 'Europe/London' },
  de: { locale: 'de-DE', timezoneId: 'Europe/Berlin' },
};

const BAG_LABELS = {
  es: ['Documentación', 'Cargador del móvil', 'Ropa cómoda', 'Neceser'],
  en: ['Documents', 'Phone charger', 'Comfortable clothes', 'Toiletry bag'],
  de: ['Unterlagen', 'Handy-Ladegerät', 'Bequeme Kleidung', 'Kulturbeutel'],
};

const SHOTS = [
  { id: '01-home', path: '/' },
  { id: '02-contracciones', path: '/contractions' },
  { id: '03-sintomas', path: '/symptoms' },
  { id: '04-historial', path: '/history', scrollTo: 'a[href*="/history/"]' },
  { id: '05-hospital-bag', path: '/hospital-bag' },
  {
    id: '06-privacidad',
    path: '/privacy',
    scrollTo: '#privacy-disclaimer-title',
  },
];

function minutesAgo(minutes) {
  return Date.now() - minutes * 60 * 1000;
}

function iso(ms) {
  return new Date(ms).toISOString();
}

function outDirFor(locale, deviceKey) {
  return path.join(ROOT, 'store/screenshots', locale, deviceKey);
}

async function seedDemoData(page, locale) {
  await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase('preparto');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      request.onblocked = () => resolve();
    });
  });

  const now = Date.now();
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

  const labels = BAG_LABELS[locale] ?? BAG_LABELS.es;
  const bag = [
    {
      id: 'shot-b1',
      label: labels[0],
      done: false,
      priority: true,
      createdAt: iso(now - 86_400_000),
      updatedAt: iso(now - 86_400_000),
      completedAt: null,
    },
    {
      id: 'shot-b2',
      label: labels[1],
      done: false,
      priority: false,
      createdAt: iso(now - 86_000_000),
      updatedAt: iso(now - 86_000_000),
      completedAt: null,
    },
    {
      id: 'shot-b3',
      label: labels[2],
      done: false,
      priority: false,
      createdAt: iso(now - 85_000_000),
      updatedAt: iso(now - 85_000_000),
      completedAt: null,
    },
    {
      id: 'shot-b4',
      label: labels[3],
      done: true,
      priority: false,
      createdAt: iso(now - 84_000_000),
      updatedAt: iso(now - 3_600_000),
      completedAt: iso(now - 3_600_000),
    },
  ];

  await page.evaluate(
    async ({
      contractions: nextContractions,
      bag: nextBag,
      locale: nextLocale,
    }) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open('preparto', 4);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains('contractions')) {
            const store = db.createObjectStore('contractions', {
              keyPath: 'id',
            });
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
            const store = db.createObjectStore('hospitalBag', {
              keyPath: 'id',
            });
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
          tx.objectStore('preferences').put({
            id: 'app',
            locale: nextLocale,
            notificationsEnabled: false,
            recordingReminderHours: 12,
            notifyTimerActive: true,
            updatedAt: new Date().toISOString(),
          });
          const bagStore = tx.objectStore('hospitalBag');
          for (const row of nextBag) {
            bagStore.put(row);
          }
          try {
            localStorage.setItem('preparto:v1:locale', nextLocale);
          } catch {
            // ignore
          }
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    { contractions, bag, locale },
  );
}

async function preparePage(page, locale) {
  await page.addStyleTag({
    content: `
      html, body { scrollbar-width: none; }
      *::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none; }
    `,
  });
  await page.evaluate(async (nextLocale) => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    document.documentElement.lang = nextLocale;
    for (const el of document.querySelectorAll('button, [role="status"]')) {
      if (
        /nueva versión|new version|neue version|Actualizar|Update|Aktualisieren/i.test(
          el.textContent ?? '',
        )
      ) {
        const banner = el.closest('div');
        if (banner) banner.style.display = 'none';
      }
    }
  }, locale);
}

async function captureCombo(browser, locale, deviceKey, device) {
  const destDir = outDirFor(locale, deviceKey);
  await mkdir(destDir, { recursive: true });
  const intl = PLAYWRIGHT_LOCALE[locale] ?? PLAYWRIGHT_LOCALE.es;
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.deviceScaleFactor,
    locale: intl.locale,
    timezoneId: intl.timezoneId,
    hasTouch: true,
    isMobile: true,
    colorScheme: 'light',
  });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await seedDemoData(page, locale);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const manifest = [];
  for (const shot of SHOTS) {
    await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'networkidle' });
    await page.getByRole('heading').first().waitFor({ state: 'visible' });
    await preparePage(page, locale);
    if (shot.scrollTo) {
      const target = page.locator(shot.scrollTo).first();
      if ((await target.count()) > 0) {
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
      }
    }
    await page.waitForTimeout(250);
    const filename = `${shot.id}-${deviceKey}.png`;
    const dest = path.join(destDir, filename);
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
    console.log(
      `  ${locale}/${deviceKey}: ${filename} (${Math.round(box.w)}×${Math.round(box.h)})`,
    );
  }

  await context.close();
  return { destDir, manifest };
}

async function copyLegacyAliases(generatedAt) {
  const iosLegacy = path.join(ROOT, 'store/screenshots/ios');
  const androidLegacy = path.join(ROOT, 'store/screenshots/android');
  await mkdir(iosLegacy, { recursive: true });
  await mkdir(androidLegacy, { recursive: true });

  const iosSource = outDirFor('es', 'iphone-67');
  const androidSource = outDirFor('es', 'android-phone');
  const iosManifest = [];
  const androidManifest = [];

  for (const shot of SHOTS) {
    const iosName = `${shot.id}-iphone-67.png`;
    const androidName = `${shot.id}-android-phone.png`;
    await copyFile(
      path.join(iosSource, iosName),
      path.join(iosLegacy, iosName),
    );
    await copyFile(
      path.join(androidSource, androidName),
      path.join(androidLegacy, androidName),
    );
    iosManifest.push({ file: iosName, flow: shot.id, path: shot.path });
    androidManifest.push({ file: androidName, flow: shot.id, path: shot.path });
  }

  await writeFile(
    path.join(iosLegacy, 'manifest.json'),
    JSON.stringify(
      {
        generatedAt,
        device: 'ios',
        aliasOf: 'es/iphone-67',
        shots: iosManifest,
      },
      null,
      2,
    ) + '\n',
  );
  await writeFile(
    path.join(androidLegacy, 'manifest.json'),
    JSON.stringify(
      {
        generatedAt,
        device: 'android',
        aliasOf: 'es/android-phone',
        shots: androidManifest,
      },
      null,
      2,
    ) + '\n',
  );
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
    for (const locale of LOCALES) {
      all[locale] = {};
      for (const [deviceKey, device] of Object.entries(DEVICES)) {
        const { destDir, manifest } = await captureCombo(
          browser,
          locale,
          deviceKey,
          device,
        );
        all[locale][deviceKey] = manifest;
        await writeFile(
          path.join(destDir, 'manifest.json'),
          JSON.stringify(
            {
              generatedAt: new Date().toISOString(),
              locale,
              device: deviceKey,
              shots: manifest,
            },
            null,
            2,
          ) + '\n',
        );
      }
    }
  } finally {
    await browser.close();
  }

  const generatedAt = new Date().toISOString();
  if (LOCALES.includes('es')) {
    await copyLegacyAliases(generatedAt);
  }

  await writeFile(
    path.join(ROOT, 'store/screenshots/manifest.json'),
    JSON.stringify(
      {
        generatedAt,
        locales: LOCALES,
        devices: Object.keys(DEVICES),
        shots: all,
      },
      null,
      2,
    ) + '\n',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
