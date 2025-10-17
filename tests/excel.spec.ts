import { test, expect } from '@playwright/test';

test('Excel Online data entry - first cell', async ({ page }) => {
  // Navigate to the Microsoft Excel Online sheet
  await page.goto('https://1drv.ms/x/c/464c94ca4c4ea079/ETG9kLbCiqFJjSE3WzkCArEB3UsXG6QVMuIlL0YEx262oQ?e=8gQbVV');
  
  // Wait for Excel Online to load - try multiple selectors
  try {
    await page.waitForSelector('.grid-canvas', { timeout: 60000 });
  } catch {
    await page.waitForSelector('[role="grid"]', { timeout: 60000 });
  }
  
  // Wait for the spreadsheet to fully render
  await page.waitForTimeout(10000);
  
  // Click on the first cell (A1) - Try multiple selectors for Excel Online
  const cellSelectors = [
    '[data-cell="A1"]',
    '[title="A1"]', 
    'div[role="gridcell"]:first-child',
    '.cell[data-row="1"][data-col="1"]'
  ];
  
  let cellClicked = false;
  for (const selector of cellSelectors) {
    try {
      await page.click(selector, { timeout: 5000 });
      cellClicked = true;
      break;
    } catch (e) {
      continue;
    }
  }
  
  if (!cellClicked) {
    // Fallback: click at coordinates where A1 should be
    await page.click('body');
    await page.keyboard.press('Control+Home'); // Navigate to A1
  }
  
  // Enter data into the first cell
  await page.keyboard.type('Hello World');
  
  // Press Enter to confirm the entry
  await page.keyboard.press('Enter');
});

test('Excel Online data entry - multiple cells', async ({ page }) => {
  // Navigate to the Microsoft Excel Online sheet
  await page.goto('https://1drv.ms/x/c/464c94ca4c4ea079/ETG9kLbCiqFJjSE3WzkCArEB3UsXG6QVMuIlL0YEx262oQ?e=8gQbVV');
  
  // Wait for the spreadsheet to load - try multiple selectors
  try {
    await page.waitForSelector('.grid-canvas', { timeout: 60000 });
  } catch {
    await page.waitForSelector('[role="grid"]', { timeout: 60000 });
  }
  await page.waitForTimeout(10000);
  
  // Data to enter in cells
  const testData = [
    { cell: 'A1', value: 'Name' },
    { cell: 'B1', value: 'Age' },
    { cell: 'C1', value: 'Email' },
    { cell: 'A2', value: 'John Doe' },
    { cell: 'B2', value: '25' },
    { cell: 'C2', value: 'john@example.com' }
  ];
  
  // Navigate to A1 first
  await page.keyboard.press('Control+Home');
  
  // Enter data in each cell using keyboard navigation
  for (let i = 0; i < testData.length; i++) {
    const data = testData[i];
    
    // Clear any existing content and type new data
    await page.keyboard.press('Delete');
    await page.keyboard.type(data.value);
    
    // Move to next cell based on position
    if (data.cell === 'A1' || data.cell === 'B1') {
      await page.keyboard.press('Tab'); // Move right
    } else if (data.cell === 'C1') {
      await page.keyboard.press('Enter'); // Move to next row
      await page.keyboard.press('Home'); // Move to beginning of row
    } else if (data.cell === 'A2' || data.cell === 'B2') {
      await page.keyboard.press('Tab'); // Move right
    } else {
      await page.keyboard.press('Enter'); // Confirm last entry
    }
    
    // Wait a moment for the data to be saved
    await page.waitForTimeout(1000);
  }
});

test('Excel Online data entry - keyboard navigation', async ({ page }) => {
  await page.goto('https://1drv.ms/x/c/464c94ca4c4ea079/ETG9kLbCiqFJjSE3WzkCArEB3UsXG6QVMuIlL0YEx262oQ?e=8gQbVV');
  
  // Wait for Excel Online to load
  try {
    await page.waitForSelector('.grid-canvas', { timeout: 60000 });
  } catch {
    await page.waitForSelector('[role="grid"]', { timeout: 60000 });
  }
  await page.waitForTimeout(10000);
  
  // Navigate to first cell (A1) using keyboard shortcut
  await page.keyboard.press('Control+Home');
  
  // Enter data and navigate using keyboard
  const cellData = ['Product', 'Price', 'Quantity', 'Total'];
  
  for (let i = 0; i < cellData.length; i++) {
    // Type data in current cell
    await page.keyboard.type(cellData[i]);
    
    // Move to next cell (Tab for horizontal navigation)
    if (i < cellData.length - 1) {
      await page.keyboard.press('Tab');
    } else {
      // Press Enter on the last cell to confirm
      await page.keyboard.press('Enter');
    }
    
    await page.waitForTimeout(1000); // Small delay between entries
  }
  
  // Go back to A1 using keyboard shortcut
  await page.keyboard.press('Control+Home');
});