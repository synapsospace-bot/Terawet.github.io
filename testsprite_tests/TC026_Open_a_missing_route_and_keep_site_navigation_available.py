import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Navigate to the invalid path '/non-existent-route' to trigger the site's not-found/fallback page.
        await page.goto("http://localhost:5173/non-existent-route")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Assertions to verify final state
        
        # --> A not-found page is shown: the page displays a '404' message and a 'Return to Home' link.
        # Assert-outcome: passed
        # Assert: The page shows the 'Oops! Page not found' not-found text.
        await expect(page.locator("#root").nth(0)).to_contain_text("Oops! Page not found", timeout=15000), "The page shows the 'Oops! Page not found' not-found text."
        # Assert-outcome: passed
        # Assert: A 'Return to Home' link is present on the not-found page.
        await expect(page.locator("xpath=/html/body/div/div[2]/main/div/div/a").nth(0)).to_have_text("Return to Home", timeout=15000), "A 'Return to Home' link is present on the not-found page."
        
        # --> The site header navigation is visible (for example the 'Головна' link is present).
        # Assert-outcome: passed
        # Assert: The header navigation contains the 'Головна' link.
        await expect(page.locator("xpath=/html/body/div/div[2]/header/div/nav/a[1]").nth(0)).to_have_text("\u0413\u043e\u043b\u043e\u0432\u043d\u0430", timeout=15000), "The header navigation contains the '\u0413\u043e\u043b\u043e\u0432\u043d\u0430' link."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    