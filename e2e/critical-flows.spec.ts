import { expect, test } from '@playwright/test';

test.describe('flujos críticos PreParto', () => {
  test('muestra recomendación orientativa en Home', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /PreParto/i })).toBeVisible();
    await expect(
      page.getByRole('note', { name: /Recomendación orientativa/i }),
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
    await page.goto('/contractions');
    await page.getByRole('button', { name: 'Iniciar' }).click();
    await page.waitForTimeout(1200);
    await page.getByRole('button', { name: 'Finalizar' }).click();
    await expect(page.getByText(/Historial/i).first()).toBeVisible();
    await expect(page.getByText(/Duración/i).first()).toBeVisible();
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
    await page.getByRole('button', { name: 'Guardar' }).click();
    await expect(page.getByText(/Configuración guardada/i)).toBeVisible();

    await page.reload();
    await expect(page.locator('#dueDate')).toHaveValue(dueValue);
    await expect(page.locator('#country')).toHaveValue('ES');
  });

  test('abre el FAQ desde Home y muestra contenido offline', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Preguntas frecuentes/i }).click();
    await expect(
      page.getByRole('heading', { name: /Preguntas frecuentes/i }),
    ).toBeVisible();
    await expect(page.getByText(/¿Qué es PreParto\?/i)).toBeVisible();
    await page.getByLabel(/Buscar en el FAQ/i).fill('offline');
    await expect(page.getByText(/¿Funciona sin Internet\?/i)).toBeVisible();
  });
});
