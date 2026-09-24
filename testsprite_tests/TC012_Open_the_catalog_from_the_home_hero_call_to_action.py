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
        
        # -> Click the hero CTA labeled 'Переглянути продукцію' to open the product catalog.
        # Переглянути продукцію link
        elem = page.get_by_role("link", name="Переглянути продукцію")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The browser navigated to the product catalog page (/catalog).
        # Assert-outcome: passed
        # Assert: Page URL contains '/catalog'.
        await expect(page).to_have_url(re.compile("/catalog"), timeout=15000), "Page URL contains '/catalog'."
        
        # --> Product listings are visible on the catalog page (product order link is present).
        # Assert-outcome: passed
        # Assert: A product card shows the 'Замовити в WhatsApp' order link.
        await expect(page.locator("xpath=/html/body/div/div[2]/main/div/div/div[1]/div[2]/div[3]/a[1]").nth(0)).to_have_text("\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438 \u0432 WhatsApp", timeout=15000), "A product card shows the '\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438 \u0432 WhatsApp' order link."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    