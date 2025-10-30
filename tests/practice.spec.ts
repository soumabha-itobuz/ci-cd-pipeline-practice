import { test, expect } from '@playwright/test';

test('Drag and drop features', async ({ page }) => {
    await page.goto('https://www.jotform.com/drag-and-drop-app-builder/');
    await page.locator('[data-jfa="get-started-now-hero-cta"]').hover();
    await page.mouse.down();
    await page.locator('.resize-none.p-3').hover();
    await page.mouse.up();
    await page.locator('div.sc-iCfMLu.cZEiQL.jFRFooter-col--marketplace > ul > li:nth-child(1) > button').click();
    await page.pause();
    
});

