import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://www.jotform.com/drag-and-drop-app-builder/');

    // Expect a title "to contain" a substring.
    //   await expect(page).toHaveTitle(/Playwright/);
    await page.locator('[data-jfa="get-started-now-hero-cta"]').hover();
    await page.mouse.down();
    await page.locator('.resize-none.p-3').hover();
    await page.mouse.up();
    await page.locator('div.sc-iCfMLu.cZEiQL.jFRFooter-col--marketplace > ul > li:nth-child(1) > button').click();
    await page.pause();
    
    // Wait for any key to be pressed after all script actions are completed
    // console.log('All script actions completed. Press any key to continue...');
    // await page.waitForFunction(() => {
    //     return new Promise((resolve) => {
    //         const keyHandler = (event: KeyboardEvent) => {
    //             console.log(`Key pressed: ${event.key}`);
    //             document.removeEventListener('keydown', keyHandler);
    //             resolve(true);
    //         };
    //         document.addEventListener('keydown', keyHandler);
    //     });
    // });
    
    // console.log('Test completed!');
});

