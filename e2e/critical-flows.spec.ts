import { expect, test } from '@playwright/test';

test.describe('flujos críticos PreParto', () => {
  test('muestra recomendación orientativa en Home', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /PreParto/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('note', { name: /Recomendación orientativa/i }),
    ).toBeVisible();
  });

  test('la barra inferior con SOS está en todas las pantallas clave', async ({
    page,
  }) => {
    const bottomNav = page.getByRole('navigation', {
      name: 'Navegación inferior',
    });

    await page.goto('/');
    await expect(bottomNav.getByRole('link', { name: 'SOS' })).toBeVisible();

    await page.goto('/contractions');
    await expect(page.getByRole('link', { name: 'Volver' })).toHaveCount(0);
    await expect(bottomNav.getByRole('link', { name: 'SOS' })).toBeVisible();
    await expect(page.getByText('Aún no hay patrón 5-1-1')).toBeVisible();
    await expect(page.getByText('+ Añadir nota (opcional)')).toBeVisible();

    await page.goto('/symptoms/nausea');
    await expect(bottomNav.getByRole('link', { name: 'SOS' })).toBeVisible();
    await bottomNav.getByRole('link', { name: 'SOS' }).click();
    await expect(
      page.getByRole('heading', { name: 'Emergencia' }),
    ).toBeVisible();
  });

  test('registra un síntoma y aparece en el historial', async ({ page }) => {
    await page.goto('/symptoms/nausea');
    await page.locator('#intensity').selectOption('3');
    await page.getByRole('button', { name: /Guardar registro/i }).click();
    await expect(page.getByText(/Registro guardado/i)).toBeVisible();

    await page.goto('/history');
    await expect(page.getByRole('link', { name: /Náuseas/i })).toBeVisible();
  });

  test('completa una contracción con el temporizador', async ({ page }) => {
    const sinceLast = page.getByRole('status', { name: /Desde la última/ });

    await page.goto('/contractions');
    await expect(sinceLast).toHaveAttribute('aria-label', 'Desde la última: —');
    await page.getByRole('button', { name: 'Iniciar' }).click();
    await expect(page.getByText('Contracción en curso')).toBeVisible();
    await expect(sinceLast).toHaveAttribute('aria-label', 'Desde la última: —');
    await expect(
      page
        .getByRole('navigation', { name: 'Navegación inferior' })
        .getByRole('link', { name: 'SOS' }),
    ).toBeVisible();
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: 'Finalizar' }).click();
    await expect(page.getByRole('button', { name: 'Iniciar' })).toBeVisible();
    await expect(page.getByText('Registradas hoy')).toBeVisible();
    await expect(page.getByText('Duración de esta contracción')).toBeVisible();

    await expect(sinceLast).toHaveAttribute(
      'aria-label',
      /Desde la última: \d+s/,
    );
    const idleLabel = await sinceLast.getAttribute('aria-label');
    await expect
      .poll(async () => sinceLast.getAttribute('aria-label'), {
        timeout: 3500,
      })
      .not.toBe(idleLabel);

    await page.getByRole('button', { name: 'Iniciar' }).click();
    await expect(page.getByText('Contracción en curso')).toBeVisible();
    await expect(sinceLast).toHaveAttribute(
      'aria-label',
      /Desde la última: \d{2}:\d{2}/,
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
    await expect(page.getByRole('link', { name: 'Volver' })).toHaveCount(0);
    await expect(
      page.getByRole('link', { name: 'Llamar al 112' }),
    ).toHaveAttribute('href', 'tel:112');

    await page.getByRole('link', { name: 'Llamar a mi hospital' }).click();
    await expect(page).toHaveURL(/\/settings#hospitalPhone/);
    await expect(page.locator('#hospitalPhone')).toBeVisible();

    await page.locator('#hospitalPhone').fill('91 000 00 00');
    await page.getByRole('button', { name: 'Guardar' }).click();
    await expect(page.getByText(/Configuración guardada/i)).toBeVisible();

    await page
      .getByRole('navigation', { name: 'Navegación inferior' })
      .getByRole('link', { name: 'SOS' })
      .click();
    await expect(
      page.getByRole('link', { name: 'Llamar a mi hospital' }),
    ).toHaveAttribute('href', 'tel:910000000');
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
    await page.getByRole('button', { name: 'Guardar' }).click();
    await expect(page.getByText(/Configuración guardada/i)).toBeVisible();

    await page.reload();
    await expect(page.locator('#dueDate')).toHaveValue(dueValue);
    await expect(page.locator('#country')).toHaveValue('ES');
    await expect(page.locator('#hospitalPhone')).toHaveValue('600 123 123');
  });
});
