import { test, expect } from '@playwright/test';

/**
 * E2E Tests for the Habit Tracker journey.
 * Complies with Section 16 of the TRD.
 */
test.describe('Habit Tracker Full Journey', () => {
  test('should allow a user to sign up and track a habit', async ({ page }) => {
    // 1. Visit the app (Splash screen redirect)
    await page.goto('/');
    
    // 2. Navigate to Signup
    await page.click('text=Don\'t have an account? Sign up');
    await expect(page.getByTestId('signup-form')).toBeVisible();

    // 3. Perform Signup
    const testEmail = `user_${Date.now()}@example.com`;
    await page.getByTestId('signup-email').fill(testEmail);
    await page.getByTestId('signup-password').fill('password123');
    await page.click('button[type="submit"]');

    // 4. Arrive at Dashboard (Empty State)
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByTestId('empty-state')).toBeVisible();

    // 5. Create a new Habit
    await page.click('text=New Habit');
    await page.getByTestId('habit-name-input').fill('Morning Run');
    await page.getByTestId('habit-description-input').fill('30 minutes every day');
    await page.click('button[data-testid="habit-submit-button"]');

    // 6. Verify Habit exists
    await expect(page.getByTestId('habit-card-morning-run')).toBeVisible();

    // 7. Complete the Habit
    await page.click('button[data-testid="habit-complete-button-morning-run"]');
    
    // 8. Verify Streak is updated to 1
    await expect(page.locator('text=1')).toBeVisible();
    await expect(page.locator('text=Day Streak')).toBeVisible();
  });
});
