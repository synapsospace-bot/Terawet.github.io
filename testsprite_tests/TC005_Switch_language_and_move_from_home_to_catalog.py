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
        
        # -> Click the 'Українська' language button (🇺🇦) to set the site language to Ukrainian.
        # 🇺🇦 button
        elem = page.get_by_role("button", name="🇺🇦")
        await elem.click(timeout=10000)
        
        # -> Click the 'Каталог' link in the top navigation to open the catalog page.
        # Каталог link
        elem = page.get_by_role("link", name="Каталог")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Catalog page is opened at /catalog and the UI is shown in Ukrainian (heading 'Каталог продукції' observed).
        # Assert-outcome: passed
        # Assert: Page URL contains '/catalog'.
        await expect(page).to_have_url(re.compile("/catalog"), timeout=15000), "Page URL contains '/catalog'."
        # Assert-outcome: passed
        # Assert: Top navigation link text is 'Каталог' in Ukrainian.
        await expect(page.locator("xpath=/html/body/div/div[2]/header/div/nav/a[2]").nth(0)).to_have_text("\u041a\u0430\u0442\u0430\u043b\u043e\u0433", timeout=15000), "Top navigation link text is '\u041a\u0430\u0442\u0430\u043b\u043e\u0433' in Ukrainian."
        
        # --> Product cards are visible on the catalog page (product titles like 'Догляд з Тераветом' and 'Terawet Gel' were observed).
        await page.get_by_role("link", name="Замовити в WhatsApp").first.nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: A product card action link ('Замовити в WhatsApp') is visible, indicating product cards are displayed.
        await expect(page.get_by_role("link", name="Замовити в WhatsApp").first.nth(0)).to_be_visible(timeout=15000), "A product card action link ('\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438 \u0432 WhatsApp') is visible, indicating product cards are displayed."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    