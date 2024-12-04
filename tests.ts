import { test, expect, Page } from "@playwright/test";

test.describe('DemoBlaze Automation Tests', () => {
    let page: Page;
    let URL = 'https://www.demoblaze.com/#'
    const testUsername = `user_${Date.now()}`; 
    const testPassword = 'password';
    
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto(URL);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Validate Homepage', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/#');
        
        await expect(page).toHaveTitle('STORE');

        const homeNav = page.locator('text=Home');
        await expect(homeNav).toBeVisible();
        console.log('Homepage validation passed!');
    });

    test('SignUp with validation', async () => {
        await page.click('text=Sign up');

        await page.waitForSelector('#sign-username');

        await page.fill('#sign-username', testUsername);
        await page.fill('#sign-password', testPassword);

        await page.click('button:has-text("Sign up")');

        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
          ]);
          expect(dialog.message()).toContain('Sign up successful');
          console.log('Signup validation passed!');
          await dialog.accept(); 

    });

    test('Login with validation', async () => {
        await page.click('text=Log in');

        await page.waitForSelector('#loginusername');

        await page.fill('#loginusername', testUsername);
        await page.fill('#loginpassword', testPassword);

        await page.click('button:has-text("Log in")');

        const logoutButton = page.locator('text=Log out');
        await expect(logoutButton).toBeVisible();

        const signupButton = page.locator('text=Sign up');
        await expect(signupButton).not.toBeVisible(); 

        console.log('Login validation passed!');

    });
});