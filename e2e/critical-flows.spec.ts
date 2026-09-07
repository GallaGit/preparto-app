import { expect, test } from '@playwright/test';

test.describe('flujos críticos PreParto', () => {
  test('muestra recomendación orientativa en Home', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /PreParto/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('note', {
        name: /Guidance recommendation|Recomendación orientativa|Orientierende Empfehlung/i,
      }),
    ).toBeVisible();
  });

  test('la barra inferior con SOS está en todas las pantallas clave', async ({
    page,
  }) => {
    const bottomNav = page.getByRole('navigation', {
      name: 'Bottom navigation',
    });

    await page.goto('/');
    await expect(bottomNav.getByRole('link', { name: 'SOS' })).toBeVisible();

    await page.goto('/contractions');
    await expect(page.getByRole('link', { name: /Volver|Back/ })).toHaveCount(0);
    await expect(bottomNav.getByRole('link', { name: 'SOS' })).toBeVisible();
    await expect(
      page.getByText(
        /No 5-1-1 pattern yet|Aún no hay patrón 5-1-1|Noch kein 5-1-1-Muster/,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        /\+ Add note \(optional\)|\+ Añadir nota \(opcional\)|\+ Notiz hinzufügen \(optional\)/,
      ),
    ).toBeVisible();

    await page.goto('/symptoms/nausea');
    await expect(bottomNav.getByRole('link', { name: 'SOS' })).toBeVisible();
    await bottomNav.getByRole('link', { name: 'SOS' }).click();
    await expect(
      page.getByRole('heading', { name: /Emergency|Emergencia|Notfall/ }),
    ).toBeVisible();
  });

  test('registra un síntoma y aparece en el historial', async ({ page }) => {
    await page.goto('/symptoms/nausea');
    await page.locator('#intensity').selectOption('3');
    await page
      .getByRole('button', {
        name: /Guardar registro|Save entry|Eintrag speichern/,
      })
      .click();
    await expect(
      page.getByText(
        /Registro guardado|Entry saved|Eintrag wurde gespeichert/,
      ),
    ).toBeVisible();

    await page.goto('/history');
    await expect(
      page.getByRole('link', { name: /Náuseas|Nausea|Übelkeit/ }),
    ).toBeVisible();
  });

  test('completa una contracción con el temporizador', async ({ page }) => {
    const sinceLast = page.getByRole('status', {
      name: /Desde la última|Since last|Seit der letzten/,
    });

    await page.goto('/contractions');
    await expect(sinceLast).toHaveAttribute(
      'aria-label',
      /Desde la última: —|Since last: —|Seit der letzten: —/,
    );
    await page.getByRole('button', { name: /Iniciar|Start/ }).click();
    await expect(
      page.getByText(/Contracción en curso|Contraction in progress|Wehe läuft/),
    ).toBeVisible();
    await expect(sinceLast).toHaveAttribute(
      'aria-label',
      /Desde la última: —|Since last: —|Seit der letzten: —/,
    );
    await expect(
      page
        .getByRole('navigation', { name: 'Bottom navigation' })
        .getByRole('link', { name: 'SOS' }),
    ).toBeVisible();
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: /Finalizar|Finish|Beenden/ }).click();
    await expect(page.getByRole('button', { name: /Iniciar|Start/ })).toBeVisible();
    await expect(
      page.getByText(/Registradas hoy|Logged today|Heute erfasst/),
    ).toBeVisible();
    await expect(
      page.getByText(
        /Duración de esta contracción|Duration of this contraction|Dauer dieser Wehe/,
      ),
    ).toBeVisible();

    await expect(sinceLast).toHaveAttribute(
      'aria-label',
      /Desde la última: \d+s|Since last: \d+s|Seit der letzten: \d+s/,
    );
    const idleLabel = await sinceLast.getAttribute('aria-label');
    await expect
      .poll(async () => sinceLast.getAttribute('aria-label'), {
        timeout: 3500,
      })
      .not.toBe(idleLabel);

    await page.getByRole('button', { name: /Iniciar|Start/ }).click();
    await expect(
      page.getByText(/Contracción en curso|Contraction in progress|Wehe läuft/),
    ).toBeVisible();
    await expect(sinceLast).toHaveAttribute(
      'aria-label',
      /Desde la última: \d{2}:\d{2}|Since last: \d{2}:\d{2}|Seit der letzten: \d{2}:\d{2}/,
    );
    const runningLabel = await sinceLast.getAttribute('aria-label');
    await expect
      .poll(async () => sinceLast.getAttribute('aria-label'), {
        timeout: 3500,
      })
      .not.toBe(runningLabel);
  });

  test('Emergencia llama al 112 y deriva al hospital o a Configuración', async ({
    page,
  }) => {
    await page.goto('/emergency');
    await expect(page.getByRole('link', { name: /Volver|Back/ })).toHaveCount(0);
    await expect(
      page.getByRole('link', { name: /Llamar al 112|Call 112|112 anrufen/ }),
    ).toHaveAttribute('href', 'tel:112');

    await page
      .getByRole('link', {
        name: /Llamar a mi hospital|Call my hospital|Mein Krankenhaus anrufen/,
      })
      .click();
    await expect(page).toHaveURL(/\/settings#hospitalPhone/);
    await expect(page.locator('#hospitalPhone')).toBeVisible();

    await page.locator('#hospitalPhone').fill('91 000 00 00');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Settings saved/i)).toBeVisible();

    await page
      .getByRole('navigation', { name: 'Bottom navigation' })
      .getByRole('link', { name: 'SOS' })
      .click();
    await expect(
      page.getByRole('link', {
        name: /Llamar a mi hospital|Call my hospital|Mein Krankenhaus anrufen/,
      }),
    ).toHaveAttribute('href', 'tel:910000000');
  });

  test('abre la política de privacidad desde Configuración', async ({
    page,
  }) => {
    await page.goto('/settings');
    await page
      .getByRole('link', { name: /Política de privacidad|Privacy policy/i })
      .click();
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(
      page.getByRole('heading', {
        name: /Política de privacidad|Privacy policy|Datenschutzerklärung/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: /Almacenamiento local|Local storage|Lokale Speicherung/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', {
        name: /Leer el descargo sanitario|Read the medical disclaimer|Medizinischen Haftungsausschluss/i,
      }),
    ).toHaveAttribute('href', /DISCLAIMER(\.en|\.de)?\.md$/);
  });

  test('guarda configuración y sobrevive a una recarga', async ({ page }) => {
    await page.goto('/settings');

    const due = new Date();
    due.setMonth(due.getMonth() + 2);
    const dueValue = due.toISOString().slice(0, 10);

    await page.locator('#dueDate').fill(dueValue);
    await page.locator('#pregnancyType').selectOption('single');
    await page.locator('#isFirstPregnancy').selectOption('yes');
    await page.locator('#country').fill('ES');
    await page.locator('#hospitalPhone').fill('600 123 123');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Settings saved/i)).toBeVisible();

    await page.reload();
    await expect(page.locator('#dueDate')).toHaveValue(dueValue);
    await expect(page.locator('#country')).toHaveValue('ES');
    await expect(page.locator('#hospitalPhone')).toHaveValue('600 123 123');
  });

  test('elimina todos los datos desde privacidad', async ({ page }) => {
    await page.goto('/settings');
    const due = new Date();
    due.setMonth(due.getMonth() + 2);
    await page.locator('#dueDate').fill(due.toISOString().slice(0, 10));
    await page.locator('#pregnancyType').selectOption('single');
    await page.locator('#isFirstPregnancy').selectOption('yes');
    await page.locator('#country').fill('ES');
    await page.locator('#hospitalPhone').fill('600 123 123');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Settings saved/i)).toBeVisible();

    await page.goto('/privacy');
    await page
      .getByRole('button', {
        name: /Eliminar todos mis datos|Delete all my data|Alle meine Daten löschen/,
      })
      .first()
      .click();
    await expect(
      page.getByRole('heading', {
        name: /Eliminar todos los datos|Delete all PreParto data|Alle PreParto-Daten löschen/,
      }),
    ).toBeVisible();
    await page
      .getByRole('button', {
        name: /Sí, eliminar todo|Yes, delete everything|Ja, alles löschen/,
      })
      .click();

    await page.waitForURL(/\/privacy|\/$/);
    await page.goto('/settings');
    await expect(page.locator('#hospitalPhone')).toHaveValue('');
  });
});
