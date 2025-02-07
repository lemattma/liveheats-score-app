import { expect, test } from '@playwright/test';

test('adding a score', async ({ page }) => {
  await page.goto('/');

  // go to the add score page
  await page.locator('a:has-text("Add score")').click();
  expect(await page.locator('h1').innerText()).toContain("What's the race name");

  // fill title
  await page.locator('input[name="title"]').fill('Race One');
  await page.locator('button:has-text("Next")').click();

  expect(await page.locator('h1').innerText()).toContain('Race participants');

  // should have minimum 2 participants
  await expect(page.locator('input[name="participants[0].name"]')).toBeInViewport();
  await expect(page.locator('input[name="participants[1].name"]')).toBeInViewport();
  await expect(page.locator('input[name="participants[2].name"]')).not.toBeInViewport();

  // fill participant 1
  await page.locator('input[name="participants[0].name"]').fill('Student One');

  // should show error message
  await page.locator('button:has-text("Finish")').click();
  await expect(page.locator('input[name="participants[1].name"] + span:has-text("Enter name")')).toBeInViewport();

  // add additional field for participant 3
  await page.locator('button:has-text("Add participant")').click();
  await expect(page.locator('input[name="participants[2].name"]')).toBeInViewport();

  // fill participant 2
  await page.locator('input[name="participants[1].name"]').fill('Student Two');

  // should show error message
  await page.locator('button:has-text("Finish")').click();
  await expect(page.locator('input[name="participants[2].name"] + span:has-text("Enter name")')).toBeInViewport();

  // fill participant 3
  await page.locator('input[name="participants[2].name"]').fill('Student Three');

  await page.locator('button:has-text("Finish")').click();

  expect(await page.locator('h1').innerText()).toContain('My Scores');

  await expect(page.locator('a h5:has-text("Race One")')).toBeInViewport();
});
