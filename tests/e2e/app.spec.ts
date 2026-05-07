import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    // Splash screen should be visible briefly or redirect happens
    // We check if we land on /login
    await expect(page).toHaveURL(/\/login/);
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    // Manually set session
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'u1', email: 'test@test.com' }));
    });
    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');
    const email = `user-${Date.now()}@test.com`;
    await page.getByTestId('auth-signup-email').fill(email);
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    // Pre-seed a user and a habit
    await page.goto('/login');
    await page.evaluate(() => {
      const user = { id: 'u1', email: 'user1@test.com', password: 'password123', createdAt: new Date().toISOString() };
      const habit = { id: 'h1', userId: 'u1', name: 'User 1 Habit', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] };
      localStorage.setItem('habit-tracker-users', JSON.stringify([user]));
      localStorage.setItem('habit-tracker-habits', JSON.stringify([habit]));
    });

    await page.getByTestId('auth-login-email').fill('user1@test.com');
    await page.getByTestId('auth-login-password').fill('password123');
    await page.getByTestId('auth-login-submit').click();

    await expect(page.getByTestId('habit-card-user-1-habit')).toBeVisible();
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.evaluate(() => {
      const user = { id: 'u1', email: 'test@test.com', password: 'password123', createdAt: new Date().toISOString() };
      localStorage.setItem('habit-tracker-users', JSON.stringify([user]));
      localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'u1', email: 'test@test.com' }));
    });
    
    await page.goto('/dashboard');
    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Morning Coffee');
    await page.getByTestId('habit-save-button').click();
    
    await expect(page.getByTestId('habit-card-morning-coffee')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => {
      const user = { id: 'u1', email: 'test@test.com', password: 'password123', createdAt: new Date().toISOString() };
      const habit = { id: 'h1', userId: 'u1', name: 'Exercise', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] };
      localStorage.setItem('habit-tracker-users', JSON.stringify([user]));
      localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'u1', email: 'test@test.com' }));
      localStorage.setItem('habit-tracker-habits', JSON.stringify([habit]));
    });

    await page.goto('/dashboard');
    const toggleBtn = page.getByTestId('habit-complete-exercise');
    await toggleBtn.click();
    
    // Check streak
    await expect(page.getByTestId('habit-streak-exercise')).toHaveText('1');
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => {
      const user = { id: 'u1', email: 'test@test.com', password: 'password123', createdAt: new Date().toISOString() };
      const habit = { id: 'h1', userId: 'u1', name: 'Persistent Habit', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] };
      localStorage.setItem('habit-tracker-users', JSON.stringify([user]));
      localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'u1', email: 'test@test.com' }));
      localStorage.setItem('habit-tracker-habits', JSON.stringify([habit]));
    });

    await page.goto('/dashboard');
    await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
    
    await page.reload();
    await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'u1', email: 'test@test.com' }));
    });
    
    await page.goto('/dashboard');
    await page.getByTestId('auth-logout-button').click();
    await expect(page).toHaveURL(/\/login/);
    
    // Verify session is cleared
    const session = await page.evaluate(() => localStorage.getItem('habit-tracker-session'));
    expect(session).toBeNull();
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/login');
    // Simulate offline
    await context.setOffline(true);
    await page.reload();
    
    // The app shell should still render (e.g. login form should be there if it's cached)
    await expect(page.getByTestId('login-form')).toBeVisible();
  });
});
